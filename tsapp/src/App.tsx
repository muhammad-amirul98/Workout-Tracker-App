// import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Exerciselist from "./components/Exerciselist";

const queryClient = new QueryClient();

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Workout Tracker</Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <Exerciselist />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
