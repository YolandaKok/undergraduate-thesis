package com.or.tools.util;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry.addMapping("/**").allowedOrigins("http://localhost:9090")
				.allowedMethods("PUT", "DELETE", "GET", "POST").allowCredentials(true).maxAge(3600);
	}
}