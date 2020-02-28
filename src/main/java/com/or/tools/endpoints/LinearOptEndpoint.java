package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;
import com.or.tools.model.ConstraintM;
import com.or.tools.model.LinearConstrain;
import com.or.tools.model.LinearObjective;
import com.or.tools.model.LinearOptModel;
import com.or.tools.model.Matrix;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping("/linear")
public class LinearOptEndpoint {

	@Autowired
	private IOUtils ioUtils;

	@PostMapping("/result")
	private Pair<List<List<Double>>, Double> result(@RequestBody LinearOptModel model) {
		MPSolver solver = new MPSolver("LinearProgrammingExample",
				MPSolver.OptimizationProblemType.GLOP_LINEAR_PROGRAMMING);

		double infinity = java.lang.Double.POSITIVE_INFINITY;
		// x and y are continuous non-negative variables.
		MPVariable x = solver.makeNumVar(-infinity, infinity, "x");
		MPVariable y = solver.makeNumVar(0.0, infinity, "y");
		System.out.println("Number of variables = " + solver.numVariables());

		for (int i = 0; i < model.getConstrains().size(); i++) {
			ConstraintM m = new ConstraintM();
			m = calculateInfinity(model.getConstrains().get(i));
			MPConstraint c0 = solver.makeConstraint(m.getValue1(), m.getValue2(), "c" + i);
			c0.setCoefficient(x, model.getConstrains().get(i).getX());
			c0.setCoefficient(y, model.getConstrains().get(i).getY());
		}

		// Maximize 3 * x + 4 * y.
		MPObjective objective = solver.objective();
		objective.setCoefficient(x, model.getObjective().getX());
		objective.setCoefficient(y, model.getObjective().getY());
		objective.setMaximization();

		final MPSolver.ResultStatus resultStatus = solver.solve();
		// Check that the problem has an optimal solution.
		if (resultStatus != MPSolver.ResultStatus.OPTIMAL) {
			System.err.println("The problem does not have an optimal solution!");
		}

		// The value of each variable in the solution.
		System.out.println("Solution");
		System.out.println("x = " + x.solutionValue());
		System.out.println("y = " + y.solutionValue());

		// The objective value of the solution.
		System.out.println("Optimal objective value = " + solver.objective().value());

		Pair<List<List<Double>>, Double> res = new Pair<List<List<Double>>, Double>(
				morePoints(x.solutionValue(), y.solutionValue(), solver.objective().value(), model.getObjective()),
				solver.objective().value());

		return res;

	}

	private List<List<Double>> morePoints(Double x, Double y, Double constant, LinearObjective obj) {
		List<List<Double>> result = new ArrayList<>();
		List<Double> result1 = new ArrayList<>();
		List<Double> result2 = new ArrayList<>();
		List<Double> result3 = new ArrayList<>();

		Double x1 = 0.0;
		Double y1 = constant / obj.getY();

		Double nextX = x + 1.0;
		Double tempX = nextX * obj.getX();

		Double y2 = (constant - tempX) / obj.getY();
		Double x2 = nextX;

		result1.add(x1);
		result1.add(y1);
		result2.add(x);
		result2.add(y);
		result3.add(x2);
		result3.add(y2);

		result.add(result1);
		result.add(result2);
		result.add(result3);

		return result;

	}

	private ConstraintM calculateInfinity(LinearConstrain constrain) {
		double infinity = java.lang.Double.POSITIVE_INFINITY;
		ConstraintM result = new ConstraintM();
		if (constrain.getOperator().equals("<=")) {
			result.setValue1(-infinity);
			result.setValue2(constrain.getConstant());
		} else if (constrain.getOperator().contentEquals(">=")) {
			result.setValue1(constrain.getConstant());
			result.setValue2(infinity);
		}
		return result;
	}

	@GetMapping("/cramer")
	public List<List<Double>> solveCramer(LinearOptModel model) {
		List<List<Double>> result = new ArrayList<>();

		List<LinearConstrain> constrains = model.getConstrains();

		for (int i = 0; i < constrains.size() - 1; i++) {
			Matrix mat = new Matrix(Arrays.asList(constrains.get(i).getX(), constrains.get(i).getY()),
					Arrays.asList(constrains.get(i + 1).getX(), constrains.get(i + 1).getY()));
			List<Double> b = Arrays.asList(constrains.get(i).getConstant(), constrains.get(i + 1).getConstant());
			System.out.println("Solution = " + cramersRule(mat, b));
			result.add(cramersRule(mat, b));
		}
		Matrix mat = new Matrix(Arrays.asList(constrains.get(0).getX(), constrains.get(0).getY()), Arrays
				.asList(constrains.get(constrains.size() - 1).getX(), constrains.get(constrains.size() - 1).getY()));
		List<Double> b = Arrays.asList(constrains.get(0).getConstant(),
				constrains.get(constrains.size() - 1).getConstant());
		System.out.println("Solution = " + cramersRule(mat, b));
		result.add(cramersRule(mat, b));

		return result;
	}

	private static List<Double> cramersRule(Matrix matrix, List<Double> b) {
		double denominator = matrix.determinant();
		List<Double> result = new ArrayList<>();
		for (int i = 0; i < b.size(); i++) {
			result.add(matrix.replaceColumn(b, i).determinant() / denominator);
		}
		return result;
	}

	@PostMapping("/data")
	public Pair<List<List<Double>>, LinearOptModel> reorganiseData(MultipartFile file) {
		LinearOptModel model = ioUtils.readLinearOptData(file);
		List<List<Double>> response = solveCramer(model);
		Pair<List<List<Double>>, LinearOptModel> res = new Pair<List<List<Double>>, LinearOptModel>(response, model);
		return res;
	}

}
