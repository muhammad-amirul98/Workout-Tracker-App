import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Workoutlist from "./workouts/Workoutlist";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  password: string;
};

type LoginProps = {
  isAuthenticated: boolean;
  onLogin: () => void;
};

function Login({ isAuthenticated, onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const jwtToken = res.headers.authorization;

        if (jwtToken != null) {
          sessionStorage.setItem("jwt", jwtToken);
          onLogin();
        }
      })
      .catch(() => setOpen(true));
  };

  if (isAuthenticated) {
    return <Workoutlist />;
  } else {
    return (
      // <Stack spacing={2} alignItems="center" mt={2}>
      //   <TextField name="username" label="Username" onChange={handleChange} />
      //   <TextField
      //     type="password"
      //     name="password"
      //     label="Password"
      //     onChange={handleChange}
      //   />
      //   <Button variant="outlined" color="primary" onClick={handleLogin}>
      //     Login
      //   </Button>
      // </Stack>
      <>
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{ width: "100%", marginBottom: "16px" }}
        >
          <Stack spacing={2} alignItems="center" mt={2}>
            <TextField
              name="username"
              label="Username"
              onChange={handleChange}
              className="custom-textfield"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              onChange={handleChange}
              className="custom-textfield"
            />
            <Button variant="outlined" color="primary" type="submit">
              Login
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
              message="Login failed: Check your username and password"
            />
          </Stack>
        </form>
        {/* <Stack
          alignItems="center"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 2,
            margin: "auto",
            width: "fit-content",
          }}
        > */}
        <Typography
          alignItems="center"
          sx={{
            border: "1px solid #3a7bff",
            borderRadius: "8px",
            padding: 2,
            margin: "auto",
            width: "fit-content",
            color: "#3a7bff",
          }}
        >
          Don't have an account?{" "}
          <Button
            onClick={() => navigate("/signup")}
            className="buttonText buttonHover"
          >
            Sign Up
          </Button>
        </Typography>
        {/* </Stack> */}
      </>
    );
  }
}

export default Login;
