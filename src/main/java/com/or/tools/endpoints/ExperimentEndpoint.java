package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.entities.ExperimentDTO;
import com.or.tools.requests.ExperimentRequest;
import com.or.tools.response.ExperimentResponse;
import com.or.tools.services.ExperimentService;

@RestController
@RequestMapping(value = "/experiments")
public class ExperimentEndpoint {

	@Autowired
	private ExperimentService service;

	@PostMapping
	public void addExperiment(@RequestBody ExperimentRequest request) {
		service.saveExperiment(request.getUsername(), request.getAlgorithmName(), request.getData(), request.getDate());
	}

	@GetMapping("/{username}")
	public List<ExperimentResponse> getExperiments(@PathVariable("username") String username) {

		List<ExperimentDTO> response = service.getAllExperiments(username);
		List<ExperimentResponse> finalResponse = new ArrayList<>();
		for (ExperimentDTO item : response) {
			ExperimentResponse experiment = new ExperimentResponse();
			experiment.setAlgorithmName(item.getAlgorithm());
			experiment.setDescription(item.getAlgorithmDTO().getDescription());
			finalResponse.add(experiment);
		}
		return finalResponse;
	}
}
