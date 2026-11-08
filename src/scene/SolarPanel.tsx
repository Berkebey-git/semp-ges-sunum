import { ThreeEvent } from "@react-three/fiber";
import { DoubleSide } from "three";
import type { EquipmentPick } from "./types";

type SolarPanelProps = {
  position: [number, number, number];
  tilt: number;
  detailed?: boolean;
  index: number;
  selected: boolean;
  interactive: boolean;
  onSelect?: (pick: EquipmentPick) => void;
};

export function SolarPanel({
  position,
  tilt,
  detailed = false,
  index,
  selected,
  interactive,
  onSelect,
}: SolarPanelProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!interactive || !onSelect) return;
    event.stopPropagation();
    onSelect({ kind: "panel", index });
  };

  return (
    <group position={position} rotation={[tilt, 0, 0]} onClick={handleClick}>
      <mesh castShadow>
        <boxGeometry args={[1.04, 0.055, 1.5]} />
        <meshStandardMaterial color="#96b4bd" metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.033, 0]} castShadow>
        <planeGeometry args={[0.95, 1.4]} />
        <meshPhysicalMaterial
          clearcoat={detailed ? 1 : 0}
          clearcoatRoughness={.12}
          color="#13527a"
          metalness={0.55}
          roughness={0.12}
          emissive={selected ? "#1a6fa3" : "#051a30"}
          emissiveIntensity={selected ? 0.9 : 0.35}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
