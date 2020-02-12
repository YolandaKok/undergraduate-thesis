package com.or.tools.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.entities.DataSampleDTO;
import com.or.tools.repositories.AlgorithmDAO;
import com.or.tools.repositories.DataSampleDAO;
import com.or.tools.services.DataSampleService;

@Service
public class DataSampleServiceImpl implements DataSampleService {

	@Autowired
	private DataSampleDAO dataSampleDAO;

	@Autowired
	private AlgorithmDAO algorithmDAO;

	@Override
	@Transactional
	public void insertSample(Long algorithmId, String sample) {
		Optional<AlgorithmDTO> algorithmDTO = algorithmDAO.findById(algorithmId);
		AlgorithmDTO algorithm = algorithmDTO.get();
		DataSampleDTO dataSampleDTO = new DataSampleDTO();
		dataSampleDTO.setAlgorithm(algorithm);
		dataSampleDTO.setDataSample(sample);
		dataSampleDAO.save(dataSampleDTO);
	}

	@Override
	public List<DataSampleDTO> findById(Long algorithmId) {
		return dataSampleDAO.findByAlgorithmId(algorithmId);
	}

}
