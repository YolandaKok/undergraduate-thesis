package com.or.tools.endpoints;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.maps.model.LatLng;
import com.or.tools.algorithms.VehicleRoutingService;
import com.or.tools.model.Coords;
import com.or.tools.model.PathModel;
import com.or.tools.response.VehicleFinalResponse;
import com.or.tools.response.VehicleRoutingResult;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping(value = "/routing")
public class VehicleRoutingEndpoint {
	@Autowired
	private IOUtils ioUtils;

	@Autowired
	private VehicleRoutingService service;

	@Async
	private List<Coords> findCoordsMarkers(List<String> markers) {
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

	@PostMapping("/data")
	public VehicleRoutingResult getInitialData(@RequestParam("file") MultipartFile file) {
		VehicleRoutingResult result = ioUtils.readVehicleRouting(file);
		return result;
	}

	@PostMapping("/solve")
	public VehicleFinalResponse solve(@RequestParam("file") MultipartFile file) {
		VehicleRoutingResult result = ioUtils.readVehicleRouting(file);
		List<PathModel> paths = service.findRoutes(result.getDestinations(), result.getNumOfVehicles(),
				result.getStartIndex(), result.getMaxArcDistance());

		List<CompletableFuture<List<LatLng>>> finalPathsFuture = new ArrayList<>();
		List<List<LatLng>> finalPaths = new ArrayList<>();

		for (PathModel item : paths) {
			CompletableFuture<List<LatLng>> path;
			path = service.findStepsBetween(item.getOrigin(), item.getWaypoints(), item.getRoutes(),
					item.getRouteDistance());
			finalPathsFuture.add(path);
		}
		VehicleFinalResponse response = new VehicleFinalResponse();
		finalPaths = finalPathsFuture.stream().map(x -> {
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
		response.setRoutes(finalPaths);
		response.setCenter(finalPaths.get(0).get(0));
		response.setMarkers(findCoordsMarkers(result.getDestinations()));
		response.setPaths(paths);
		return response;
	}

}
