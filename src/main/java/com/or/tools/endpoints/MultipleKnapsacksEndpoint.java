package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;
import com.or.tools.model.MultipleKnapsackDataRead;
import com.or.tools.model.MultipleKnapsackDisplayResponse;
import com.or.tools.model.MultipleKnapsackModel;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping("/multiple/knapsacks")
public class MultipleKnapsacksEndpoint {

	@Autowired
	private IOUtils utils;

	static class DataModel {
		public final double[] weights = { 48, 30, 42, 36, 36, 48, 42, 42, 36, 24, 30, 30, 42, 36, 36 };
		public final double[] values = { 10, 30, 25, 50, 35, 30, 15, 40, 30, 35, 45, 10, 20, 30, 25 };
		public final int numItems = weights.length;
		public final int numBins = 5;
		public final double[] binCapacities = { 100, 100, 100, 100, 100 };
	}

	@PostMapping(value = "/data")
	public MultipleKnapsackDataRead reorganiseData(@RequestParam("file") MultipartFile file) {
		MultipleKnapsackModel model = utils.readMultipleKnapsacksData(file);
		double values[] = model.getValues();
		double weights[] = model.getWeights();
		double binCapacities[] = model.getBinCapacities();
		int numOfBins = model.getNumBins();
		int numOfItems = model.getValues().length;

		List<MultipleKnapsackDisplayResponse> items = new ArrayList<>();

		// TODO: Create Response Item Class
		MultipleKnapsackDataRead response = new MultipleKnapsackDataRead();
		response.setBinCapacities(binCapacities);
		response.setNumBins(numOfBins);
		response.setNumItems(numOfItems);
		for (int i = 0; i < values.length; i++) {
			MultipleKnapsackDisplayResponse item = new MultipleKnapsackDisplayResponse();
			item.setX(values[i]);
			item.setY(weights[i]);
			item.setSize(2);
			item.setColor(1.3);
			items.add(item);
		}

		response.setInitialData(items);

		return response;
	}

	@PostMapping(value = "/result")
	public void resultData(@RequestParam("file") MultipartFile file) {
		utils.readMultipleKnapsacksData(file);
		final MultipleKnapsackModel data = new MultipleKnapsackModel();
		// Create the linear solver with the CBC backend.
		MPSolver solver = new MPSolver("SimpleMipProgram",
				MPSolver.OptimizationProblemType.CBC_MIXED_INTEGER_PROGRAMMING);
		MPVariable[][] x = new MPVariable[data.getNumItems()][data.getNumBins()];
		for (int i = 0; i < data.getNumItems(); ++i) {
			for (int j = 0; j < data.getNumBins(); ++j) {
				x[i][j] = solver.makeIntVar(0, 1, "");
			}
		}

		for (int i = 0; i < data.getNumItems(); ++i) {
			MPConstraint constraint = solver.makeConstraint(0, 1, "");
			for (int j = 0; j < data.getNumBins(); ++j) {
				constraint.setCoefficient(x[i][j], 1);
			}
		}

		double[] binCapacities = data.getBinCapacities();

		double[] weights = data.getWeights();
		double[] values = data.getValues();

		for (int j = 0; j < data.getNumBins(); ++j) {
			MPConstraint constraint = solver.makeConstraint(0, binCapacities[j], "");
			for (int i = 0; i < data.getNumItems(); ++i) {
				constraint.setCoefficient(x[i][j], weights[i]);
			}
		}

		MPObjective objective = solver.objective();
		for (int i = 0; i < data.getNumItems(); ++i) {
			for (int j = 0; j < data.getNumBins(); ++j) {
				objective.setCoefficient(x[i][j], values[i]);
			}
		}
		objective.setMaximization();

		final MPSolver.ResultStatus resultStatus = solver.solve();

		// Check that the problem has an optimal solution.
		if (resultStatus == MPSolver.ResultStatus.OPTIMAL) {
			System.out.println("Total packed value: " + objective.value() + "\n");
			double totalWeight = 0;
			for (int j = 0; j < data.getNumBins(); ++j) {
				double binWeight = 0;
				double binValue = 0;
				System.out.println("Bin " + j + "\n");
				for (int i = 0; i < data.getNumItems(); ++i) {
					if (x[i][j].solutionValue() == 1) {
						System.out.println("Item " + i + " - weight: " + weights[i] + "  value: " + values[i]);
						binWeight += weights[i];
						binValue += values[i];
					}
				}
				System.out.println("Packed bin weight: " + binWeight);
				System.out.println("Packed bin value: " + binValue + "\n");
				totalWeight += binWeight;
			}
			System.out.println("Total packed weight: " + totalWeight);
		} else {
			System.err.println("The problem does not have an optimal solution.");
		}
	}

}
