package com.or.tools.endpoints;

import java.util.ArrayList;

import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.or.tools.algorithms.TSPService;
import com.or.tools.requests.DistanceRequest;
import com.or.tools.response.RoutesResponse;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping("/tsp")
public class TSPEndpoint {

	@Autowired
	private IOUtils ioUtils;

	@Autowired
	private TSPService service;

	@PostMapping("/data")
	public Pair<long[][], ArrayList<String>> reorganiseData(@RequestParam("file") MultipartFile file) {
		ArrayList<String> cities = ioUtils.readTspData(file);

		Pair<long[][], ArrayList<String>> res = new Pair<long[][], ArrayList<String>>(distanceMatrix(cities), cities);

		return res;
	}

	@GetMapping("/distance/matrix")
	public long[][] distanceMatrix(ArrayList<String> cities) {
		return service.calculateDistanceMatrix(cities, false);
	}

	@PostMapping("/result")
	public RoutesResponse tspResult(@RequestBody DistanceRequest request) {
		return service.solve(request);
	}

}
