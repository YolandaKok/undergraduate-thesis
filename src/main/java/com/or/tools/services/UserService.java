package com.or.tools.services;

import com.or.tools.entities.UserDTO;

public interface UserService {

	boolean createUser(String username, String password, String firstname, String lastname, String email);

	boolean findUser(String username);

	UserDTO findUserByUsername(String username);

	void updateUser(Long id, String firstname, String lastname, String email, String company, String role,
			String summary);
}
