package com.or.tools.model;

import java.util.List;

public class BinWrapper {
	private List<MultipleKnapsackDisplayResponse> points;
	private double packedValue;
	private double packedWeight;

	public List<MultipleKnapsackDisplayResponse> getPoints() {
		return points;
	}

	public void setPoints(List<MultipleKnapsackDisplayResponse> points) {
		this.points = points;
	}

	public double getPackedValue() {
		return packedValue;
	}

	public void setPackedValue(double packedValue) {
		this.packedValue = packedValue;
	}

	public double getPackedWeight() {
		return packedWeight;
	}

	public void setPackedWeight(double packedWeight) {
		this.packedWeight = packedWeight;
	}

}
