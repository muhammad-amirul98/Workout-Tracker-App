// Define the structure for Exercise
export type Exercise = {
  id: number;
  name: string;
  bodyPart: string;
  sets: number;
  reps: number;
  weight: number;
};

// Define the structure for Workout
export type Workout = {
  workoutId: number;
  name: string;
  type: string;
  exercises: Exercise[];
};

// The type for an array of workouts
export type WorkoutResponse = Workout[];

// for each set of workout in current workout
export type ActualValues = {
  [key: number]: { reps: number; weight: number }[];
};

export type WorkoutLog = {
  id: number;
  workout: Workout;
  startTime: string; // Use ISO 8601 format for date-time (e.g., "2025-01-07T12:00:00")
  endTime: string | null; // Nullable if the workout hasn't ended yet
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED"; // Enum-like string union
  exerciseLogs: ExerciseLog[];
};

export type ExerciseLog = {
  id: number;
  exercise: Exercise;
  setLogs: SetLog[];
};

export type SetLog = {
  id: number;
  setNumber: number;
  reps: number;
  weight: number;
};
