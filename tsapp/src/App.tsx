import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Exerciselist from "./components/Exerciselist";
import Login from "./components/Login";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    sessionStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Workout Tracker</Typography>
          </Box>
          {!isLoggedIn && (
            <Button color="inherit" className="button">
              Sign Up
            </Button>
          )}
          {isLoggedIn && (
            <Button onClick={logOut} color="inherit" className="button">
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Login isAuthenticated={isLoggedIn} onLogin={logIn} />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
