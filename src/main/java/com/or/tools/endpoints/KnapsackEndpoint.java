package com.or.tools.endpoints;

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

import com.or.tools.algorithms.KnapsackService;
import com.or.tools.model.KnapsackDisplayResponse;
import com.or.tools.model.KnapsackResult;

@RestController
@RequestMapping("/knapsack")
public class KnapsackEndpoint {

	private static Logger logger = LoggerFactory.getLogger(KnapsackEndpoint.class);

	@Autowired
	private KnapsackService knapsackService;

	@PostMapping(value = "/data")
	public Pair<List<KnapsackDisplayResponse>, Long> reorganiseData(@RequestParam("file") MultipartFile file) {
		logger.info("File: {}", file);
		return knapsackService.reorganiseData(file);
	}

	@PostMapping(value = "/result")
	public KnapsackResult solve(@RequestParam("file") MultipartFile file) {
		logger.info("File: {}", file);
		KnapsackResult result = knapsackService.solve(file);
		logger.info("Result: {}", result);
		return result;
	}
}