package com.or.tools.services;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.or.tools.entities.ExperimentDTO;

public interface ExperimentService {
	void saveExperiment(String username, String algorithmName, String Data, Date date);

	void deleteExperiment(Long id);

	List<String> getAllAlgorithmNames(String username);

	Page<ExperimentDTO> getAllExperiments(String username, Pageable page);
}
