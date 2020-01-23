package com.or.tools.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.response.LibraryNamesResponse;
import com.or.tools.services.LibraryService;

@RestController
@RequestMapping("/library")
public class LibraryEndpoint {

	@Autowired
	private LibraryService service;

	@GetMapping("/findAllNames")
	public LibraryNamesResponse getAllLibraryNames() {
		LibraryNamesResponse response = new LibraryNamesResponse();
		response.setLibraryNames(service.getAllLibraryNames());
		return response;
	}

}
