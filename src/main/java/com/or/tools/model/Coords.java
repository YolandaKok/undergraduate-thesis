package com.or.tools.model;

public class Coords {

	private Double lat;
	private Double lng;
	private String address;
	private Integer label;
	private Integer vehicle;

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Integer getLabel() {
		return label;
	}

	public void setLabel(Integer label) {
		this.label = label;
	}

	public Integer getVehicle() {
		return vehicle;
	}

	public void setVehicle(Integer vehicle) {
		this.vehicle = vehicle;
	}

}
