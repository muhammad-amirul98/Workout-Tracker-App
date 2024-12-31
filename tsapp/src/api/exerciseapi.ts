// import { Exercise, ExerciseResponse } from "../types";
// import axios, { AxiosRequestConfig } from "axios";
// import { ExerciseEntry } from "../types";

// const getAxiosConfig = (): AxiosRequestConfig => {
//   const token = sessionStorage.getItem("jwt");
//   return {
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json",
//     },
//   };
// };

// export const getExercisesByWorkout = async (
//   id: string
// ): Promise<ExerciseResponse[]> => {
//   const response = await axios.get(`${id}/exercise`, getAxiosConfig());
//   return response.data._embedded.exercises;
// };

// export const deleteExercise = async (
//   link: string
// ): Promise<ExerciseResponse> => {
//   const response = await axios.delete(link, getAxiosConfig());
//   return response.data;
// };

// export const addExercise = async (
//   exercise: Exercise
// ): Promise<ExerciseResponse> => {
//   const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/exercises`,
//     exercise,
//     getAxiosConfig()
//   );

//   return response.data;
// };

// export const updateExercise = async (
//   exerciseEntry: ExerciseEntry
// ): Promise<ExerciseResponse> => {
//   const response = await axios.put(
//     exerciseEntry.url,
//     exerciseEntry.exercise,
//     getAxiosConfig()
//   );
//   return response.data;
// };
