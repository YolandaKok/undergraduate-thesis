package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.entities.DataSampleDTO;
import com.or.tools.response.DataSampleResponse;
import com.or.tools.services.DataSampleService;

@RestController
@RequestMapping("/samples")
public class DataSampleEndpoint {

	@Autowired
	private DataSampleService service;

	@PostMapping("/{algorithmId}")
	public void insertSample(@PathVariable("algorithmId") Long algorithmId, @RequestParam("data") String data) {
		service.insertSample(algorithmId, data);
	}

	@GetMapping("/{algorithmId}")
	public List<DataSampleResponse> findSample(@PathVariable("algorithmId") Long algorithmId) {
		List<DataSampleDTO> samples = service.findById(algorithmId);
		List<DataSampleResponse> responses = new ArrayList<>();
		for (DataSampleDTO item : samples) {
			DataSampleResponse response = new DataSampleResponse();
			response.setSample(item.getDataSample());
			response.setId(item.getId());
			response.setDataResult(item.getDataSampleResult());
			responses.add(response);
		}
		return responses;
	}

}
