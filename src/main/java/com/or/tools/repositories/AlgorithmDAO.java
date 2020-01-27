package com.or.tools.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.AlgorithmDTO;

@Repository
public interface AlgorithmDAO extends JpaRepository<AlgorithmDTO, Long> {
	AlgorithmDTO findByName(String username);
}
