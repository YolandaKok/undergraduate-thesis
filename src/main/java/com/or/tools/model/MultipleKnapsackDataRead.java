package com.or.tools.model;

import java.util.List;

public class MultipleKnapsackDataRead {
	private List<MultipleKnapsackDisplayResponse> initialData;
	private int numItems;
	private int numBins;
	private double[] binCapacities;

	public List<MultipleKnapsackDisplayResponse> getInitialData() {
		return initialData;
	}

	public void setInitialData(List<MultipleKnapsackDisplayResponse> initialData) {
		this.initialData = initialData;
	}

	public int getNumItems() {
		return numItems;
	}

	public void setNumItems(int numItems) {
		this.numItems = numItems;
	}

	public int getNumBins() {
		return numBins;
	}

	public void setNumBins(int numBins) {
		this.numBins = numBins;
	}

	public double[] getBinCapacities() {
		return binCapacities;
	}

	public void setBinCapacities(double[] binCapacities) {
		this.binCapacities = binCapacities;
	}

}
