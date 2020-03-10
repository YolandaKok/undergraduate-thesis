package com.or.tools.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

import com.google.maps.GeoApiContext;

@Configuration
@ComponentScan(basePackages = "com.or.tools")
@SpringBootApplication
@EntityScan("com.or.tools.entities")
@EnableJpaRepositories(basePackages = "com.or.tools.repositories")
@EnableTransactionManagement
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppApplication {

	public static void main(String[] args) {
		/* Load OR Tools Library */
		System.loadLibrary("jniortools");
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public GeoApiContext createGoogleClient() {
		GeoApiContext context = new GeoApiContext.Builder().apiKey("AIzaSyBT4mw-5ZlaiE8j_6GdNgHTgZi7PJrNa5s").build();
		return context;
	}

}
