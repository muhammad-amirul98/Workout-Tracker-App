import { Exercise } from "../types";
import DialogContent from "@mui/material/DialogContent";

type DialogFormProps = {
  exercise: Exercise;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ExerciseDialogContent({ exercise, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Name"
          name="name"
          value={exercise.name}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Body Part"
          name="bodyPart"
          value={exercise.bodyPart}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Sets"
          name="sets"
          value={exercise.sets}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Reps"
          name="reps"
          value={exercise.reps}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Weight"
          name="weight"
          value={exercise.weight}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}

export default ExerciseDialogContent;
