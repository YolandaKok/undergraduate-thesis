package com.or.tools.model;

import java.util.ArrayList;

public class KnapsackResult {

	private ArrayList<Integer> packedItems;
	private int totalWeight;
	private long totalValue;

	public ArrayList<Integer> getPackedItems() {
		return packedItems;
	}

	public void setPackedItems(ArrayList<Integer> packedItems) {
		this.packedItems = packedItems;
	}

	public int getTotalWeight() {
		return totalWeight;
	}

	public void setTotalWeight(int totalWeight) {
		this.totalWeight = totalWeight;
	}

	public long getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(long totalValue) {
		this.totalValue = totalValue;
	}

}
