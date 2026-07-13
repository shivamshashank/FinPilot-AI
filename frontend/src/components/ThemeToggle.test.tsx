import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders light, dark, and system options and allows changing theme", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const lightButton = screen.getByRole("button", { name: /light mode/i });
    const darkButton = screen.getByRole("button", { name: /dark mode/i });
    const systemButton = screen.getByRole("button", { name: /system theme/i });

    expect(lightButton).toBeInTheDocument();
    expect(darkButton).toBeInTheDocument();
    expect(systemButton).toBeInTheDocument();

    await user.click(lightButton);
    expect(localStorage.getItem("finpilot_theme")).toBe("light");

    await user.click(darkButton);
    expect(localStorage.getItem("finpilot_theme")).toBe("dark");

    await user.click(systemButton);
    expect(localStorage.getItem("finpilot_theme")).toBe("system");
  });
});
