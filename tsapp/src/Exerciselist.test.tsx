import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Exerciselist from "./components/exercises/Exerciselist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Exerciselist tests", () => {
  test("component renders", () => {
    render(<Exerciselist />, { wrapper });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("Exercises fetched", async () => {
    render(<Exerciselist />, { wrapper });

    // await waitFor(() => screen.getByText(/tricep/i));
    await waitFor(() => {
      const tricepEntries = screen.getAllByText(/tricep/i);
      expect(tricepEntries.length).toBeGreaterThan(0);
      //   expect(screen.getByText(/bodytest1/i)).toBeInTheDocument();
    });
  });

  test("New exercise modal opens", async () => {
    render(<Exerciselist />, { wrapper });
    await waitFor(() => screen.getByText(/new exercise/i));
    await userEvent.click(screen.getByText(/new exercise/i));
    // expect(screen.getByText(/save/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i }));
  });
});
