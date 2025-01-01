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
    `${import.meta.env.VITE_API_URL}/users/me/workouts`,
    getAxiosConfig()
  );
  return response.data;
};

export const addWorkout = async (workout: Workout): Promise<Workout> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { workoutId, ...workoutData } = workout;
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/me/workouts`,
    workoutData,
    getAxiosConfig()
  );
  return response.data;
};
