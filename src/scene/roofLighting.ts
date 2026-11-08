// Illustrative 06:00–18:00 arc; no geographic, date or irradiance model.
export function roofLighting(hour: number, forceNight: boolean) {
  const angle = ((hour - 6) / 12) * Math.PI;
  return {
    position: [-Math.cos(angle) * 11, Math.max(.25, Math.sin(angle) * 11), 4] as [number, number, number],
    night: forceNight || hour <= 6 || hour >= 18,
  };
}
