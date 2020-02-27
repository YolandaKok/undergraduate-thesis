package com.or.tools.endpoints;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;

@RestController
@RequestMapping(value = "/tes")
public class TestRest {

	@PreAuthorize("hasAuthority('GENERAL_USER')")
	@GetMapping("/solver")
	public void testSolver() {
		MPSolver solver = new MPSolver("LinearProgrammingExample",
				MPSolver.OptimizationProblemType.CLP_LINEAR_PROGRAMMING);

		double infinity = java.lang.Double.POSITIVE_INFINITY;
		// x and y are continuous non-negative variables.
		MPVariable x = solver.makeNumVar(0.0, infinity, "x");
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
			return;
		}

		// The value of each variable in the solution.
		System.out.println("Solution");
		System.out.println("x = " + x.solutionValue());
		System.out.println("y = " + y.solutionValue());

		// The objective value of the solution.
		System.out.println("Optimal objective value = " + solver.objective().value());
	}

	@GetMapping("/linear")
	public void testNurses() {
		// Create the linear solver with the GLOP backend.
		MPSolver solver = new MPSolver("SimpleLpProgram", MPSolver.OptimizationProblemType.CLP_LINEAR_PROGRAMMING);

		// Create the variables x and y.
		MPVariable x = solver.makeNumVar(0.0, 1.0, "x");
		MPVariable y = solver.makeNumVar(0.0, 2.0, "y");

		System.out.println("Number of variables = " + solver.numVariables());

		// Create a linear constraint, 0 <= x + y <= 2.
		MPConstraint ct = solver.makeConstraint(0.0, 2.0, "ct");
		ct.setCoefficient(x, 1);
		ct.setCoefficient(y, 1);

		System.out.println("Number of constraints = " + solver.numConstraints());

		// Create the objective function, 3 * x + y.
		MPObjective objective = solver.objective();
		objective.setCoefficient(x, 3);
		objective.setCoefficient(y, 1);
		objective.setMaximization();

		solver.solve();

		System.out.println("Solution:");
		System.out.println("Objective value = " + objective.value());
		System.out.println("x = " + x.solutionValue());
		System.out.println("y = " + y.solutionValue());
	}

}
