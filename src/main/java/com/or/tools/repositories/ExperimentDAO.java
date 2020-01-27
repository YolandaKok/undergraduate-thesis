package com.or.tools.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.ExperimentDTO;
import com.or.tools.entities.UserDTO;

@Repository
public interface ExperimentDAO extends JpaRepository<ExperimentDTO, Long> {
	List<ExperimentDTO> findByUser(UserDTO user);
}
