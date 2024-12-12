import { ExerciseResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../api/exerciseapi";

function Exerciselist() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });

  if (!isSuccess) {
    console.log(data);
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching cars</span>;
  } else {
    return (
      <table>
        <tbody>
          {data.map((exercise: ExerciseResponse) => (
            <tr key={exercise._links.self.href}>
              <td>{exercise.name}</td>
              <td>{exercise.bodyPart}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.weight} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Exerciselist;
