package com.or.tools.model;

public class Duration {
	private String text;
	private Integer value;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "Duration [text=" + text + ", value=" + value + "]";
	}

}
