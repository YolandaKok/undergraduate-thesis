package com.or.tools.endpoints;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.ortools.constraintsolver.Assignment;
import com.google.ortools.constraintsolver.FirstSolutionStrategy;
import com.google.ortools.constraintsolver.RoutingIndexManager;
import com.google.ortools.constraintsolver.RoutingModel;
import com.google.ortools.constraintsolver.RoutingSearchParameters;
import com.google.ortools.constraintsolver.main;
import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;

@RestController
@RequestMapping(value = "/tes")
public class TestRest {

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

	@GetMapping("/routing")
	public void travelling() {
		long[][] distanceMatrix = { { 0, 2451, 713, 1018, 1631, 1374, 2408, 213, 2571, 875, 1420, 2145, 1972 },
				{ 2451, 0, 1745, 1524, 831, 1240, 959, 2596, 403, 1589, 1374, 357, 579 },
				{ 713, 1745, 0, 355, 920, 803, 1737, 851, 1858, 262, 940, 1453, 1260 },
				{ 1018, 1524, 355, 0, 700, 862, 1395, 1123, 1584, 466, 1056, 1280, 987 },
				{ 1631, 831, 920, 700, 0, 663, 1021, 1769, 949, 796, 879, 586, 371 },
				{ 1374, 1240, 803, 862, 663, 0, 1681, 1551, 1765, 547, 225, 887, 999 },
				{ 2408, 959, 1737, 1395, 1021, 1681, 0, 2493, 678, 1724, 1891, 1114, 701 },
				{ 213, 2596, 851, 1123, 1769, 1551, 2493, 0, 2699, 1038, 1605, 2300, 2099 },
				{ 2571, 403, 1858, 1584, 949, 1765, 678, 2699, 0, 1744, 1645, 653, 600 },
				{ 875, 1589, 262, 466, 796, 547, 1724, 1038, 1744, 0, 679, 1272, 1162 },
				{ 1420, 1374, 940, 1056, 879, 225, 1891, 1605, 1645, 679, 0, 1017, 1200 },
				{ 2145, 357, 1453, 1280, 586, 887, 1114, 2300, 653, 1272, 1017, 0, 504 },
				{ 1972, 579, 1260, 987, 371, 999, 701, 2099, 600, 1162, 1200, 504, 0 }, };
		int vehicleNumber = 1;
		int depot = 0;

		// Create Routing Index Manager
		RoutingIndexManager manager = new RoutingIndexManager(distanceMatrix.length, vehicleNumber, depot);
		// Create Routing Model.
		RoutingModel routing = new RoutingModel(manager);
		// Create and register a transit callback.
		final int transitCallbackIndex = routing.registerTransitCallback((long fromIndex, long toIndex) -> {
			// Convert from routing variable Index to user NodeIndex.
			int fromNode = manager.indexToNode(fromIndex);
			int toNode = manager.indexToNode(toIndex);
			return distanceMatrix[fromNode][toNode];
		});

		// Define cost of each arc.
		routing.setArcCostEvaluatorOfAllVehicles(transitCallbackIndex);

		// Setting first solution heuristic.
		RoutingSearchParameters searchParameters = main.defaultRoutingSearchParameters().toBuilder()
				.setFirstSolutionStrategy(FirstSolutionStrategy.Value.PATH_CHEAPEST_ARC).build();

		// Solve the problem.
		Assignment solution = routing.solveWithParameters(searchParameters);

		System.out.println("Objective: " + solution.objectiveValue() + "miles");
		// Inspect solution.
		System.out.println("Route:");
		long routeDistance = 0;
		String route = "";
		long index = routing.start(0);
		while (!routing.isEnd(index)) {
			route += manager.indexToNode(index) + " -> ";
			long previousIndex = index;
			index = solution.value(routing.nextVar(index));
			routeDistance += routing.getArcCostForVehicle(previousIndex, index, 0);
		}
		route += manager.indexToNode(routing.end(0));
		System.out.println(route);
		System.out.println("Route distance: " + routeDistance + "miles");

	}

}
