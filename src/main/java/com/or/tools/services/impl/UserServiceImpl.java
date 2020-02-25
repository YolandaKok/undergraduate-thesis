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
	private UserDAO dao;

	@Autowired
	private PasswordEncoder passwordEncoder;

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

	@Override
	public void updateUser(Long id, String firstname, String lastname, String email, String company, String role,
			String summary) {
		UserDTO userToUpdate = dao.getOne(id);
		userToUpdate.setFirstname(firstname);
		userToUpdate.setLastname(lastname);
		userToUpdate.setEmail(email);
		userToUpdate.setCompany(company);
		userToUpdate.setProfession(role);
		userToUpdate.setSummary(summary);
		dao.save(userToUpdate);
	}

	@Override
	public boolean updatePassword(Long id, String oldPassword, String newPassword) {
		UserDTO userToUpdate = dao.findById(id).get();
		if (userToUpdate == null)
			return false;
		if (passwordEncoder.matches(oldPassword, userToUpdate.getPassword())) {
			userToUpdate.setPassword(passwordEncoder.encode(newPassword));
			dao.save(userToUpdate);
			return true;
		}
		return false;
	}
}
