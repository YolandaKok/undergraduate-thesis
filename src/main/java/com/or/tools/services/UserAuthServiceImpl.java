package com.or.tools.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.or.tools.entities.UserDTO;
import com.or.tools.repositories.UserDAO;

@Service("userAuth")
public class UserAuthServiceImpl {

	@Autowired
	private UserDAO userDAO;

	@Transactional
	public Boolean checkUser(String username, Long id) {
		UserDTO user = userDAO.findByUsername(username);
		if (user == null)
			return false;
		System.out.println();
		return user.getId().equals(id) ? true : false;
	}
}
