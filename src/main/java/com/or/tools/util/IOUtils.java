package com.or.tools.util;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.or.tools.model.KnapsackModel;

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
				values = new long[totalRows];
				weights = new long[1][totalRows];

				for (String row : rows) {
					if (numOfRows != 0 && numOfRows != (totalRows - 1)) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
							if (attributes == 0) {
								// value
								values[numOfRows] = Long.parseLong(column);
							} else if (attributes == 1) {
								// weight
								weights[0][numOfRows] = Long.parseLong(column);
							}
							attributes++;
							log.info("Attribute: {}", column);
						}
					}
					if (numOfRows == totalRows - 1) {
						log.info("New Row: ");
						String[] columns = row.split(";");
						int attributes = 0;
						for (String column : columns) {
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

}
