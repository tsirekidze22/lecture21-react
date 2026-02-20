import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach } from "vitest";
import Counter from "./Counter";

describe("Counter Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("Renders initial count value - 0", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeTruthy();
  });

  it("increments count when button is clicked", async () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "Increase" });
    await userEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeTruthy();
  });

  it("increments count when button is clicked", async () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "Increase" });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(screen.getByText("Count: 2")).toBeTruthy();
  });
});
