package com.or.tools.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.entities.UserDTO;
import com.or.tools.repositories.UserDAO;
import com.or.tools.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserDAO dao;

	@Override
	@Transactional
	public boolean createUser(String username, String password, String firstname, String lastname, String email) {
		UserDTO user = new UserDTO();
		user.setUsername(username);
		user.setPassword(passwordEncoder.encode(password));
		user.setFirstname(firstname);
		user.setLastname(lastname);
		user.setEmail(email);
		return dao.save(user) != null ? true : false;
	}

	@Override
	public boolean findUser(String username) {
		return dao.findByUsername(username) != null ? true : false;
	}

	@Override
	public UserDTO findUserByUsername(String username) {
		return dao.findByUsername(username);
	}

}
