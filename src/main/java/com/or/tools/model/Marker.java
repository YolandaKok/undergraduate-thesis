package com.or.tools.model;

import com.google.maps.model.LatLng;

public class Marker {
	private LatLng coords;
	private Integer number;
	private String address;

	public LatLng getCoords() {
		return coords;
	}

	public void setCoords(LatLng coords) {
		this.coords = coords;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

}
