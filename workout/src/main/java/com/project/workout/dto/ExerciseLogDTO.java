package com.project.workout.dto;

public class ExerciseLogDTO {
	
	private Long workoutLogId;
    private Long exerciseId;
    
	public ExerciseLogDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ExerciseLogDTO(Long workoutLogId, Long exerciseId) {
		super();
		this.workoutLogId = workoutLogId;
		this.exerciseId = exerciseId;
	}

	public Long getWorkoutLogId() {
		return workoutLogId;
	}

	public void setWorkoutLogId(Long workoutLogId) {
		this.workoutLogId = workoutLogId;
	}

	public Long getExerciseId() {
		return exerciseId;
	}

	public void setExerciseId(Long exerciseId) {
		this.exerciseId = exerciseId;
	}
    
    

}
