import axios, { AxiosRequestConfig } from "axios";
import { WorkoutsResponse } from "../types";
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

export const getWorkoutsByUser = async (): Promise<WorkoutsResponse> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/me/workouts`,
    getAxiosConfig()
  );
  console.log("getWorkoutsByUser: " + response.data);
  return response.data;
};

// export const addWorkoutByUser = async (): Promise<WorkoutEntry> => {
//   const response = await axios.post()
// }
