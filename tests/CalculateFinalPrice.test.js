import { describe, it, expect } from "vitest";
import { CalculateFinalPrice } from "../helpers/CalculateFinalPrice";

describe("Calculates Final Price", () => {
  it("applies discount to regular user", () => {
    const result = CalculateFinalPrice(100, 20, false);
    expect(result).toBe(80);
  });

  it("applies discount to premium user", () => {
    const result = CalculateFinalPrice(100, 20, true);
    expect(result).toBe(76);
  });

  it("applies discount to regular user", () => {
    const result = CalculateFinalPrice(0, 20, true);
    expect(result).toBe(0);
  });
});
