// Presentation geometry only: no surveyed elevations or engineering dimensions.
export const LAND_ROWS = 8;
export const LAND_COLUMNS = 16;
export const LAND_PANEL_COUNT = LAND_ROWS * LAND_COLUMNS;
export function terrainHeight(x: number, z: number) {
  return .5 + .024 * x + .016 * z + .25 * Math.sin(x * .19) * Math.cos(z * .2);
}
export function landPanel(index: number) {
  const row = Math.floor(index / LAND_COLUMNS);
  const x = -10 + (index % LAND_COLUMNS) * 1.25;
  const z = -8 + row * 2.25;
  return { row, x, z, y: terrainHeight(x,z) + 1.1 };
}
