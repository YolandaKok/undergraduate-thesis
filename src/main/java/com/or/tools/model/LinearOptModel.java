package com.or.tools.model;

import java.util.List;

public class LinearOptModel {

	private LinearObjective objective;
	private List<LinearConstrain> constrains;

	public LinearObjective getObjective() {
		return objective;
	}

	public void setObjective(LinearObjective objective) {
		this.objective = objective;
	}

	public List<LinearConstrain> getConstrains() {
		return constrains;
	}

	public void setConstrains(List<LinearConstrain> constrains) {
		this.constrains = constrains;
	}

}
