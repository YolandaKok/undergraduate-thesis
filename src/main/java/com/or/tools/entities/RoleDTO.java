package com.or.tools.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Role")
public class RoleDTO {
	@Id
	@GeneratedValue
	@Column(name = "ID")
	private Long idRole;
	@Column(name = "ROLE_NAME")
	private String roleName;
	@ManyToOne(fetch = FetchType.LAZY)
	private UserDTO user;

	public Long getIdRole() {
		return idRole;
	}

	public void setIdRole(Long idRole) {
		this.idRole = idRole;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public Long getId() {
		return idRole;
	}

	public void setId(Long idRole) {
		this.idRole = idRole;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
