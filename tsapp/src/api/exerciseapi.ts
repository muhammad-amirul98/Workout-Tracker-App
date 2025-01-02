import { Exercise } from "../types";
import axios, { AxiosRequestConfig } from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const addExercise = async (
  workoutId: number,
  exercise: Exercise
): Promise<Exercise> => {
  console.log(workoutId);
  console.log("EXERCISE: " + exercise.name);
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/workouts/me/${workoutId}`,
    exercise,
    getAxiosConfig()
  );
  return response.data;
};

export const updateExercise = async (exercise: Exercise): Promise<Exercise> => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/workouts/me/exercise`,
    exercise,
    getAxiosConfig()
  );
  return response.data;
};

export const deleteExercise = async (exercise: Exercise): Promise<Exercise> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/workouts/me/exercise`,
    { data: exercise, ...getAxiosConfig() }
  );
  return response.data;
};

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
