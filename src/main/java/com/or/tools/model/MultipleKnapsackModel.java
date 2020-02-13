package com.or.tools.model;

public class MultipleKnapsackModel {
	private double[] weights;
	private double[] values;
	private int numItems;
	private int numBins;
	private double[] binCapacities;

	public double[] getWeights() {
		return weights;
	}

	public void setWeights(double[] weights) {
		this.weights = weights;
	}

	public double[] getValues() {
		return values;
	}

	public void setValues(double[] values) {
		this.values = values;
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
