package com.or.tools.services;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.or.tools.entities.ExperimentDTO;

public interface ExperimentService {
	void saveExperiment(String username, String algorithmName, String Data, Date date);

	Page<ExperimentDTO> getAllExperiments(String username, Pageable page);
}
