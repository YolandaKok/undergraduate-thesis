package com.or.tools.services.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.entities.ExperimentDTO;
import com.or.tools.entities.UserDTO;
import com.or.tools.repositories.AlgorithmDAO;
import com.or.tools.repositories.ExperimentDAO;
import com.or.tools.repositories.UserDAO;
import com.or.tools.services.ExperimentService;

@Service
public class ExperimentServiceImpl implements ExperimentService {

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private AlgorithmDAO algorithmDAO;

	@Autowired
	private ExperimentDAO experimentDAO;

	@Override
	@Transactional
	public void saveExperiment(String username, String algorithmName, String data, Date date) {
		UserDTO user = userDAO.findByUsername(username);
		AlgorithmDTO algorithm = algorithmDAO.findByName(algorithmName);
		ExperimentDTO experiment = new ExperimentDTO();
		experiment.setUser(user);
		experiment.setAlgorithm(algorithm.getName());
		experiment.setAlgorithm(algorithm);
		experiment.setData(data);
		experiment.setModificationDate(date);
		experimentDAO.save(experiment);
	}

	@Override
	public Page<ExperimentDTO> getAllExperiments(String username, Pageable page) {
		UserDTO userDTO = userDAO.findByUsername(username);
		return experimentDAO.findByUser(userDTO, page);
	}

}
