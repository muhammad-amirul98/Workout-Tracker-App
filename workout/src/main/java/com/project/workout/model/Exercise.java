package com.project.workout.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Exercise {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String bodyPart;
	
	private int sets;
	
	private int reps;
	
	private double weight;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="workout_id")
	@JsonIgnore
	private Workout workout;
	
//	@ManyToMany(mappedBy="exercises")
//	private Set<Workout> workouts = new HashSet<Workout>();
	
	public Exercise() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Exercise(String name, String bodyPart, int sets, int reps, double weight) {
		super();
		this.name = name;
		this.bodyPart = bodyPart;
		this.sets = sets;
		this.reps = reps;
		this.weight = weight;
	}
	

	public Exercise(String name, String bodyPart, int sets, int reps, double weight, Workout workout) {
		super();
		this.name = name;
		this.bodyPart = bodyPart;
		this.sets = sets;
		this.reps = reps;
		this.weight = weight;
		this.workout = workout;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBodyPart() {
		return bodyPart;
	}

	public void setBodyPart(String bodyPart) {
		this.bodyPart = bodyPart;
	}

	public int getSets() {
		return sets;
	}

	public void setSets(int sets) {
		this.sets = sets;
	}

	public int getReps() {
		return reps;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public Long getId() {
		return id;
	}

	public Workout getWorkout() {
		return workout;
	}

	public void setWorkout(Workout workout) {
		this.workout = workout;
	}
}
