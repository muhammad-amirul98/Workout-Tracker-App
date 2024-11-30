package com.project.workout;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
	
	@Bean
	public OpenAPI workoutDatabaseOpenAPI() {
		return new OpenAPI()
				.info(new Info()
				.title("Workout REST API")
				.description("My workout stock")
				.version("1.0"));
	}
	
}
