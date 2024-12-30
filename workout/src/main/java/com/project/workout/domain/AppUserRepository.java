package com.project.workout.domain;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

//@RepositoryRestResource(exported=false)
@RepositoryRestResource
public interface AppUserRepository extends CrudRepository<AppUser, Long>{
	Optional<AppUser> findByUsername(String username);
	
	boolean existsByUsername(String username);
	
	boolean existsByEmail(String email);
	
	
}
