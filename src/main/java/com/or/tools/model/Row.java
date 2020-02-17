package com.or.tools.model;

import java.util.List;

public class Row {
	List<Element> elements;

	public List<Element> getElements() {
		return elements;
	}

	public void setElements(List<Element> elements) {
		this.elements = elements;
	}

	@Override
	public String toString() {
		return "Row [elements=" + elements + "]";
	}

}
