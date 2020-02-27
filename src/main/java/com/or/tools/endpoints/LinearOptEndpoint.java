package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;
import com.or.tools.model.Matrix;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping("/linear")
public class LinearOptEndpoint {

	@Autowired
	private IOUtils ioUtils;

	@PostMapping("/constrains")
	public void insertConstrains() {
		MPSolver solver = new MPSolver("LinearProgrammingExample",
				MPSolver.OptimizationProblemType.GLOP_LINEAR_PROGRAMMING);

		double infinity = java.lang.Double.POSITIVE_INFINITY;
		// x and y are continuous non-negative variables.
		MPVariable x = solver.makeNumVar(-infinity, infinity, "x");
		MPVariable y = solver.makeNumVar(0.0, infinity, "y");
		System.out.println("Number of variables = " + solver.numVariables());

		// x + 2*y <= 14.
		MPConstraint c0 = solver.makeConstraint(-infinity, 14.0, "c0");
		c0.setCoefficient(x, 1);
		c0.setCoefficient(y, 2);

		// 3*x - y >= 0.
		MPConstraint c1 = solver.makeConstraint(0.0, infinity, "c1");
		c1.setCoefficient(x, 3);
		c1.setCoefficient(y, -1);

		// x - y <= 2.
		MPConstraint c2 = solver.makeConstraint(-infinity, 2.0, "c2");
		c2.setCoefficient(x, 1);
		c2.setCoefficient(y, -1);
		System.out.println("Number of constraints = " + solver.numConstraints());

		// Maximize 3 * x + 4 * y.
		MPObjective objective = solver.objective();
		objective.setCoefficient(x, 3);
		objective.setCoefficient(y, 4);
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
	}

	@GetMapping("/cramer")
	public void solveCramer() {
		Matrix mat = new Matrix(Arrays.asList(3d, -1d), Arrays.asList(1d, 2d));
		List<Double> b = Arrays.asList(0d, 14d);
		System.out.println("Solution = " + cramersRule(mat, b));

		Matrix mat1 = new Matrix(Arrays.asList(3d, -1d), Arrays.asList(1d, -1d));
		List<Double> b1 = Arrays.asList(0d, 0d);
		System.out.println("Solution = " + cramersRule(mat1, b1));

		Matrix mat2 = new Matrix(Arrays.asList(1d, 2d), Arrays.asList(1d, -1d));
		List<Double> b2 = Arrays.asList(14d, 0d);
		System.out.println("Solution = " + cramersRule(mat1, b2));
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
	public void reorganiseData(MultipartFile file) {
		ioUtils.readLinearOptData(file);
	}

}
