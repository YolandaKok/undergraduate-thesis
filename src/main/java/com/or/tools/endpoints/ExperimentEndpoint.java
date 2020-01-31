package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.entities.ExperimentDTO;
import com.or.tools.requests.ExperimentRequest;
import com.or.tools.response.CustomPage;
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
	public CustomPage<ExperimentResponse> getExperiments(@PathVariable("username") String username, Pageable page) {
		Page<ExperimentDTO> response = service.getAllExperiments(username, page);
		System.out.println(response.getContent());
		List<ExperimentDTO> responses = response.getContent();
		List<ExperimentResponse> exResponses = new ArrayList<>();
		for (ExperimentDTO item : responses) {
			ExperimentResponse itemResponse = new ExperimentResponse();
			itemResponse.setAlgorithmName(item.getAlgorithm());
			itemResponse.setDescription(item.getAlgorithmDTO().getDescription());
			itemResponse.setModificationDate(item.getModificationDate());
			exResponses.add(itemResponse);
		}
		CustomPage<ExperimentResponse> pageResponse = new CustomPage<>();
		pageResponse.setResponse(exResponses);
		pageResponse.setNumOfElements(response.getNumberOfElements());
		pageResponse.setNumOfPage(response.getNumber());
		pageResponse.setSizeOfPage(response.getSize());
		pageResponse.setTotalElements(response.getTotalElements());
		pageResponse.setTotalPages(response.getTotalPages());
		return pageResponse;
	}
}
