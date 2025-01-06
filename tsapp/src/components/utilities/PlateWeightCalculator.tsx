import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "../../styles/styles.css";

function PlateWeightCalculator() {
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [barbellWeight, setBarbellWeight] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [plates, setPlates] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (value: number, checked: boolean) => {
    setPlates((prevPlates) => {
      if (checked) {
        // Add the plate if checked
        return [...prevPlates, value];
      } else {
        // Remove the plate if unchecked
        return prevPlates.filter((plate) => plate !== value);
      }
    });
  };

  const calculatePlates = (targetWeight: number, barbellWeight: number) => {
    const weightPerSide = (targetWeight - barbellWeight) / 2;
    const result: Record<number, number> = {};

    let remainingWeight = weightPerSide;
    for (const plate of plates) {
      const count = Math.floor(remainingWeight / plate);
      if (count > 0) {
        result[plate] = count;
        remainingWeight -= count * plate;
      }
    }

    if (remainingWeight > 0) {
      setMessage("Note: Exact weight not achievable with available plates.");
    }

    return result;
  };

  const handleCalculate = () => {
    const result = calculatePlates(targetWeight, barbellWeight);
    setMessage("Plates needed per side" + result);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button onClick={handleClickOpen}>Plate Weight Calculator</Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Plate Weight Calculator</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Target Weight (kg)"
              name="targetweight"
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
            />
            <TextField
              label="Barbell Weight (kg)"
              name="barbellweight"
              value={barbellWeight}
              onChange={(e) => setBarbellWeight(Number(e.target.value))}
            />
            <Typography className="buttonText" gutterBottom>
              Select Available Plates:
            </Typography>
            <FormGroup row>
              <FormControlLabel
                label="25kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(25, e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="20kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(20, e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="15kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(25, e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="10kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(25, e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="5kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(25, e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="2.5kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(25, e.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="1.25kg"
                control={
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(25, e.target.checked)}
                  />
                }
              />
            </FormGroup>
            <Typography>{message}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCalculate}>Calculate</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PlateWeightCalculator;
