package com.or.tools.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "Experiment")
public class ExperimentDTO {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private Long id;
	@Column(name = "ALGORITHM")
	private String Algorithm;
	@Column(name = "DATA")
	@Type(type = "text")
	private String Data;
	@Type(type = "text")
	private String resultData;
	@Column(name = "MODIFICATION_DATE")
	private Date modificationDate;
	@ManyToOne(fetch = FetchType.LAZY)
	private UserDTO user;
	@ManyToOne(fetch = FetchType.LAZY)
	private AlgorithmDTO algorithm;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAlgorithm() {
		return Algorithm;
	}

	public void setAlgorithm(String algorithm) {
		Algorithm = algorithm;
	}

	public String getData() {
		return Data;
	}

	public void setData(String data) {
		Data = data;
	}

	public Date getModificationDate() {
		return modificationDate;
	}

	public void setModificationDate(Date modificationDate) {
		this.modificationDate = modificationDate;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public void setAlgorithm(AlgorithmDTO algorithm) {
		this.algorithm = algorithm;
	}

	public AlgorithmDTO getAlgorithmDTO() {
		return this.algorithm;
	}

	public String getResultData() {
		return resultData;
	}

	public void setResultData(String resultData) {
		this.resultData = resultData;
	}

}
