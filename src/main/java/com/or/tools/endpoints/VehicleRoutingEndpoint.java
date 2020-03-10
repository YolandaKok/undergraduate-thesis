package com.or.tools.endpoints;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;

@RestController
@RequestMapping(value = "/vehicle")
public class VehicleRoutingEndpoint {

	@Autowired
	private GeoApiContext geoApiContext;

	@GetMapping
	public void test() {
		List<String> cities = new ArrayList<>();
		cities.add("Rome");
		cities.add("Athens");
		cities.add("Barchelona");
		cities.add("Moscow");
		cities.add("Paris");
		cities.add("London");
		cities.add("Amsterdam");
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

			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			System.out.println(gson.toJson(results[0].geometry.location.lat) + " "
					+ gson.toJson(results[0].geometry.location.lng));
		}
	}
}
