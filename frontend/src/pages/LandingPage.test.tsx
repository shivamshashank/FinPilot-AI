import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppProvider } from "../components/AppContext";
import { ThemeProvider } from "../components/ThemeContext";
import LandingPage from "./LandingPage";

describe("LandingPage", () => {
  it("renders landing page headings and features list", () => {
    render(
      <ThemeProvider>
        <AppProvider>
          <LandingPage />
        </AppProvider>
      </ThemeProvider>
    );

    // Landing Page Logo/Title
    expect(screen.getAllByText("FinPilot AI")[0]).toBeInTheDocument();

    // Features Section checks
    expect(screen.getByText("FinPilot AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Predictive Analytics")).toBeInTheDocument();
    expect(screen.getByText("Receipt OCR & Parsing")).toBeInTheDocument();
  });
});
