package com.or.tools.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.ExperimentDTO;
import com.or.tools.entities.UserDTO;

@Repository
public interface ExperimentDAO extends JpaRepository<ExperimentDTO, Long> {
	Page<ExperimentDTO> findByUser(UserDTO user, Pageable page);
}
