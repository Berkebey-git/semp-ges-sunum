import type { SiteMode } from "../data/types";

export type EquipmentKind = "panel" | "inverter" | "dc" | "ac" | "row" | "structure" | "transformer" | "cable" | "platform" | "anchor" | "shore" | "floatingCable";

export type EquipmentPick = {
  kind: EquipmentKind;
  index: number;
};

export type GesSceneProps = {
  mode: SiteMode;
  sunAngle: number;
  showPanels: boolean;
  showWires: boolean;
  showStructure?: boolean;
  showElectrical?: boolean;
  interactive: boolean;
  selected: EquipmentPick | null;
  onSelect?: (pick: EquipmentPick) => void;
  lowPower: boolean;
  animateWater?: boolean;
  hour?: number;
  night?: boolean;
  resetView?: number;
};
