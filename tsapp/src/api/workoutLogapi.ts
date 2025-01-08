import axios, { AxiosRequestConfig } from "axios";
import { WorkoutLog } from "../types";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getWorkoutLogs = async (): Promise<WorkoutLog[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/workoutLog/me`,
    getAxiosConfig()
  );
  return response.data;
};

export const createWorkoutLog = async (workoutLog: WorkoutLog) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/workoutLog/me`,
    workoutLog,
    getAxiosConfig()
  );
  return response.data;
};

export const deleteWorkoutLog = async (
  workoutLog: WorkoutLog
): Promise<string> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/workouts/me`,
    {
      data: workoutLog, // Pass the workout object as the data property
      ...getAxiosConfig(), // Include additional Axios configuration
    }
  );
  return response.data;
};
