package com.or.tools.services;

import java.util.List;

import com.or.tools.entities.DataSampleDTO;

public interface DataSampleService {
	void insertSample(Long algorithmId, String sample);

	List<DataSampleDTO> findById(Long algorithmId);
}
