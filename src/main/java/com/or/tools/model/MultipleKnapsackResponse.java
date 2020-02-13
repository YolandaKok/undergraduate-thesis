package com.or.tools.model;

import java.util.List;

public class MultipleKnapsackResponse {
	private List<BinWrapper> bins;
	private double totalPackedWeight;
	private double totalPackedValue;

	public List<BinWrapper> getBins() {
		return bins;
	}

	public void setBins(List<BinWrapper> bins) {
		this.bins = bins;
	}

	public double getTotalPackedWeight() {
		return totalPackedWeight;
	}

	public void setTotalPackedWeight(double totalPackedWeight) {
		this.totalPackedWeight = totalPackedWeight;
	}

	public double getTotalPackedValue() {
		return totalPackedValue;
	}

	public void setTotalPackedValue(double totalPackedValue) {
		this.totalPackedValue = totalPackedValue;
	}

}
