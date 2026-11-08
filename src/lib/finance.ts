export type FinanceInputs = {
  powerKwp: number;
  specificYield: number;
  selfConsumptionPct: number;
  unitValueUsd: number;
  capexUsd: number;
  omUsd: number;
};

export type FinanceResult = {
  generationKwh: number;
  selfConsumedKwh: number;
  grossSavingsUsd: number;
  netContributionUsd: number;
  simplePaybackYears: number | null;
  summary: string;
};

export const DEFAULT_FINANCE_INPUTS: FinanceInputs = {
  powerKwp: 500,
  specificYield: 1450,
  selfConsumptionPct: 80,
  unitValueUsd: 0.14,
  capexUsd: 480_000,
  omUsd: 6_000,
};

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function calculateSelfConsumptionScenario(raw: FinanceInputs): FinanceResult {
  const powerKwp = Math.max(0, raw.powerKwp || 0);
  const specificYield = Math.max(0, raw.specificYield || 0);
  const selfConsumptionPct = clamp(raw.selfConsumptionPct || 0, 0, 100);
  const unitValueUsd = Math.max(0, raw.unitValueUsd || 0);
  const capexUsd = Math.max(0, raw.capexUsd || 0);
  const omUsd = Math.max(0, raw.omUsd || 0);

  const generationKwh = powerKwp * specificYield;
  const selfConsumedKwh = (generationKwh * selfConsumptionPct) / 100;
  const grossSavingsUsd = selfConsumedKwh * unitValueUsd;
  const netContributionUsd = grossSavingsUsd - omUsd;
  const simplePaybackYears =
    netContributionUsd > 0 ? capexUsd / netContributionUsd : null;

  const summary = `${fmtLocal(powerKwp)} kWp × ${fmtLocal(specificYield)} kWh/kWp = ${fmtLocal(generationKwh)} kWh/yıl. %${fmtLocal(selfConsumptionPct)} öz tüketim varsayımıyla ${fmtLocal(selfConsumedKwh)} kWh satın alımı önlenebilir. Yıllık net basitleştirilmiş katkı ${fmtLocal(netContributionUsd)} USD olarak hesaplanır.`;

  return {
    generationKwh,
    selfConsumedKwh,
    grossSavingsUsd,
    netContributionUsd,
    simplePaybackYears,
    summary,
  };
}

function fmtLocal(n: number, digits = 0): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}
