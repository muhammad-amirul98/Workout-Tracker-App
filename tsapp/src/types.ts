// export type ExerciseResponse = {
//   name: string;
//   bodyPart: string;
//   sets: number;
//   reps: number;
//   weight: number;
//   _links: {
//     self: {
//       href: string;
//     };
//     exercise: {
//       href: string;
//     };
//     workout: {
//       href: string;
//     };
//   };
// };

// export type WorkoutResponse = {
//   name: string;
//   type: string;
//   _links: {
//     self: {
//       href: string;
//     };
//     workout: {
//       href: string;
//     };
//     exercise: {
//       href: string;
//     };
//   };
// };

// export type Exercise = {
//   name: string;
//   bodyPart: string;
//   sets: number;
//   reps: number;
//   weight: number;
// };

// export type ExerciseEntry = {
//   exercise: Exercise;
//   url: string;
// };

//////////////////////////////////////////////////////////////
// users/me/workouts
//////////////////////////////////////////////////////////////

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

// export type WorkoutEntry = {
//   name: string;
//   type: string;
//   exercises: Exercise[];
// };
