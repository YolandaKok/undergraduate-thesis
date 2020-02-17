package com.or.tools.model;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DistanceMatrixModel {
	private ArrayList<String> destination_addresses;
	private ArrayList<String> origin_addresses;
	@JsonProperty("rows")
	private ArrayList<Row> rows;
	private String status;

	public ArrayList<String> getDestination_addresses() {
		return destination_addresses;
	}

	public void setDestination_addresses(ArrayList<String> destination_addresses) {
		this.destination_addresses = destination_addresses;
	}

	public ArrayList<String> getOrigin_addresses() {
		return origin_addresses;
	}

	public void setOrigin_addresses(ArrayList<String> origin_addresses) {
		this.origin_addresses = origin_addresses;
	}

	public ArrayList<Row> getRows() {
		return rows;
	}

	public void setRows(ArrayList<Row> rows) {
		this.rows = rows;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "DistanceMatrixModel [destination_addresses=" + destination_addresses + ", origin_addresses="
				+ origin_addresses + ", rows=" + rows + ", status=" + status + "]";
	}

}
