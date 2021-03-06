package com.or.tools.model;

import java.util.List;

public class PathModel {
	private String origin;
	private List<String> waypoints;
	private long routeDistance;
	private List<Integer> routes;

	public List<Integer> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Integer> routes) {
		this.routes = routes;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public List<String> getWaypoints() {
		return waypoints;
	}

	public void setWaypoints(List<String> waypoints) {
		this.waypoints = waypoints;
	}

	public long getRouteDistance() {
		return routeDistance;
	}

	public void setRouteDistance(long routeDistance) {
		this.routeDistance = routeDistance;
	}

}
