package com.or.tools.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.repositories.LibraryDAO;
import com.or.tools.services.LibraryService;

@Service
public class LibraryServiceImpl implements LibraryService {

	@Autowired
	private LibraryDAO dao;

	@Override
	@Transactional
	public List<String> getAllLibraryNames() {
		return dao.findAll().stream().map((x) -> x.getName()).collect(Collectors.toList());
	}
}
