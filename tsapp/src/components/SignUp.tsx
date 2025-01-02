import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Snackbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "../styles/styles.css";

type User = {
  username: string;
  password: string;
  role: "USER";
  email: string;
};

function SignUp() {
  const [open, setOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setError] = useState<string>("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    role: "USER",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validateConfirmPassword = () => {
    if (confirmPassword && confirmPassword !== userData.password) {
      setError("Passwords do not match!");
    } else {
      setError(""); // Clear error if passwords match
    }
  };

  const handleSignUp = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/signup", userData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setSnackbarMessage(
          "Account successfully created. Redirecting to login..."
        );
        setOpen(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          setSnackbarMessage(error.response.data);
          setOpen(true);
        }
      });
  };

  return (
    <>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        style={{ width: "100%" }}
      >
        <Stack spacing={2} alignItems="center" mt={1}>
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="custom-textfield"
          ></TextField>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            className="custom-textfield"
          ></TextField>
          <TextField
            label="Confirm Password"
            name="password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validateConfirmPassword}
            className="custom-textfield"
          ></TextField>
          {passwordError && ( // Render error message if it exists
            <Typography variant="body2" color="error">
              {passwordError}
            </Typography>
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            className="custom-textfield"
          ></TextField>
          <Button
            type="submit"
            variant="outlined"
            disabled={Boolean(passwordError)}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <br />
      {/* <Stack
        alignItems="center"
        mt={1}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: 2,
          margin: "auto",
          width: "fit-content",
        }}
      > */}
      <Typography
        sx={{
          border: "1px solid #3a7bff",
          borderRadius: "8px",
          padding: 2,
          margin: "auto",
          width: "fit-content",
          color: "#3a7bff",
        }}
      >
        Have an account?{" "}
        <Link href="/" underline="none">
          Log in
        </Link>
      </Typography>
      {/* </Stack> */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message={snackbarMessage}
      ></Snackbar>
    </>
  );
}

export default SignUp;
