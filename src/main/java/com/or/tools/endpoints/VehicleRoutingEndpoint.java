package com.or.tools.endpoints;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import com.or.tools.model.Coords;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping(value = "/routing")
public class VehicleRoutingEndpoint {

	@Autowired
	private GeoApiContext geoApiContext;

	@Autowired
	private IOUtils ioUtils;
	
	@PostMapping("/points")
	public List<Coords> findCoordinates(@RequestParam("file")  MultipartFile file) {
		// Read data for city
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
			System.out.println(gson.toJson(results[0].geometry.location.lat) + " "
					+ gson.toJson(results[0].geometry.location.lng));
			point.setLat(Double.parseDouble(gson.toJson(results[0].geometry.location.lat)));
			point.setLng(Double.parseDouble(gson.toJson(results[0].geometry.location.lng)));
			routes.add(point);
		}
		return routes;
	}
}
