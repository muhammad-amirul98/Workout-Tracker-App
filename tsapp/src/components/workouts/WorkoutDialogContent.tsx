import DialogContent from "@mui/material/DialogContent";
import { Workout } from "../../types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

type WorkoutFormProps = {
  workout: Workout;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function WorkoutDialogContent({ workout, handleChange }: WorkoutFormProps) {
  return (
    <>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={workout.name}
            onChange={handleChange}
          />
          <TextField
            label="Type"
            name="type"
            value={workout.type}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
    </>
  );
}

export default WorkoutDialogContent;
