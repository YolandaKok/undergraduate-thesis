package com.or.tools.services;

import java.util.Date;
import java.util.List;

import com.or.tools.entities.ExperimentDTO;

public interface ExperimentService {
	void saveExperiment(String username, String algorithmName, String Data, Date date);

	List<ExperimentDTO> getAllExperiments(String username);
}
