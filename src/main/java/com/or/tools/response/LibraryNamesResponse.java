package com.or.tools.response;

import java.util.List;

public class LibraryNamesResponse {

	private List<String> libraryNames;

	public List<String> getLibraryNames() {
		return libraryNames;
	}

	public void setLibraryNames(List<String> libraryNames) {
		this.libraryNames = libraryNames;
	}

	@Override
	public String toString() {
		return "LibraryNamesResponse [libraryNames=" + libraryNames + ", getLibraryNames()=" + getLibraryNames()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}

}
