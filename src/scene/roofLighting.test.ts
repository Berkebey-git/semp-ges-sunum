import { describe, expect, it } from "vitest";
import { roofLighting } from "./roofLighting";
describe("roof lighting", () => {
  it("moves the sun east to west with midday elevation", () => {
    expect(roofLighting(8, false).position[0]).toBeLessThan(0);
    expect(roofLighting(16, false).position[0]).toBeGreaterThan(0);
    expect(roofLighting(12, false).position[1]).toBeGreaterThan(roofLighting(8, false).position[1]);
  });
  it("removes solar lighting at night and keeps finite positions", () => {
    expect(roofLighting(12, true).night).toBe(true);
    expect(roofLighting(23, false).night).toBe(true);
    expect(roofLighting(12, false).night).toBe(false);
    expect(roofLighting(6, false).position.every(Number.isFinite)).toBe(true);
  });
});
