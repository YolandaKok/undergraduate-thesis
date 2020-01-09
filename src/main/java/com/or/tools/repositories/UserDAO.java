package com.or.tools.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.UserDTO;

@Repository
public interface UserDAO extends JpaRepository<UserDTO, Long> {
	UserDTO findByUsername(String username);
}
