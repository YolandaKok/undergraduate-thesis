package com.or.tools.algorithms;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.google.maps.DirectionsApi;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.google.ortools.constraintsolver.Assignment;
import com.google.ortools.constraintsolver.FirstSolutionStrategy;
import com.google.ortools.constraintsolver.RoutingDimension;
import com.google.ortools.constraintsolver.RoutingIndexManager;
import com.google.ortools.constraintsolver.RoutingModel;
import com.google.ortools.constraintsolver.RoutingSearchParameters;
import com.google.ortools.constraintsolver.main;
import com.or.tools.model.Coords;

@Service
public class VehicleRoutingService {

	private static final Logger logger = LoggerFactory.getLogger(VehicleRoutingService.class);

	@Autowired
	private GeoApiContext geoApiContext;

	@Autowired
	private TSPService service;

	@Async
	public CompletableFuture<Coords> getCoords(String city) {

		logger.info("Compute coordinates for {}", city);

		GeocodingResult[] results = null;
		try {
			results = GeocodingApi.geocode(geoApiContext, city).await();
		} catch (ApiException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Coords point = new Coords();
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		point.setLat(Double.parseDouble(gson.toJson(results[0].geometry.location.lat)));
		point.setLng(Double.parseDouble(gson.toJson(results[0].geometry.location.lng)));
		return CompletableFuture.completedFuture(point);
	}

	public List<LatLng> findStepsBetween(String origin, String destination) {
		DirectionsResult results = null;
		try {
			results = DirectionsApi.getDirections(geoApiContext, origin, destination).await();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		DirectionsRoute[] routes = results.routes;
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		System.out.println("Polyline " + gson.toJson(routes[0].overviewPolyline.decodePath()));
		List<LatLng> result = gson.fromJson(gson.toJson(routes[0].overviewPolyline.decodePath()),
				new TypeToken<List<LatLng>>() {
				}.getType());
		return result;
	}

	public void findRoutes(List<String> cities) {
		long[][] distanceMatrix = service.calculateDistanceMatrix((ArrayList<String>) cities);
		// Create Routing Index Manager
		// data.vehicleNumber
		// 0
		RoutingIndexManager manager = new RoutingIndexManager(distanceMatrix.length, 4, 0);

		// Create Routing Model.
		RoutingModel routing = new RoutingModel(manager);

		// Create and register a transit callback.
		final int transitCallbackIndex = routing.registerTransitCallback((long fromIndex, long toIndex) -> {
			// Convert from routing variable Index to user NodeIndex.
			int fromNode = manager.indexToNode(fromIndex);
			int toNode = manager.indexToNode(toIndex);
			return distanceMatrix[fromNode][toNode];
		});

		// Define cost of each arc.
		routing.setArcCostEvaluatorOfAllVehicles(transitCallbackIndex);

		// Add Distance constraint.
		routing.addDimension(transitCallbackIndex, 0, 40000, true, // start cumul to zero
				"Distance");
		RoutingDimension distanceDimension = routing.getMutableDimension("Distance");
		distanceDimension.setGlobalSpanCostCoefficient(100);

		// Setting first solution heuristic.
		RoutingSearchParameters searchParameters = main.defaultRoutingSearchParameters().toBuilder()
				.setFirstSolutionStrategy(FirstSolutionStrategy.Value.PATH_CHEAPEST_ARC).build();

		// Solve the problem.
		Assignment solution = routing.solveWithParameters(searchParameters);

		long maxRouteDistance = 0;
		// 4 -> vehicle number
		for (int i = 0; i < 4; ++i) {
			long index = routing.start(i);
			logger.info("Route for Vehicle " + i + ":");
			long routeDistance = 0;
			String route = "";
			while (!routing.isEnd(index)) {
				route += manager.indexToNode(index) + " -> ";
				long previousIndex = index;
				index = solution.value(routing.nextVar(index));
				routeDistance += routing.getArcCostForVehicle(previousIndex, index, i);
			}
			logger.info(route + manager.indexToNode(index));
			logger.info("Distance of the route: " + routeDistance + "m");
			maxRouteDistance = Math.max(routeDistance, maxRouteDistance);
		}
		logger.info("Maximum of the route distances: " + maxRouteDistance + "m");
	}

}
