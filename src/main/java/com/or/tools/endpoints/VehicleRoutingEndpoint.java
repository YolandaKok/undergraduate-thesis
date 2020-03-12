package com.or.tools.endpoints;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.or.tools.algorithms.VehicleRoutingService;
import com.or.tools.model.Coords;
import com.or.tools.model.Marker;
import com.or.tools.model.PathModel;
import com.or.tools.response.VehicleFinalResponse;
import com.or.tools.response.VehicleRoutingResult;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping(value = "/routing")
public class VehicleRoutingEndpoint {
	@Autowired
	private GeoApiContext geoApiContext;

	@Autowired
	private IOUtils ioUtils;

	@Autowired
	private VehicleRoutingService service;

	// Destination points in map
	@PostMapping("/points")
	public List<Coords> findCoordinates(@RequestParam("file") MultipartFile file) {
		// Read data for city
		ArrayList<String> cities = ioUtils.readTspData(file);

		List<CompletableFuture<Coords>> coordsFuture = new ArrayList<>();

		for (String city : cities) {
			coordsFuture.add(service.getCoords(city));
		}
		List<Coords> coords;

		coords = coordsFuture.stream().map(x -> {
			try {
				return x.get();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}).collect(Collectors.toList());
		return coords;
	}

	private List<Coords> findCoordsMarkers(List<String> markers) {
		List<Marker> response = new ArrayList<>();
		List<CompletableFuture<Coords>> coordsFuture = new ArrayList<>();

		for (String location : markers) {
			coordsFuture.add(service.getCoords(location));
		}
		List<Coords> coords;

		coords = coordsFuture.stream().map(x -> {
			try {
				return x.get();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}).collect(Collectors.toList());

		return coords;
	}

	@PostMapping("/solve")
	public VehicleFinalResponse solve(@RequestParam("file") MultipartFile file) {
		VehicleRoutingResult result = ioUtils.readVehicleRouting(file);
		List<PathModel> paths = service.findRoutes(result.getDestinations(), result.getNumOfVehicles(),
				result.getStartIndex(), result.getMaxArcDistance());
		List<List<LatLng>> finalPaths = new ArrayList<>();
		for (PathModel item : paths) {
			List<LatLng> path = new ArrayList<>();
			path = service.findStepsBetween(item.getOrigin(), item.getWaypoints());
			finalPaths.add(path);
		}
		VehicleFinalResponse response = new VehicleFinalResponse();
		response.setRoutes(finalPaths);
		response.setCenter(finalPaths.get(0).get(0));
		for (int i = 0; i < response.getRoutes().size(); i++) {
			response.setMarkers(findCoordsMarkers(result.getDestinations()));
		}
		return response;
	}

	@PostMapping("/test")
	public List<Coords> find(@RequestParam("file") MultipartFile file) {
		ArrayList<String> cities = ioUtils.readTspData(file);
		ArrayList<Coords> routes = new ArrayList<>();

		for (String city : cities) {
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
			routes.add(point);
		}
		return routes;
	}

	@GetMapping("/polyline")
	public List<LatLng> solvePolyline(@RequestParam("origin") String origin,
			@RequestParam("destination") String destination) {
		System.out.println(origin + " " + destination);
		List<String> array = new ArrayList<>();
		array.add("Galatsiou 130, Galatsi");
		array.add("Patission 200, Athens");
		return service.findStepsBetween(origin, array);
	}

}
