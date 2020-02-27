package com.or.tools.algorithms;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.ortools.linearsolver.MPConstraint;
import com.google.ortools.linearsolver.MPObjective;
import com.google.ortools.linearsolver.MPSolver;
import com.google.ortools.linearsolver.MPVariable;
import com.or.tools.model.BinWrapper;
import com.or.tools.model.MultipleKnapsackDataRead;
import com.or.tools.model.MultipleKnapsackDisplayResponse;
import com.or.tools.model.MultipleKnapsackModel;
import com.or.tools.model.MultipleKnapsackResponse;
import com.or.tools.util.IOUtils;

@Service
public class MultipleKnapsacksService {

	@Autowired
	private IOUtils utils;

	public MultipleKnapsackDataRead reorganiseData(MultipartFile file) {
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

	public MultipleKnapsackResponse solve(MultipartFile file) {
		MultipleKnapsackModel data = new MultipleKnapsackModel();
		data = utils.readMultipleKnapsacksData(file);
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

		// MultipleKnapsackResult
		MultipleKnapsackResponse res = new MultipleKnapsackResponse();

		final MPSolver.ResultStatus resultStatus = solver.solve();

		double startColor = 0.4;

		// Check that the problem has an optimal solution.
		if (resultStatus == MPSolver.ResultStatus.OPTIMAL) {
			List<BinWrapper> bins = new ArrayList<>();
			System.out.println("Total packed value: " + objective.value() + "\n");
			res.setTotalPackedValue(objective.value());
			double totalWeight = 0;
			for (int j = 0; j < data.getNumBins(); ++j) {
				double binWeight = 0;
				double binValue = 0;
				List<MultipleKnapsackDisplayResponse> points = new ArrayList<>();
				System.out.println("Bin " + j + "\n");
				for (int i = 0; i < data.getNumItems(); ++i) {
					if (x[i][j].solutionValue() == 1) {
						System.out.println("Item " + i + " - weight: " + weights[i] + "  value: " + values[i]);
						MultipleKnapsackDisplayResponse item = new MultipleKnapsackDisplayResponse();
						item.setColor(startColor);
						item.setSize(2);
						item.setX(values[i]);
						item.setY(weights[i]);
						item.setBin(j);
						binWeight += weights[i];
						binValue += values[i];
						points.add(item);
					}

				}
				BinWrapper bin = new BinWrapper();
				bin.setPoints(points);
				bin.setPackedWeight(binWeight);
				bin.setPackedValue(binValue);
				bins.add(bin);
				System.out.println("Packed bin weight: " + binWeight);
				System.out.println("Packed bin value: " + binValue + "\n");
				totalWeight += binWeight;
				startColor += 0.3;
			}
			System.out.println("Total packed weight: " + totalWeight);
			res.setTotalPackedWeight(totalWeight);
			res.setBins(bins);

		} else {
			System.err.println("The problem does not have an optimal solution.");
		}
		return res;
	}
}
