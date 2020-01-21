package com.or.tools.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.or.tools.entities.LibraryDTO;

@Repository
public interface LibraryDAO extends JpaRepository<LibraryDTO, Long> {

}
