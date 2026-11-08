export const ENERGY_MODEL_META = { status: "temsili_hesap", assumptions: {referenceIrradianceWm2:1000, repeatedDays:365, seasonalVariation:false, siteGain:1}, source: "Uygulama eğitim senaryosu; B13 / s.1–2 veri ayrımı çerçevesi" } as const;
export type EnergyInputs = { panelCount: number; panelWatts: number; lossPct: number; irradianceWm2: number; sunHours: number };
export const DEFAULT_ENERGY: EnergyInputs = {panelCount:100, panelWatts:500, lossPct:15, irradianceWm2:800, sunHours:6};
export const ENERGY_FIELDS: {key: keyof EnergyInputs; label:string; min:number; max:number; step:number}[] = [
  {key:"panelCount",label:"Panel sayısı (adet)",min:1,max:100000,step:1},
  {key:"panelWatts",label:"Panel gücü (Wp / modül)",min:1,max:1500,step:1},
  {key:"lossPct",label:"Toplam sistem kaybı (%)",min:0,max:100,step:.5},
  {key:"irradianceWm2",label:"Ortalama düzlem ışınımı (W/m²)",min:0,max:1400,step:10},
  {key:"sunHours",label:"Güneşlenme süresi (saat/gün)",min:0,max:24,step:.5},
];
export function calculateEnergy(inputs: EnergyInputs) {
  const errors = ENERGY_FIELDS.filter(f=>!Number.isFinite(inputs[f.key]) || inputs[f.key]<f.min || inputs[f.key]>f.max).map(f=>`${f.label}: ${f.min}–${f.max} aralığında olmalı.`);
  if(Number.isFinite(inputs.panelCount) && !Number.isInteger(inputs.panelCount)) errors.push("Panel sayısı tam sayı olmalı.");
  if(errors.length) return {errors, outputs:null};
  const capacityKwp=inputs.panelCount*inputs.panelWatts/1000;
  const equivalentSunHours=inputs.irradianceWm2/ENERGY_MODEL_META.assumptions.referenceIrradianceWm2*inputs.sunHours;
  const lossFactor=1-inputs.lossPct/100;
  const dailyKwh=capacityKwp*equivalentSunHours*lossFactor;
  const start=12-inputs.sunHours/2, end=12+inputs.sunHours/2;
  // Flat irradiance during the entered sun window; overlap integrates exactly to daily energy.
  const hourlyKwh=Array.from({length:24},(_,h)=>Math.max(0,Math.min(h+1,end)-Math.max(h,start))*capacityKwp*inputs.irradianceWm2/1000*lossFactor);
  return {errors,outputs:{capacityKwp,equivalentSunHours,lossFactor,dailyKwh,annualKwh:dailyKwh*ENERGY_MODEL_META.assumptions.repeatedDays,hourlyKwh,idealDailyKwh:capacityKwp*equivalentSunHours}};
}
