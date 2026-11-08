import { FloatingFarm } from "./FloatingFarm";
import { LandFarm } from "./LandFarm";
import { FactoryRoof } from "./FactoryRoof";
import type { EquipmentPick } from "./types";
import type { SiteMode } from "../data/types";



type SiteProps = {
  animateWater?: boolean;
  lowPower?: boolean;
  showStructure?: boolean;
  showElectrical?: boolean;
  showPanels: boolean;
  showWires: boolean;
  interactive: boolean;
  selected: EquipmentPick | null;
  onSelect?: (pick: EquipmentPick) => void;
};

export function RoofSite(props: SiteProps) { return <FactoryRoof {...props} />; }

export function LandSite(props: SiteProps) { return <LandFarm {...props} />; }

export function FloatSite(props: SiteProps) { return <FloatingFarm {...props} />; }

export function SiteModel({
  mode,
  ...rest
}: SiteProps & { mode: SiteMode }) {
  if (mode === "land") return <LandSite {...rest} />;
  if (mode === "float") return <FloatSite {...rest} />;
  return <RoofSite {...rest} />;
}

export { PANEL_COUNT } from "./modelCounts";
