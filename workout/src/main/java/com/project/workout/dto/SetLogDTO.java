package com.project.workout.dto;

public class SetLogDTO {
	private Long exerciseLogId;
    private int setNumber;
    private int reps;
    private double weight;
    
	public SetLogDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SetLogDTO(Long exerciseLogId, int setNumber, int reps, double weight) {
		super();
		this.exerciseLogId = exerciseLogId;
		this.setNumber = setNumber;
		this.reps = reps;
		this.weight = weight;
	}

	public Long getExerciseLogId() {
		return exerciseLogId;
	}

	public void setExerciseLogId(Long exerciseLogId) {
		this.exerciseLogId = exerciseLogId;
	}

	public int getSetNumber() {
		return setNumber;
	}

	public void setSetNumber(int setNumber) {
		this.setNumber = setNumber;
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
    
    


}
