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
import SignUp from "./components/SignUp";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const CustomToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    sessionStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#000000", // Background color for the entire page
          minHeight: "100vh", // Ensure the background covers the full height of the viewport
        }}
      >
        <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
          <CustomToolbar sx={{ color: "#3A7BFF" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" className="logoText">
                Workout Tracker
              </Typography>
            </Box>
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              {location.pathname !== "/signup" && !isLoggedIn && (
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="buttonText buttonHover"
                >
                  Sign Up
                </Button>
              )}
              {isLoggedIn && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "1.5rem" }}>
                    <Button className="buttonText buttonHover">Workout</Button>
                    <Button className="buttonText buttonHover">
                      Workout Logs
                    </Button>
                    <Button className="buttonText buttonHover">Progress</Button>
                    <IconButton className="buttonText iconButtonHover">
                      <SearchIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      // gap: "10rem",
                      marginLeft: 45,
                      display: "flex",
                    }}
                  >
                    <Button className="buttonText buttonHover" onClick={logOut}>
                      Log Out
                    </Button>
                  </Box>
                </Box>
              )}
            </div>
          </CustomToolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/"
              element={<Login isAuthenticated={isLoggedIn} onLogin={logIn} />}
            />
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </QueryClientProvider>
      </Container>
      <Footer />
    </>
  );
}

export default App;
