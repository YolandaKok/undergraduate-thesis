package com.or.tools.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.response.AlgorithmResponse;

public interface AlgorithmService {
	List<AlgorithmResponse> findAll();

	Page<AlgorithmDTO> findAll(Pageable page);

	List<String> findAllCategories();
}
