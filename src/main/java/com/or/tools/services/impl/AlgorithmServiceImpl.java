package com.or.tools.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.repositories.AlgorithmDAO;
import com.or.tools.response.AlgorithmResponse;
import com.or.tools.services.AlgorithmService;

@Service
public class AlgorithmServiceImpl implements AlgorithmService {

	@Autowired
	private AlgorithmDAO algorithmDAO;

	@Override
	@Transactional
	public List<AlgorithmResponse> findAll() {
		List<AlgorithmDTO> algorithms = algorithmDAO.findAll();
		List<AlgorithmResponse> responses = new ArrayList<>();
		if (algorithms.isEmpty())
			return responses;

		for (int i = 0; i < algorithms.size(); i++) {
			AlgorithmResponse response = new AlgorithmResponse();
			response.setId(algorithms.get(i).getId());
			response.setName(algorithms.get(i).getName());
			response.setCategory(algorithms.get(i).getCategory());
			response.setDescription(algorithms.get(i).getDescription());
			response.setLibrary(algorithms.get(i).getLibrary().getName());
			response.setLink(algorithms.get(i).getInfoLink());
			responses.add(response);
		}

		return responses;
	}

	public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {

		Map<Object, Boolean> seen = new ConcurrentHashMap<>();
		return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
	}

	@Override
	public List<String> findAllCategories() {
		return algorithmDAO.findAll().stream().filter(distinctByKey(x -> x.getCategory())).map(p -> p.getCategory())
				.collect(Collectors.toList());
	}

	@Override
	public Page<AlgorithmDTO> findAll(Pageable page) {
		return algorithmDAO.findAll(page);
	}

}
