package com.or.tools.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.or.tools.model.KnapsackModel;
import com.or.tools.model.LinearConstrain;
import com.or.tools.model.LinearObjective;
import com.or.tools.model.LinearOptModel;
import com.or.tools.model.MultipleKnapsackModel;
import com.or.tools.response.VehicleRoutingResult;

@Component
public class IOUtils {

	private static final Logger log = LoggerFactory.getLogger(IOUtils.class);

	public KnapsackModel readKnapsackData(MultipartFile file) {

		int numOfRows = 0;
		int totalRows;

		KnapsackModel response = new KnapsackModel();

		long[] capacities = new long[1];
		long[] values;
		long[][] weights;

		if (!file.isEmpty()) {
			// Read the file
			try {
				byte[] bytes = file.getBytes();
				String data = new String(bytes);
				String[] rows = data.split("\n");
				log.info("Number of rows: {}", rows.length);
				totalRows = rows.length;
				values = new long[totalRows - 2];
				weights = new long[1][totalRows - 2];

				int num = 0;

				for (String row : rows) {
					if (numOfRows != 0 && numOfRows != (totalRows - 1)) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							if (attributes == 0) {
								// value
								values[num] = Long.parseLong(column);
							} else if (attributes == 1) {
								// weight
								weights[0][num] = Long.parseLong(column);
							}
							attributes++;
							log.info("Attribute: {}", column);
						}
						num++;
					}
					if (numOfRows == totalRows - 1) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							if (attributes == 0) {
							} else if (attributes == 1) {
								capacities[0] = Long.parseLong(column);
								response.setCapacities(capacities);
							}
							attributes++;
							log.info("Attribute: {}", column);
						}
					}
					numOfRows++;
				}

				response.setValues(values);
				response.setWeights(weights);

			} catch (IOException e) {
				log.error("Error during reading {} please fix and re upload the file", e.getMessage());
				e.printStackTrace();
			}
		}
		return response;

	}

	public MultipleKnapsackModel readMultipleKnapsacksData(MultipartFile file) {
		MultipleKnapsackModel response = new MultipleKnapsackModel();

		int numOfRows = 0;
		int totalRows;

		double[] bins;
		double[] values;
		double[] weights;

		if (!file.isEmpty()) {
			// Read the file
			try {
				byte[] bytes = file.getBytes();
				String data = new String(bytes);
				String[] rows = data.split("\n");
				log.info("Number of rows: {}", rows.length);
				totalRows = rows.length;
				values = new double[totalRows - 2];
				weights = new double[totalRows - 2];

				response.setNumItems(totalRows - 2);

				int num = 0;

				for (String row : rows) {
					if (numOfRows != 0 && numOfRows != (totalRows - 1)) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							if (attributes == 0) {
								// value
								values[num] = Double.parseDouble(column);
							} else if (attributes == 1) {
								// weight
								weights[num] = Double.parseDouble(column);
							}
							attributes++;
							log.info("Attribute: {}", column);
						}
						num++;
					}
					if (numOfRows == totalRows - 1) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							if (attributes == 0) {
							} else if (attributes == 1) {
								System.out.println(column);
								column = column.substring(1, column.length() - 1);
								System.out.println(column);
								String[] bins1 = column.split(",");
								response.setNumBins(bins1.length);
								bins = new double[bins1.length];
								for (int k = 0; k < bins1.length; k++) {
									System.out.println(bins1[k]);
									bins[k] = Double.parseDouble(bins1[k]);
								}
								response.setBinCapacities(bins);
							}
							attributes++;
							log.info("Attribute: {}", column);
						}
					}
					numOfRows++;
				}

				response.setValues(values);
				response.setWeights(weights);

			} catch (IOException e) {
				log.error("Error during reading {} please fix and re upload the file", e.getMessage());
				e.printStackTrace();
			}
		}

		return response;
	}

	public ArrayList<String> readTspData(MultipartFile file) {
		ArrayList<String> response = new ArrayList<>();

		int numOfRows = 0;

		if (!file.isEmpty()) {
			// Read the file
			try {
				byte[] bytes = file.getBytes();
				String data = new String(bytes);
				String[] rows = data.split("\n");
				log.info("Number of rows: {}", rows.length);

				for (String row : rows) {
					if (numOfRows != 0) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							response.add(column);
						}
					}
					numOfRows++;
				}

			} catch (IOException e) {
				log.error("Error during reading {} please fix and re upload the file", e.getMessage());
				e.printStackTrace();
			}
		}
		return response;
	}

	public VehicleRoutingResult readVehicleRouting(MultipartFile file) {
		VehicleRoutingResult result = new VehicleRoutingResult();
		List<String> cities = new ArrayList<>();
		int vehicles = -1;
		long maxArcDistance = -1;
		int startIndex = -1;

		int numOfRows = 0;
		int totalRows;

		if (!file.isEmpty()) {
			// Read the file
			try {
				byte[] bytes = file.getBytes();
				String data = new String(bytes);
				String[] rows = data.split("\n");
				totalRows = rows.length;

				int num = 0;

				for (String row : rows) {
					if (numOfRows != 0 && numOfRows != (totalRows - 1)) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							if (!column.equals(""))
								cities.add(column);
						}
						num++;
					}
					if (numOfRows == totalRows - 1) {
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
							if (column.charAt(0) == '"') {
								column = column.substring(1, column.length() - 1);
							}
							if (attributes == 0) {
							} else if (attributes == 1) {
								System.out.println(column);
								column = column.substring(1, column.length() - 1);
								System.out.println(column);
								String[] items = column.split(",");
								for (int k = 0; k < items.length; k++) {
									if (k == 0) {
										vehicles = Integer.parseInt(items[k]);
									} else if (k == 1) {
										maxArcDistance = Long.parseLong(items[k]);
									} else if (k == 2) {
										startIndex = Integer.parseInt(items[k]);
									}
								}
							}
							attributes++;
							log.info("Attribute: {}", column);
						}
					}
					numOfRows++;
				}
			} catch (IOException e) {
				log.error("Error during reading {} please fix and re upload the file", e.getMessage());
				e.printStackTrace();
			}
		}

		result.setDestinations(cities);
		result.setMaxArcDistance(maxArcDistance);
		result.setNumOfVehicles(vehicles);
		result.setStartIndex(startIndex);
		return result;
	}

	public LinearOptModel readLinearOptData(MultipartFile file) {
		int numOfRows = 0;

		int numOfConstrains = 0;

		LinearOptModel model = new LinearOptModel();
		LinearObjective objective = new LinearObjective();
		List<LinearConstrain> constrains = new ArrayList<>();
		if (!file.isEmpty()) {
			// Read the file
			try {
				byte[] bytes = file.getBytes();
				String data = new String(bytes);
				String[] rows = data.split("\n");
				log.info("Number of rows: {}", rows.length);

				for (String row : rows) {
					if (numOfRows != 0) {
						if (numOfRows == 1) {
							objective = new LinearObjective();
							log.info("New Row: ");
							String[] columns = row.split(";");
							int attributes = 0;
							for (String column : columns) {
								if (column.charAt(0) == '"') {
									column = column.substring(1, column.length() - 1);
								}
								if (attributes == 1) {
									// objective x
									System.out.println("Objective x: " + column);
									objective.setX(Double.parseDouble(column));
								} else if (attributes == 2) {
									// objective y
									System.out.println("Objective y: " + column);
									objective.setY(Double.parseDouble(column));
								}
								attributes++;
							}
						} else {
							LinearConstrain constrain = new LinearConstrain();
							String[] columns = row.split(";");
							int attributes = 0;
							for (String column : columns) {
								if (column.charAt(0) == '"') {
									column = column.substring(1, column.length() - 1);
								}
								if (attributes == 1) {
									// constrain x
									System.out.println("Constrain x: " + column);
									constrain.setX(Double.parseDouble(column));
								} else if (attributes == 2) {
									// constrain y
									System.out.println("Constrain y: " + column);
									constrain.setY(Double.parseDouble(column));
								} else if (attributes == 3) {
									// constrain operator
									System.out.println("Constrain operator: " + column);
									constrain.setOperator(column);
								} else if (attributes == 4) {
									// constrain constant
									System.out.println("Constrain constant: " + column);
									constrain.setConstant(Double.parseDouble(column));
								}
								attributes++;
							}
							constrains.add(constrain);
							numOfConstrains++;
						}
					}

					numOfRows++;
				}

			} catch (IOException e) {
				log.error("Error during reading {} please fix and re upload the file", e.getMessage());
				e.printStackTrace();
			}
		}
		model.setConstrains(constrains);
		model.setObjective(objective);
		return model;
	}

}
