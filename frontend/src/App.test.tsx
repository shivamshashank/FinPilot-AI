import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders the Day 1 foundation shell", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "FinPilot AI" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Day 1 foundation")).toBeInTheDocument();
    expect(screen.getByLabelText("Foundation features")).toBeInTheDocument();
  });

  it("shows the core foundation areas", () => {
    render(<App />);

    expect(screen.getByText("Finance workspace")).toBeInTheDocument();
    expect(screen.getByText("AI insights")).toBeInTheDocument();
    expect(screen.getByText("Production baseline")).toBeInTheDocument();
  });
});
