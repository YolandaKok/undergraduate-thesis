package com.or.tools.response;

import java.util.ArrayList;

public class RoutesResponse {
	private ArrayList<Integer> routes;
	private long totalDistance;

	public ArrayList<Integer> getRoutes() {
		return routes;
	}

	public void setRoutes(ArrayList<Integer> routes) {
		this.routes = routes;
	}

	public long getTotalDistance() {
		return totalDistance;
	}

	public void setTotalDistance(long totalDistance) {
		this.totalDistance = totalDistance;
	}

}
