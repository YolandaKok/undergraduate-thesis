package com.or.tools.model;

import java.util.Arrays;

public class KnapsackModel {
	private long[] values;
	private long[][] weights;
	private long[] capacities;

	public long[] getValues() {
		return values;
	}

	public void setValues(long[] values) {
		this.values = values;
	}

	public long[][] getWeights() {
		return weights;
	}

	public void setWeights(long[][] weights) {
		this.weights = weights;
	}

	public long[] getCapacities() {
		return capacities;
	}

	public void setCapacities(long[] capacities) {
		this.capacities = capacities;
	}

	@Override
	public String toString() {
		return "KnapsackModel [values=" + Arrays.toString(values) + ", weights=" + Arrays.toString(weights)
				+ ", capacities=" + Arrays.toString(capacities) + "]";
	}

}
