package com.or.tools.endpoints;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.or.tools.model.DistanceMatrixModel;

@RestController
@RequestMapping("/tsp")
public class TSPEndpoint {

	@Autowired
	private RestTemplate rest;

	private String API_key = "AIzaSyBT4mw-5ZlaiE8j_6GdNgHTgZi7PJrNa5s";
	private ArrayList<String> cities;
	private static String request = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";

	@GetMapping("/distance/matrix")
	public void distanceMatrix() {
		cities = new ArrayList<>();
		cities.add("Athens");
		cities.add("Amsterdam");
		cities.add("Berlin");

		int max_elements = 100;
		int num_addresses = cities.size();

		int max_rows = max_elements / num_addresses;

		int q = num_addresses / max_rows;
		int r = num_addresses % max_rows;

		String response;

		ArrayList<Integer> distance_matrix = new ArrayList<>();
		ArrayList<String> origin_addresses = new ArrayList<>();
		ArrayList<String> dest_addresses = new ArrayList<>();

		dest_addresses = cities;

		for (int i = 0; i < q; i++) {
			for (int k = i * max_rows; k < (i + 1) * max_rows; k++) {
				origin_addresses.add(cities.get(k));
				// response = send_request(origin_addresses, dest_addresses);
			}
		}

		if (r > 0) {
			for (int i = q * max_rows; i < q * max_rows + r; i++) {
				origin_addresses.add(cities.get(i));
			}
		}
		build_address_str(origin_addresses);
		send_request(origin_addresses, dest_addresses);
	}

	private void send_request(ArrayList<String> origin_addresses, ArrayList<String> dest_addresses) {
		StringBuilder builder = new StringBuilder();
		String origin_address_str = build_address_str(origin_addresses);
		String dest_address_str = build_address_str(dest_addresses);

		System.out.println(origin_address_str);
		System.out.println(dest_address_str);

		builder.append(request);
		builder.append("&origins=");
		builder.append(origin_address_str);
		builder.append("&destinations=");
		builder.append(dest_address_str);
		builder.append("&key=");
		builder.append(API_key);

		ResponseEntity<DistanceMatrixModel> responseEntity = rest.getForEntity(builder.toString(),
				DistanceMatrixModel.class);

		DistanceMatrixModel objects = responseEntity.getBody();
		System.out.println("Hey: " + objects);
	}

	private String build_address_str(ArrayList<String> addresses) {
		String address_str = "";
		StringBuilder builder = new StringBuilder();
		builder.append(address_str);
		for (int i = 0; i < addresses.size(); i++) {
			builder.append(addresses.get(i));
			builder.append("|");
		}
		builder.deleteCharAt(builder.length() - 1);
		return builder.toString();
	}

}
