package com.or.tools.response;

import java.util.List;

public class ExperimentPage {

	private List<ExperimentResponse> response;
	private int numOfPage;
	private int numOfElements;
	private int totalPages;
	private long totalElements;
	private int sizeOfPage;

	public List<ExperimentResponse> getResponse() {
		return response;
	}

	public void setResponse(List<ExperimentResponse> response) {
		this.response = response;
	}

	public int getNumOfPage() {
		return numOfPage;
	}

	public void setNumOfPage(int numOfPage) {
		this.numOfPage = numOfPage;
	}

	public int getNumOfElements() {
		return numOfElements;
	}

	public void setNumOfElements(int numOfElements) {
		this.numOfElements = numOfElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public int getSizeOfPage() {
		return sizeOfPage;
	}

	public void setSizeOfPage(int sizeOfPage) {
		this.sizeOfPage = sizeOfPage;
	}

}
