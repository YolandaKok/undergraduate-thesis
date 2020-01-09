package com.or.tools.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {

}
