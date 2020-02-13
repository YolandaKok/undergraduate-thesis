package com.or.tools.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "DataSample")
public class DataSampleDTO {
	@Id
	@GeneratedValue
	@Column(name = "ID")
	private Long id;
	@Column(name = "DATA")
	@Type(type = "text")
	private String DataSample;
	@Column(name = "DATA_RESULT")
	@Type(type = "text")
	private String DataSampleResult;
	@ManyToOne(fetch = FetchType.LAZY)
	private AlgorithmDTO algorithm;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDataSample() {
		return DataSample;
	}

	public void setDataSample(String dataSample) {
		DataSample = dataSample;
	}

	public AlgorithmDTO getAlgorithm() {
		return algorithm;
	}

	public void setAlgorithm(AlgorithmDTO algorithm) {
		this.algorithm = algorithm;
	}

	public String getDataSampleResult() {
		return DataSampleResult;
	}

	public void setDataSampleResult(String dataSampleResult) {
		DataSampleResult = dataSampleResult;
	}

}
