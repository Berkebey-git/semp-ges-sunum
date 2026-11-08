import { describe, expect, it } from "vitest";
import { calculateSelfConsumptionScenario, DEFAULT_FINANCE_INPUTS } from "./finance";

describe("calculateSelfConsumptionScenario", () => {
  it("B13 eğitim senaryosundaki 500 kWp × 1.450 kWh/kWp üretimini üretir", () => {
    const result = calculateSelfConsumptionScenario(DEFAULT_FINANCE_INPUTS);
    expect(result.generationKwh).toBe(725_000);
    expect(result.selfConsumedKwh).toBe(580_000);
    expect(result.grossSavingsUsd).toBeCloseTo(81_200);
    expect(result.simplePaybackYears).toBeCloseTo(6.382978, 4);
  });

  it("negatif girdileri sıfırlar ve geri ödemeyi hesaplamaz", () => {
    const result = calculateSelfConsumptionScenario({
      powerKwp: -10,
      specificYield: -1,
      selfConsumptionPct: 150,
      unitValueUsd: -2,
      capexUsd: 100,
      omUsd: 0,
    });
    expect(result.generationKwh).toBe(0);
    expect(result.selfConsumedKwh).toBe(0);
    expect(result.simplePaybackYears).toBeNull();
  });

  it("bakım tasarrufu aşınca geri ödemeyi kapatır", () => {
    const result = calculateSelfConsumptionScenario({
      ...DEFAULT_FINANCE_INPUTS,
      omUsd: 90_000,
    });
    expect(result.netContributionUsd).toBeLessThan(0);
    expect(result.simplePaybackYears).toBeNull();
  });
});
