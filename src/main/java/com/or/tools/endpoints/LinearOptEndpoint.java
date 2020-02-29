package com.or.tools.endpoints;

import java.util.List;

import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.or.tools.algorithms.LinearOptService;
import com.or.tools.model.LinearOptModel;
import com.or.tools.util.IOUtils;

@RestController
@RequestMapping("/linear")
public class LinearOptEndpoint {

	@Autowired
	private LinearOptService service;

	@Autowired
	private IOUtils ioUtils;

	@PostMapping("/result")
	private Pair<List<List<Double>>, Double> result(@RequestBody LinearOptModel model) {
		return service.result(model);
	}

	@PostMapping("/data")
	public Pair<List<List<Double>>, LinearOptModel> reorganiseData(MultipartFile file) {
		LinearOptModel model = ioUtils.readLinearOptData(file);
		List<List<Double>> response = service.solveCramer(model);
		Pair<List<List<Double>>, LinearOptModel> res = new Pair<List<List<Double>>, LinearOptModel>(response, model);
		return res;
	}

}
