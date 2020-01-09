package com.or.tools.endpoints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.requests.SignUpRequest;
import com.or.tools.services.UserService;

@RestController
@RequestMapping("/users")
public class UserEndpoint {

	@Autowired
	private UserService service;

	@PostMapping("/signup")
	public boolean insertUser(@RequestBody SignUpRequest request) {
		return service.createUser(request.getUsername(), request.getPassword(), request.getFirstname(),
				request.getLastname(), request.getEmail());
	}

}
