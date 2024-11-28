package com.project.workout.domain;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Workout {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long workoutId;
	
	private String name;
	
	private String type;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="workout")
	private List<Exercise> exercise;
	
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
	
	

}
