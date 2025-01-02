import { Exercise } from "../../types";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type DialogFormProps = {
  exercise: Exercise;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ExerciseDialogContent({ exercise, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={exercise.name}
            onChange={handleChange}
          />
          <TextField
            label="Body Part"
            name="bodyPart"
            value={exercise.bodyPart}
            onChange={handleChange}
          />
          <TextField
            label="Sets"
            name="sets"
            value={exercise.sets}
            onChange={handleChange}
          />
          <TextField
            label="Reps"
            name="reps"
            value={exercise.reps}
            onChange={handleChange}
          />
          <TextField
            label="Weight"
            name="weight"
            value={exercise.weight}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
    </>
  );
}

export default ExerciseDialogContent;
