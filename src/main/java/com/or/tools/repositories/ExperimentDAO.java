package com.or.tools.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.AlgorithmDTO;
import com.or.tools.entities.ExperimentDTO;
import com.or.tools.entities.UserDTO;

@Repository
public interface ExperimentDAO extends JpaRepository<ExperimentDTO, Long> {
	Page<ExperimentDTO> findByUser(UserDTO user, Pageable page);

	Page<ExperimentDTO> findByUserAndAlgorithm(UserDTO user, AlgorithmDTO algorithm, Pageable page);

	@Query("SELECT DISTINCT e.algorithm.name FROM ExperimentDTO e WHERE e.user.username = :username")
	List<String> findAllAlgorithmNames(String username);
}
