package com.or.tools.requests;

import java.util.Arrays;

public class DistanceRequest {
	private long[][] distances;

	public long[][] getDistances() {
		return distances;
	}

	public void setDistances(long[][] distances) {
		this.distances = distances;
	}

	@Override
	public String toString() {
		return "DistanceRequest [distances=" + Arrays.toString(distances) + "]";
	}

}
