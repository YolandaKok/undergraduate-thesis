package com.or.tools.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan(basePackages = "com.or.tools")
@SpringBootApplication
@EntityScan("com.or.tools.entities")
public class AppApplication {

	public static void main(String[] args) {
		/* Load OR Tools Library */
		System.loadLibrary("jniortools");
		SpringApplication.run(AppApplication.class, args);
	}

}
