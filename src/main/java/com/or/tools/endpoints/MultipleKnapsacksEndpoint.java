package com.or.tools.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.or.tools.algorithms.MultipleKnapsacksService;
import com.or.tools.model.MultipleKnapsackDataRead;
import com.or.tools.model.MultipleKnapsackResponse;

@RestController
@RequestMapping("/multiple/knapsacks")
public class MultipleKnapsacksEndpoint {

	@Autowired
	private MultipleKnapsacksService service;

	@PostMapping(value = "/data")
	public MultipleKnapsackDataRead reorganiseData(@RequestParam("file") MultipartFile file) {
		return service.reorganiseData(file);
	}

	@PostMapping(value = "/result")
	public MultipleKnapsackResponse resultData(@RequestParam("file") MultipartFile file) {
		return service.solve(file);
	}

}
