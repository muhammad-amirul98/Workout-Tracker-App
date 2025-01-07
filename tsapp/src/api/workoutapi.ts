import axios, { AxiosRequestConfig } from "axios";
import { WorkoutResponse, Workout } from "../types";
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

export const getWorkoutsByUser = async (): Promise<WorkoutResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/workouts/me`,
    getAxiosConfig()
  );
  return response.data;
};

export const addWorkout = async (workout: Workout): Promise<Workout> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { workoutId, ...workoutData } = workout;
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/workouts/me`,
    workoutData,
    getAxiosConfig()
  );
  return response.data;
};

export const updateWorkout = async (
  updatedWorkout: Workout
): Promise<Workout> => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/workouts/me`,
    updatedWorkout,
    getAxiosConfig()
  );
  return response.data;
};

export const deleteWorkout = async (workout: Workout): Promise<string> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/workouts/me`,
    {
      data: workout, // Pass the workout object as the data property
      ...getAxiosConfig(), // Include additional Axios configuration
    }
  );
  return response.data;
};

// export const startWorkout = async (workout: Workout):s
