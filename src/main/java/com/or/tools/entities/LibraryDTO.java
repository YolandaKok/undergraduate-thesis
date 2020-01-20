package com.or.tools.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Library")
public class LibraryDTO {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private Long id;
	@Column(name = "NAME")
	private String name;
	@Column(name = "CATEGORY")
	private String category;
	@OneToMany(mappedBy = "library", orphanRemoval = true)
	private List<AlgorithmDTO> algorithms;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<AlgorithmDTO> getAlgorithms() {
		return algorithms;
	}

	public void setAlgorithms(List<AlgorithmDTO> algorithms) {
		this.algorithms = algorithms;
	}

}
