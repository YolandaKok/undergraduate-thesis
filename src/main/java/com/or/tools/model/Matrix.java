package com.or.tools.model;

import java.util.ArrayList;
import java.util.List;

public class Matrix {

	private List<List<Double>> matrix;

	@Override
	public String toString() {
		return matrix.toString();
	}

	@SafeVarargs
	public Matrix(List<Double>... lists) {
		matrix = new ArrayList<>();
		for (List<Double> list : lists) {
			matrix.add(list);
		}
	}

	public Matrix(List<List<Double>> mat) {
		matrix = mat;
	}

	public double determinant() {
		if (matrix.size() == 1) {
			return get(0, 0);
		}
		if (matrix.size() == 2) {
			return get(0, 0) * get(1, 1) - get(0, 1) * get(1, 0);
		}
		double sum = 0;
		double sign = 1;
		for (int i = 0; i < matrix.size(); i++) {
			sum += sign * get(0, i) * coFactor(0, i).determinant();
			sign *= -1;
		}
		return sum;
	}

	private Matrix coFactor(int row, int col) {
		List<List<Double>> mat = new ArrayList<>();
		for (int i = 0; i < matrix.size(); i++) {
			if (i == row) {
				continue;
			}
			List<Double> list = new ArrayList<>();
			for (int j = 0; j < matrix.size(); j++) {
				if (j == col) {
					continue;
				}
				list.add(get(i, j));
			}
			mat.add(list);
		}
		return new Matrix(mat);
	}

	public Matrix replaceColumn(List<Double> b, int column) {
		List<List<Double>> mat = new ArrayList<>();
		for (int row = 0; row < matrix.size(); row++) {
			List<Double> list = new ArrayList<>();
			for (int col = 0; col < matrix.size(); col++) {
				double value = get(row, col);
				if (col == column) {
					value = b.get(row);
				}
				list.add(value);
			}
			mat.add(list);
		}
		return new Matrix(mat);
	}

	private double get(int row, int col) {
		return matrix.get(row).get(col);
	}

}