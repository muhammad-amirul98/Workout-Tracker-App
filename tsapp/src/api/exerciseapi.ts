import { Exercise, ExerciseResponse } from "../types";
import axios from "axios";
import { ExerciseEntry } from "../types";

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

export const addExercise = async (
  exercise: Exercise
): Promise<ExerciseResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/exercises`,
    exercise,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateExercise = async (
  exerciseEntry: ExerciseEntry
): Promise<ExerciseResponse> => {
  const response = await axios.put(exerciseEntry.url, exerciseEntry.exercise, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
