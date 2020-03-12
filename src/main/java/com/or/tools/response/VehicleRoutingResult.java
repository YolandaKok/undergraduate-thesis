package com.or.tools.response;

import java.util.List;

import com.or.tools.model.Coords;

public class VehicleRoutingResult {
	private List<String> destinations;
	private int numOfVehicles;
	private long maxArcDistance;
	private int startIndex;
	List<Coords> markers;

	public List<Coords> getMarkers() {
		return markers;
	}

	public void setMarkers(List<Coords> markers) {
		this.markers = markers;
	}

	public List<String> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<String> destinations) {
		this.destinations = destinations;
	}

	public int getNumOfVehicles() {
		return numOfVehicles;
	}

	public void setNumOfVehicles(int numOfVehicles) {
		this.numOfVehicles = numOfVehicles;
	}

	public long getMaxArcDistance() {
		return maxArcDistance;
	}

	public void setMaxArcDistance(long maxArcDistance) {
		this.maxArcDistance = maxArcDistance;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

}
