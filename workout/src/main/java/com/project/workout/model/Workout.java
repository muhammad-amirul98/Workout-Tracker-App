package com.project.workout.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Workout {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long workoutId;
	
	private String name;
	
	private String type;
	
//	@JsonIgnore
	@OneToMany(cascade=CascadeType.ALL, mappedBy="workout")
	private List<Exercise> exercises;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="appuser_id")
	@JsonIgnore
	private AppUser user;
	
	
//	@ManyToMany(cascade=CascadeType.PERSIST)
//	@JoinTable(name="exercise_workout", 
//			joinColumns = {@JoinColumn(name="workoutid")}, 
//			inverseJoinColumns = {@JoinColumn(name="id")}
//	)
//	private Set<Exercise> exercises = new HashSet<Exercise>();
	


	public Workout() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Workout(String name, String type) {
		super();
		this.name = name;
		this.type = type;
	}
	
	

	public Workout(String name, String type, AppUser user) {
		super();
		this.name = name;
		this.type = type;
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getWorkoutId() {
		return workoutId;
	}

	public List<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(List<Exercise> exercises) {
		this.exercises = exercises;
	}

	public AppUser getUser() {
		return user;
	}

	public void setUser(AppUser user) {
		this.user = user;
	}
	
	
	
	
	
	

}
