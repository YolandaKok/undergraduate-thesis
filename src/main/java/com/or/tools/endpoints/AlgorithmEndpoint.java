package com.or.tools.endpoints;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.response.AlgorithmResponse;
import com.or.tools.services.AlgorithmService;

@RestController
@RequestMapping("/algorithms")
public class AlgorithmEndpoint {

	@Autowired
	private AlgorithmService algorithmService;

	@GetMapping("/findAll")
	public List<AlgorithmResponse> getAllAlgorithms() {
		List<AlgorithmResponse> responses = algorithmService.findAll();
		return responses;
	}
}
