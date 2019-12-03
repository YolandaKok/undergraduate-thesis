package com.or.tools.endpoints;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
public class TestEndpoint {

	@GetMapping(value = "/hello")
	public String sayHello() {
		return "Hello World";
	}

}
