package com.or.tools.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.DataSampleDTO;

@Repository
public interface DataSampleDAO extends JpaRepository<DataSampleDTO, Long> {
	@Query("SELECT d FROM DataSampleDTO d where d.algorithm.id = :algorithmId")
	List<DataSampleDTO> findByAlgorithmId(Long algorithmId);
}
