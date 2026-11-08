import { describe, expect, it } from "vitest";
import { LAND_COLUMNS, LAND_PANEL_COUNT, landPanel, terrainHeight } from "./landLayout";
describe("land presentation layout", () => {
  it("keeps all panels clear of the terrain and within the site", () => {
    expect(LAND_PANEL_COUNT).toBe(128);
    for(let i=0;i<LAND_PANEL_COUNT;i++) {
      const p=landPanel(i);
      expect(Math.abs(p.x)+.54).toBeLessThan(15);
      expect(Math.abs(p.z)+.8).toBeLessThan(12.5);
      for(const dx of [-.54,.54]) for(const dz of [-.8,.8])
        expect(p.y-.25-terrainHeight(p.x+dx,p.z+dz)).toBeGreaterThan(.5);
    }
  });
  it("maps instance IDs to distinct rows for selection", () => {
    expect(landPanel(LAND_COLUMNS-1).row).toBe(0);
    expect(landPanel(LAND_COLUMNS).row).toBe(1);
    expect(landPanel(LAND_PANEL_COUNT-1).row).toBe(7);
  });
});
