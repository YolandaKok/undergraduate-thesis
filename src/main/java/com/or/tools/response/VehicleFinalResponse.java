package com.or.tools.response;

import java.util.List;

import com.google.maps.model.LatLng;
import com.or.tools.model.Coords;

public class VehicleFinalResponse {
	private LatLng center;
	private List<List<LatLng>> routes;
	private List<Coords> markers;
	private List<List<Integer>> routesInt;

	public List<List<Integer>> getRoutesInt() {
		return routesInt;
	}

	public void setRoutesInt(List<List<Integer>> routesInt) {
		this.routesInt = routesInt;
	}

	public List<Coords> getMarkers() {
		return markers;
	}

	public void setMarkers(List<Coords> markers) {
		this.markers = markers;
	}

	public LatLng getCenter() {
		return center;
	}

	public void setCenter(LatLng center) {
		this.center = center;
	}

	public List<List<LatLng>> getRoutes() {
		return routes;
	}

	public void setRoutes(List<List<LatLng>> routes) {
		this.routes = routes;
	}

}
