package com.or.tools.algorithms;

import java.util.ArrayList;
import java.util.List;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.ortools.algorithms.KnapsackSolver;
import com.or.tools.endpoints.KnapsackEndpoint;
import com.or.tools.model.KnapsackDisplayResponse;
import com.or.tools.model.KnapsackModel;
import com.or.tools.model.KnapsackResult;
import com.or.tools.util.IOUtils;

@Service
public class KnapsackService {

	private static final Logger log = LoggerFactory.getLogger(KnapsackEndpoint.class);

	@Autowired
	private IOUtils ioUtils;

	public Pair<List<KnapsackDisplayResponse>, Long> reorganiseData(MultipartFile file) {
		KnapsackModel model = ioUtils.readKnapsackData(file);

		long[] values = model.getValues();
		long[][] weights = model.getWeights();
		long[] capacities = model.getCapacities();

		List<KnapsackDisplayResponse> response = new ArrayList<>();

		for (int i = 0; i < values.length; i++) {
			KnapsackDisplayResponse item = new KnapsackDisplayResponse();
			item.setX(values[i]);
			item.setY(weights[0][i]);
			item.setSize(2);
			item.setColor(1.3);
			response.add(item);
		}

		Pair<List<KnapsackDisplayResponse>, Long> res = new Pair<List<KnapsackDisplayResponse>, Long>(response,
				capacities[0]);

		return res;
	}

	public KnapsackResult solve(MultipartFile file) {
		KnapsackSolver solver = new KnapsackSolver(
				KnapsackSolver.SolverType.KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER, "test");

		KnapsackModel model = ioUtils.readKnapsackData(file);

		long[][] weights = model.getWeights();

		log.info("Model: {}", model);

		solver.init(model.getValues(), weights, model.getCapacities());
		final long computedValue = solver.solve();

		ArrayList<Integer> packedItems = new ArrayList<Integer>();
		ArrayList<Long> packedWeights = new ArrayList<Long>();
		int totalWeight = 0;
		System.out.println("Total value = " + computedValue);
		for (int i = 0; i < model.getValues().length; i++) {
			if (solver.bestSolutionContains(i)) {
				packedItems.add(i);
				packedWeights.add(weights[0][i]);
				totalWeight = (int) (totalWeight + weights[0][i]);
			}
		}
		System.out.println("Total weight: " + totalWeight);
		System.out.println("Packed items: " + packedItems);
		System.out.println("Packed weights: " + packedWeights);

		KnapsackResult result = new KnapsackResult();
		result.setPackedItems(packedItems);
		result.setTotalValue(computedValue);
		result.setTotalWeight(totalWeight);

		return result;
	}

}
