package com.or.tools.response;

import java.util.List;

public class ListResponse<T> {
	List<T> list;

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

}
