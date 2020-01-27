package com.or.tools.requests;

import java.util.Date;

public class ExperimentRequest {

	private String username;
	private String algorithmName;
	private Date date;
	private String data;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAlgorithmName() {
		return algorithmName;
	}

	public void setAlgorithmName(String algorithmName) {
		this.algorithmName = algorithmName;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ExperimentRequest [username=" + username + ", algorithmName=" + algorithmName + ", date=" + date
				+ ", data=" + data + "]";
	}

}
