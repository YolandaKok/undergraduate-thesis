package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.ortools.algorithms.KnapsackSolver;
import com.or.tools.model.KnapsackDisplayResponse;
import com.or.tools.model.KnapsackModel;
import com.or.tools.model.KnapsackResult;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping("/knapsack")
public class KnapsackEndpoint {

	private static final Logger log = LoggerFactory.getLogger(KnapsackEndpoint.class);

	@Autowired
	private IOUtils ioUtils;

	@PostMapping(value = "/data")
	public Pair<List<KnapsackDisplayResponse>, Long> reorganiseData(@RequestParam("file") MultipartFile file) {
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

	@PostMapping(value = "/result")
	public KnapsackResult testKnapsack(@RequestParam("file") MultipartFile file) {
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

/*
 * final long[] values = { 360, 83, 59, 130, 431, 67, 230, 52, 93, 125, 670,
 * 892, 600, 38, 48, 147, 78, 256, 63, 17, 120, 164, 432, 35, 92, 110, 22, 42,
 * 50, 323, 514, 28, 87, 73, 78, 15, 26, 78, 210, 36, 85, 189, 274, 43, 33, 10,
 * 19, 389, 276, 312 };
 * 
 * final long[][] weights = { { 7, 0, 30, 22, 80, 94, 11, 81, 70, 64, 59, 18, 0,
 * 36, 3, 8, 15, 42, 9, 0, 42, 47, 52, 32, 26, 48, 55, 6, 29, 84, 2, 4, 18, 56,
 * 7, 29, 93, 44, 71, 3, 86, 66, 31, 65, 0, 79, 20, 65, 52, 13 } };
 * 
 * final long[] capacities = { 850 };
 */