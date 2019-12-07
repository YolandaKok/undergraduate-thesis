package com.or.tools.dto;
import java.util.*;

public class LinearProblemDTO {
	
	private LinearVariablesDTO variables;
	private List<LinearConstrainDTO> constrains;
	private LinearObjectiveDTO objective;
	
	public LinearVariablesDTO getVariables() {
		return variables;
	}
	public void setVariables(LinearVariablesDTO variables) {
		this.variables = variables;
	}
	public List<LinearConstrainDTO> getConstrains() {
		return constrains;
	}
	public void setConstrains(List<LinearConstrainDTO> constrains) {
		this.constrains = constrains;
	}
	public LinearObjectiveDTO getObjective() {
		return objective;
	}
	public void setObjective(LinearObjectiveDTO objective) {
		this.objective = objective;
	}
}
