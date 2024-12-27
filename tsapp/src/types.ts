export type ExerciseResponse = {
  name: string;
  bodyPart: string;
  sets: number;
  reps: number;
  weight: number;
  _links: {
    self: {
      href: string;
    };
    exercise: {
      href: string;
    };
    workout: {
      href: string;
    };
  };
};

export type WorkoutResponse = {
  name: string;
  type: string;
  _links: {
    self: {
      href: string;
    };
    workout: {
      href: string;
    };
    exercise: {
      href: string;
    };
  };
};

export type Exercise = {
  name: string;
  bodyPart: string;
  sets: number;
  reps: number;
  weight: number;
};

export type ExerciseEntry = {
  exercise: Exercise;
  url: string;
};

// "name": "tricep pulldown",
//                 "bodyPart": "tricep",
//                 "sets": 3,
//                 "reps": 8,
//                 "weight": 12.5,
//                 "_links": {
//                     "self": {
//                         "href": "http://localhost:8080/api/exercises/1"
//                     },
//                     "exercise": {
//                         "href": "http://localhost:8080/api/exercises/1"
//                     },
//                     "workout": {
//                         "href": "http://localhost:8080/api/exercises/1/workout"
//                     }
//                 }
//             },
