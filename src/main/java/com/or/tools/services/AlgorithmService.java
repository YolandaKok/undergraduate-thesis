package com.or.tools.services;

import java.util.List;

import com.or.tools.response.AlgorithmResponse;

public interface AlgorithmService {
	List<AlgorithmResponse> findAll();

	List<String> findAllCategories();
}
