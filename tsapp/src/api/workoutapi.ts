import axios, { AxiosRequestConfig } from "axios";
import { WorkoutResponse } from "../types";

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
