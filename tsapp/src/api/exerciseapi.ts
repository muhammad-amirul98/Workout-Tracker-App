import { ExerciseResponse } from "../types";
import axios from "axios";

export const getExercises = async (): Promise<ExerciseResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/exercises`
  );
  return response.data._embedded.exercises;
};

export const deleteExercise = async (
  link: string
): Promise<ExerciseResponse> => {
  const response = await axios.delete(link);
  return response.data;
};
