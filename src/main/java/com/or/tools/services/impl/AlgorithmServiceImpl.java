package com.or.tools.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.repositories.AlgorithmDAO;
import com.or.tools.response.AlgorithmResponse;
import com.or.tools.services.AlgorithmService;

@Service
public class AlgorithmServiceImpl implements AlgorithmService {

	@Autowired
	private AlgorithmDAO algorithmDAO;

	@Override
	public List<AlgorithmResponse> findAll() {
		List<AlgorithmDTO> algorithms;
		algorithms = algorithmDAO.findAll();
		List<AlgorithmResponse> responses = new ArrayList<>();
		if (algorithms.isEmpty())
			return responses;
		algorithms.parallelStream().forEach((item) -> {
			AlgorithmResponse response = new AlgorithmResponse();
			response.setId(item.getId());
			response.setName(item.getName());
			response.setCategory(item.getCategory());
			response.setDescription(item.getDescription());
			response.setLibrary(item.getLibrary().getName());
			responses.add(response);
		});
		return responses;
	}

}
