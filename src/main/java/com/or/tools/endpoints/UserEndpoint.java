package com.or.tools.endpoints;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.or.tools.entities.UserDTO;
import com.or.tools.requests.PasswordRequest;
import com.or.tools.requests.SignUpRequest;
import com.or.tools.requests.UserRequest;
import com.or.tools.response.AcceptResponse;
import com.or.tools.response.SingleItemResponse;
import com.or.tools.response.UserResponse;
import com.or.tools.services.UserService;

@RestController
@RequestMapping("/users")
public class UserEndpoint {

	private static final Logger logger = LoggerFactory.getLogger(UserEndpoint.class);

	@Autowired
	private UserService service;

	@PostMapping("/signup")
	public AcceptResponse insertUser(@RequestBody SignUpRequest request) {
		logger.info("Tried to login.");

		AcceptResponse response = new AcceptResponse();
		Boolean result = service.createUser(request.getUsername(), request.getPassword(), request.getFirstname(),
				request.getLastname(), request.getEmail());
		response.setResult(result);

		return response;
	}

	@GetMapping("/exists/{username}")
	public AcceptResponse userExists(@PathVariable String username) {
		logger.debug("Find User Endpoint.");

		AcceptResponse response = new AcceptResponse();
		response.setResult(service.findUser(username));

		logger.debug("User with username: {}, {}", username, response);
		return response;
	}

	@PutMapping("/{id}")
	@PreAuthorize("@userAuth.checkUser(authentication.name,#id)")
	public void userUpdate(@PathVariable Long id, @RequestBody UserResponse request) {
		service.updateUser(id, request.getFirstname(), request.getLastname(), request.getEmail(), request.getCompany(),
				request.getProfession(), request.getSummary());
	}

	@PutMapping("/change/password/{id}")
	@PreAuthorize("@userAuth.checkUser(authentication.name,#id)")
	public SingleItemResponse<Boolean> updatePassword(@PathVariable Long id, @RequestBody PasswordRequest request) {
		SingleItemResponse<Boolean> response = new SingleItemResponse<>();
		response.setItem(service.updatePassword(id, request.getOldPassword(), request.getNewPassword()));
		return response;
	}

	@GetMapping("/{username}")
	public UserResponse findUserByUsername(@PathVariable String username) {
		UserDTO userDTO = service.findUserByUsername(username);
		UserResponse response = new UserResponse();
		response.setFirstname(userDTO.getFirstname());
		response.setLastname(userDTO.getLastname());
		response.setEmail(userDTO.getEmail());
		response.setCompany(userDTO.getCompany());
		response.setProfession(userDTO.getProfession());
		response.setSummary(userDTO.getSummary());
		response.setId(userDTO.getId());
		return response;
	}

	@PostMapping(value = "/login")
	public void signIn(@RequestBody UserRequest request) {

	}

}
