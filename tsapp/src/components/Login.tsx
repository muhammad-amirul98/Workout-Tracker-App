import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Exerciselist from "./Exerciselist";
import Snackbar from "@mui/material/Snackbar";

type User = {
  username: string;
  password: string;
};

type LoginProps = {
  isAuthenticated: boolean;
  onLogin: () => void;
};

function Login({ isAuthenticated, onLogin }: LoginProps) {
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
    return <Exerciselist />;
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        style={{ width: "100%" }}
      >
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
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
    );
  }
}

export default Login;
