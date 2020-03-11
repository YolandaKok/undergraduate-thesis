package com.or.tools.algorithms;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.ortools.constraintsolver.Assignment;
import com.google.ortools.constraintsolver.FirstSolutionStrategy;
import com.google.ortools.constraintsolver.RoutingIndexManager;
import com.google.ortools.constraintsolver.RoutingModel;
import com.google.ortools.constraintsolver.RoutingSearchParameters;
import com.google.ortools.constraintsolver.main;
import com.or.tools.model.DistanceMatrixModel;
import com.or.tools.model.Row;
import com.or.tools.requests.DistanceRequest;
import com.or.tools.response.RoutesResponse;

@Service
public class TSPService {

	@Autowired
	private RestTemplate rest;

	private String API_key = "AIzaSyBT4mw-5ZlaiE8j_6GdNgHTgZi7PJrNa5s";
	private static String request = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";

	public RoutesResponse solve(DistanceRequest request) {
		// Instantiate the data problem.

		// Create Routing Index Manager
		RoutingIndexManager manager = new RoutingIndexManager(request.getDistances().length, 1, 0);

		// Create Routing Model.
		RoutingModel routing = new RoutingModel(manager);

		// Create and register a transit callback.
		final int transitCallbackIndex = routing.registerTransitCallback((long fromIndex, long toIndex) -> {
			// Convert from routing variable Index to user NodeIndex.
			int fromNode = manager.indexToNode(fromIndex);
			int toNode = manager.indexToNode(toIndex);
			long[][] distanceMatrix = request.getDistances();
			return distanceMatrix[fromNode][toNode];
		});

		// Define cost of each arc.
		routing.setArcCostEvaluatorOfAllVehicles(transitCallbackIndex);

		// Setting first solution heuristic.
		RoutingSearchParameters searchParameters = main.defaultRoutingSearchParameters().toBuilder()
				.setFirstSolutionStrategy(FirstSolutionStrategy.Value.PATH_CHEAPEST_ARC).build();

		// Solve the problem.
		Assignment solution = routing.solveWithParameters(searchParameters);

		// Solution cost.
		System.out.println("Objective: " + solution.objectiveValue() + "miles");
		// Inspect solution.
		System.out.println("Route:");
		long routeDistance = 0;
		String route = "";
		long index = routing.start(0);
		ArrayList<Integer> routes = new ArrayList<>();
		while (!routing.isEnd(index)) {
			route += manager.indexToNode(index) + " -> ";
			routes.add(manager.indexToNode(index));
			long previousIndex = index;
			index = solution.value(routing.nextVar(index));
			routeDistance += routing.getArcCostForVehicle(previousIndex, index, 0);
		}
		route += manager.indexToNode(routing.end(0));
		System.out.println(route);
		System.out.println("Route distance: " + routeDistance + "miles");
		routes.forEach(r -> System.out.println("Route " + r));

		RoutesResponse response = new RoutesResponse();
		response.setRoutes(routes);
		response.setTotalDistance(routeDistance);
		return response;
	}

	public long[][] calculateDistanceMatrix(ArrayList<String> cities) {
		int max_elements = 100;
		int num_addresses = cities.size();

		int max_rows = max_elements / num_addresses;

		int q = num_addresses / max_rows;
		int r = num_addresses % max_rows;

		System.out.println("max_row: " + max_rows + "q: " + q + "r: " + r);

		DistanceMatrixModel response;

		ArrayList<String> dest_addresses = new ArrayList<>();

		dest_addresses = cities;

		long[][] distanceMatrix = new long[cities.size()][cities.size()];
		int x = 0;
		int y = 0;

		for (int i = 0; i < q; i++) {
			ArrayList<String> origin_addresses = new ArrayList<>();
			ArrayList<ArrayList<Integer>> array = new ArrayList<>();
			for (int k = i * max_rows; k < (i + 1) * max_rows; k++) {
				origin_addresses.add(cities.get(k));
			}
			response = send_request(origin_addresses, dest_addresses);
			array = build_distance_matrix(response, cities.size());
			for (int j = 0; j < array.size(); j++) {
				for (int w = 0; w < array.get(0).size(); w++) {
					distanceMatrix[x][y] = array.get(j).get(w);
					y++;
				}
				y = 0;
				x++;
			}
		}

		if (r > 0) {
			ArrayList<String> origin_addresses = new ArrayList<>();
			ArrayList<ArrayList<Integer>> array = new ArrayList<>();
			for (int i = q * max_rows; i < q * max_rows + r; i++) {
				origin_addresses.add(cities.get(i));
			}
			response = send_request(origin_addresses, dest_addresses);
			array = build_distance_matrix(response, cities.size());
			for (int j = 0; j < array.size(); j++) {
				for (int w = 0; w < array.get(0).size(); w++) {
					distanceMatrix[x][y] = array.get(j).get(w);
					y++;
				}
				y = 0;
				x++;
			}
		}
		return distanceMatrix;
	}

	private DistanceMatrixModel send_request(ArrayList<String> origin_addresses, ArrayList<String> dest_addresses) {
		StringBuilder builder = new StringBuilder();
		String origin_address_str = build_address_str(origin_addresses);
		String dest_address_str = build_address_str(dest_addresses);

		builder.append(request);
		builder.append("&origins=");
		builder.append(origin_address_str);
		builder.append("&destinations=");
		builder.append(dest_address_str);
		builder.append("&key=");
		builder.append(API_key);

		ResponseEntity<DistanceMatrixModel> responseEntity = rest.getForEntity(builder.toString(),
				DistanceMatrixModel.class);

		DistanceMatrixModel object = responseEntity.getBody();
		return object;
	}

	private ArrayList<ArrayList<Integer>> build_distance_matrix(DistanceMatrixModel response, int length) {
		ArrayList<ArrayList<Integer>> distanceMatrix = new ArrayList<>();
		// long[][] distances = new long[length][length];
		ArrayList<Row> rows = response.getRows();
		for (int i = 0; i < rows.size(); i++) {
			ArrayList<Integer> row = new ArrayList<Integer>();
			for (int j = 0; j < rows.get(i).getElements().size(); j++) {
				System.out.println(rows.get(i).getElements().get(j).getDistance().getValue());
				System.out.println(rows.get(i).getElements().get(j).getDistance().getValue() / 1000);
				row.add(rows.get(i).getElements().get(j).getDistance().getValue());
			}
			distanceMatrix.add(row);
		}
		return distanceMatrix;
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
