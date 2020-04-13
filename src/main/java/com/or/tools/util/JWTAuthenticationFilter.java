package com.or.tools.util;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.or.tools.entities.UserDTO;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private static final Logger logger = LoggerFactory.getLogger(UsernamePasswordAuthenticationFilter.class);

	private AuthenticationManager authenticationManager;

	private String jwtSecretPassword;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, String jwtSecretPassword) {
		this.authenticationManager = authenticationManager;
		this.jwtSecretPassword = jwtSecretPassword;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException {
		try {
			UserDTO creds = new ObjectMapper().readValue(req.getInputStream(), UserDTO.class);
			logger.info("CREDENTIALS: {}", creds.getUsername());
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(),
					creds.getPassword(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException, ServletException {
		// UserDAO userDAO = BeanUtil.getBean(UserDAO.class);
		/* Get User Roles */
		// UserDTO user = userDAO.findByUsername(((User)
		// auth.getPrincipal()).getUsername());
		/* Get User Roles */
		String token = JWT.create().withSubject(((User) auth.getPrincipal()).getUsername())
				.sign(Algorithm.HMAC512(jwtSecretPassword.getBytes()));
		res.addHeader("Authorization", "Bearer " + token);
	}

}