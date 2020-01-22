package com.or.tools.endpoints;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.response.AlgorithmResponse;
import com.or.tools.services.AlgorithmService;

@RestController
@RequestMapping("/algorithms")
public class AlgorithmEndpoint {

	@Autowired
	private AlgorithmService algorithmService;

	@GetMapping("/findAll")
	public List<AlgorithmResponse> getAllAlgorithms() {
		List<AlgorithmResponse> responses = algorithmService.findAll();
		return responses;
	}

	@GetMapping("/filter/both")
	public List<AlgorithmResponse> findWithCriteria(@RequestParam("category") String category,
			@RequestParam("library") String library) {
		if (category.isBlank())
			return filterByLibrary(library);
		if (library.isBlank())
			return filterByCategory(category);
		List<AlgorithmResponse> responses = algorithmService.findAll();
		if (responses.isEmpty())
			return responses;
		responses = responses.stream().filter(l -> l.getLibrary().contentEquals(library))
				.filter(z -> z.getCategory().contentEquals(category)).collect(Collectors.toList());
		return responses;
	}

	@GetMapping("/filter/library")
	public List<AlgorithmResponse> filterByLibrary(@RequestParam("library") String library) {
		List<AlgorithmResponse> responses = algorithmService.findAll();
		if (responses.isEmpty())
			return responses;

		if (library.isBlank())
			return responses;
		return responses.parallelStream().filter(x -> x.getLibrary().contentEquals(library))
				.collect(Collectors.toList());
	}

	@GetMapping("/filter/category")
	public List<AlgorithmResponse> filterByCategory(@RequestParam("category") String category) {
		List<AlgorithmResponse> responses = algorithmService.findAll();
		if (responses.isEmpty())
			return responses;
		if (category.isBlank())
			return responses;

		return responses.parallelStream().filter(x -> x.getCategory().contentEquals(category))
				.collect(Collectors.toList());
	}

}
