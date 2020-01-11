package com.or.tools.endpoints;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.requests.SignUpRequest;
import com.or.tools.requests.UserRequest;
import com.or.tools.services.UserService;

@RestController
@RequestMapping("/users")
public class UserEndpoint {

	private static final Logger logger = LoggerFactory.getLogger(UserEndpoint.class);

	@Autowired
	private UserService service;

	@PostMapping("/signup")
	public boolean insertUser(@RequestBody SignUpRequest request) {
		logger.info("Tried to login.");
		return service.createUser(request.getUsername(), request.getPassword(), request.getFirstname(),
				request.getLastname(), request.getEmail());
	}

	@PostMapping(value = "/login")
	public void signIn(@RequestBody UserRequest request) {

	}

}
