import axios, { AxiosRequestConfig } from "axios";
import { ExerciseResponse, WorkoutResponse } from "../types";
// import { getWorkoutIdFromHref } from "../utils/utils";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");

  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getWorkouts = async (): Promise<WorkoutResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/workouts`,
    getAxiosConfig()
  );
  return response.data._embedded.workouts;
};

export const getExercisesByWorkout = async (
  workoutId: string
): Promise<ExerciseResponse[]> => {
  // const workoutId = getWorkoutIdFromHref(workoutLink);
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/workouts/${workoutId}/exercise`,
    getAxiosConfig()
  );
  return response.data._embedded.exercises || [];
};
