package com.or.tools.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.repositories.AlgorithmDAO;
import com.or.tools.response.AlgorithmResponse;
import com.or.tools.services.AlgorithmService;

@Service
public class AlgorithmServiceImpl implements AlgorithmService {

	@Autowired
	private AlgorithmDAO algorithmDAO;

	@Override
	@Transactional
	public List<AlgorithmResponse> findAll() {
		List<AlgorithmDTO> algorithms = algorithmDAO.findAll();
		List<AlgorithmResponse> responses = new ArrayList<>();
		if (algorithms.isEmpty())
			return responses;

		for (int i = 0; i < algorithms.size(); i++) {
			AlgorithmResponse response = new AlgorithmResponse();
			response.setId(algorithms.get(i).getId());
			response.setName(algorithms.get(i).getName());
			response.setCategory(algorithms.get(i).getCategory());
			response.setDescription(algorithms.get(i).getDescription());
			response.setLibrary(algorithms.get(i).getLibrary().getName());
			responses.add(response);
		}

		return responses;
	}
}
