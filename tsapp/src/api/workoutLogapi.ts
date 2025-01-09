import axios from "axios";
import { WorkoutLog } from "../types";
import { getAxiosConfig } from "./authorization";

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
    `${import.meta.env.VITE_API_URL}/workoutLog/me`,
    {
      data: workoutLog, // Pass the workout object as the data property
      ...getAxiosConfig(), // Include additional Axios configuration
    }
  );
  return response.data;
};

export const workoutCompleted = async (workoutLog: {
  workoutLogId: number;
  status: string;
  endTime: string;
}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/workoutLog/me/completed`,
    workoutLog,
    getAxiosConfig()
  );
  return response.data;
};

export const workoutCancelled = async (workoutLog: {
  workoutLogId: number;
  status: string;
  endTime: string;
}) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/workoutLog/me/cancelled`,
    workoutLog,
    getAxiosConfig()
  );
  return response.data;
};

export const createExerciseLog = async (
  workoutLogId: number,
  exerciseId: number
) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/exerciseLog`,
    { workoutLogId, exerciseId },
    getAxiosConfig()
  );
  return response.data;
};

export const createSetLog = async (
  exerciseLogId: number,
  setIndex: number,
  reps: number,
  weight: number
) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/setLog`,
    { exerciseLogId, setIndex, reps, weight },
    getAxiosConfig()
  );
  return response.data;
};
