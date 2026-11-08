import { describe, expect, it } from "vitest";
import { calculateEnergy, DEFAULT_ENERGY } from "./energy";
describe("illustrative energy model",()=>{
  it("uses correct Wp, W/m², hour and kWh units",()=>{
    const r=calculateEnergy(DEFAULT_ENERGY).outputs!;
    expect(r.capacityKwp).toBe(50); expect(r.equivalentSunHours).toBeCloseTo(4.8);
    expect(r.dailyKwh).toBeCloseTo(204); expect(r.annualKwh).toBeCloseTo(74460);
  });
  it("integrates fractional daylight windows into the exact daily total",()=>{
    const r=calculateEnergy({...DEFAULT_ENERGY,sunHours:5.5}).outputs!;
    expect(r.hourlyKwh.reduce((a,b)=>a+b,0)).toBeCloseTo(r.dailyKwh);
  });
  it("produces zero energy for no sunlight or complete losses",()=>{
    for(const patch of [{sunHours:0},{irradianceWm2:0},{lossPct:100}]) expect(calculateEnergy({...DEFAULT_ENERGY,...patch}).outputs!.annualKwh).toBe(0);
  });
  it("rejects invalid inputs instead of displaying misleading results",()=>{
    for(const patch of [{panelCount:1.5},{panelCount:0},{panelWatts:NaN},{lossPct:-1},{sunHours:25},{irradianceWm2:Infinity}]) expect(calculateEnergy({...DEFAULT_ENERGY,...patch}).outputs).toBeNull();
  });
  it("scales linearly with panel count and does not apply hidden site gains",()=>{
    expect(calculateEnergy({...DEFAULT_ENERGY,panelCount:200}).outputs!.dailyKwh).toBeCloseTo(408);
  });
});
