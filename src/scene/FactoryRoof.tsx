import { useLayoutEffect, useRef } from "react";
import { InstancedMesh, Object3D } from "three";
import { Line } from "@react-three/drei";
import { BoxMesh } from "./BoxMesh";
import { SolarPanel } from "./SolarPanel";
import type { EquipmentPick } from "./types";

type Props = {
  showPanels: boolean; showWires: boolean; interactive: boolean;
  selected: EquipmentPick | null; onSelect?: (pick: EquipmentPick) => void;
};

// Cell detail is batched into one draw call for the entire roof array.
function CellArray() {
  const ref = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const dummy = new Object3D();
    let i = 0;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      for (let y = 0; y < 10; y++) for (let x = 0; x < 6; x++) {
        dummy.position.set(-3.5 + c * 1.25 + (x - 2.5) * .153, 2.58, -2.6 + r * 1.64 + (y - 4.5) * .138);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        ref.current!.setMatrixAt(i++, dummy.matrix);
      }
    }
    ref.current!.instanceMatrix.needsUpdate = true;
    ref.current!.computeBoundingSphere();
  }, []);
  return <instancedMesh ref={ref} args={[undefined, undefined, 1440]} raycast={() => {}}>
    <boxGeometry args={[.143, .003, .129]} />
    <meshStandardMaterial color="#163e61" metalness={.45} roughness={.24} />
  </instancedMesh>;
}

export function FactoryRoof(props: Props) {
  const pick = (kind: EquipmentPick["kind"]) => props.interactive && props.onSelect?.({ kind, index: 0 });
  const equipment = [
    { kind: "dc" as const, x: -1.7, color: "#536d7a", width: .65 },
    { kind: "inverter" as const, x: -.3, color: "#dae2e5", width: .9 },
    { kind: "ac" as const, x: 1.3, color: "#8c9ca7", width: .85 },
  ];
  return <group>
    <BoxMesh args={[12.3,.16,10.1]} position={[0,-.02,0]} color="#4c5b61" />
    <BoxMesh args={[10,2.25,7.7]} position={[0,1.18,0]} color="#8c9ba3" metalness={.3} />
    <BoxMesh args={[10.5,.2,8.2]} position={[0,2.4,0]} color="#465964" metalness={.55} />
    {[-4.95,4.95].map(x => <BoxMesh key={x} args={[.16,.22,8.2]} position={[x,2.56,0]} color="#a3b3bd" metalness={.6} />)}
    {[-4.05,4.05].map(z => <BoxMesh key={z} args={[10.5,.18,.12]} position={[0,2.54,z]} color="#b0bec5" metalness={.6} />)}
    {Array.from({length:21},(_,i)=><BoxMesh key={i} args={[.035,2.1,.035]} position={[-4.8+i*.48,1.2,3.87]} color="#b3bec3" metalness={.55} />)}
    {Array.from({length:17},(_,i)=><BoxMesh key={i} args={[.035,2.1,.035]} position={[5.02,1.2,-3.7+i*.46]} color="#b3bec3" metalness={.55} />)}
    {[-3.4,-1.4, .6].map(x => <group key={x}>
      <BoxMesh args={[1.6,1.55,.12]} position={[x,.88,3.93]} color="#253949" />
      {Array.from({length:7},(_,i)=><BoxMesh key={i} args={[1.48,.025,.04]} position={[x,.25+i*.2,4.01]} color="#6f838c" metalness={.4} />)}
      <BoxMesh args={[1.8,.13,.6]} position={[x,.13,4.12]} color="#283b45" />
    </group>)}
    <BoxMesh args={[1.3,.65,.07]} position={[3.1,1.55,3.92]} color="#193b50" metalness={.55} />
    <BoxMesh args={[1.5,.08,.55]} position={[3.1,1.99,4]} color="#abb9bf" metalness={.5} />
    {[-2.7,2.5].map(z => <group key={z}>
      <BoxMesh args={[.7,.4,.75]} position={[-4.35,2.72,z]} color="#b4c2c6" metalness={.6} />
      <mesh position={[-4.35,2.94,z]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.24,16]} /><meshStandardMaterial color="#23353d" /></mesh>
    </group>)}
    {Array.from({length:4},(_,r)=><group key={r}>
      {[-.48,.48].map(dz=><BoxMesh key={dz} args={[7.7,.05,.045]} position={[-.375,2.52,-2.6+r*1.64+dz]} color="#b0bac0" metalness={.8} />)}
      {props.showPanels && Array.from({length:6},(_,c)=><SolarPanel detailed key={c} position={[-3.5+c*1.25,2.54,-2.6+r*1.64]} tilt={0} index={r*6+c} interactive={props.interactive} selected={props.selected?.kind === "panel" && props.selected.index === r*6+c} onSelect={props.onSelect} />)}
    </group>)}
    {props.showPanels && <CellArray />}
    <BoxMesh args={[4.7,.15,1.05]} position={[-.2,.13,-4.4]} color="#899399" />
    {equipment.map(eq=><group key={eq.kind} position={[eq.x,1.1,-4.02]} onClick={e=>{ if(props.interactive) { e.stopPropagation(); pick(eq.kind); } }}>
      <mesh castShadow receiveShadow><boxGeometry args={[eq.width,1.1,.34]} /><meshStandardMaterial color={eq.color} metalness={.45} roughness={.32} emissive={props.selected?.kind === eq.kind ? "#20c8bd" : "#000000"} emissiveIntensity={.3} /></mesh>
      <BoxMesh args={[.3,.17,.025]} position={[0,.2,-.185]} color="#08283a" />
      <mesh position={[.21,.32,-.19]}><sphereGeometry args={[.025,8,6]} /><meshStandardMaterial color="#20c8bd" emissive="#20c8bd" emissiveIntensity={2} /></mesh>
      {Array.from({length:5},(_,i)=><BoxMesh key={i} args={[eq.width*.65,.025,.02]} position={[0,-.12-i*.065,-.18]} color="#283c48" />)}
    </group>)}
    {props.showWires && <group>
      <Line points={[[3.3,2.64,-3.4],[3.3,2.64,-3.9],[-1.7,2.64,-3.9],[-1.7,1.6,-4.23]]} color="#e5a45c" lineWidth={2.2} />
      <Line points={[[-1.7,.68,-4.23],[-1.7,.4,-4.3],[-.3,.4,-4.3],[-.3,.68,-4.23]]} color="#e5a45c" lineWidth={2.2} />
      <Line points={[[-.3,.65,-4.23],[-.3,.3,-4.4],[1.3,.3,-4.4],[1.3,.65,-4.23]]} color="#20c8bd" lineWidth={2.2} />
      <BoxMesh args={[5.8,.06,.16]} position={[.8,2.57,-3.9]} color="#73858e" metalness={.7} />
    </group>}
  </group>;
}
