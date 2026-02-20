import { describe, it, expect } from "vitest";
import { Sum } from "../helpers/Sum";

describe("Sum function", () => {
  it("adds 2 and 3 and expects 5", () => {
    const result = Sum(2, 3);
    expect(result).toBe(5);
  });

  it("adds negative numbers", () => {
    const result = Sum(-2, -8);
    expect(result).toBe(-10);
  });

  it("adds zeros", () => {
    const result = Sum(0, 0);
    expect(result).toBe(0);
  });
});
