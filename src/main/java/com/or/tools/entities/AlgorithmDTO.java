package com.or.tools.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Algorithm")
public class AlgorithmDTO {
	@Id
	@GeneratedValue
	@Column(name = "ID")
	private Long id;
	@Column(name = "NAME")
	private String name;
	@Column(name = "DESCRIPTION")
	private String description;
	@Column(name = "EXAMPLE")
	private String example;
	@Column(name = "DATE_ADDED")
	private Date date;
	@Column(name = "CATEGORY")
	private String category;
	@OneToMany(mappedBy = "algorithm", orphanRemoval = true)
	private List<ExperimentDTO> experiments;
	@ManyToOne(fetch = FetchType.LAZY)
	private LibraryDTO library;

	@OneToMany(mappedBy = "algorithm", orphanRemoval = true)
	private List<DataSampleDTO> dataSamples;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExample() {
		return example;
	}

	public void setExample(String example) {
		this.example = example;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<ExperimentDTO> getExperiments() {
		return experiments;
	}

	public void setExperiments(List<ExperimentDTO> experiments) {
		this.experiments = experiments;
	}

	public LibraryDTO getLibrary() {
		return library;
	}

	public void setLibrary(LibraryDTO library) {
		this.library = library;
	}

	public List<DataSampleDTO> getDataSamples() {
		return dataSamples;
	}

	public void setDataSamples(List<DataSampleDTO> dataSamples) {
		this.dataSamples = dataSamples;
	}

}
