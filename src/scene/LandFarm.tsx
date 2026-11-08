import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { BoxGeometry, InstancedMesh, Object3D, PlaneGeometry, Color } from "three";
import { Line } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { BoxMesh } from "./BoxMesh";
import { LAND_PANEL_COUNT, LAND_ROWS, landPanel, terrainHeight } from "./landLayout";
import type { EquipmentPick } from "./types";

type Props = {
  showPanels: boolean; showWires: boolean; showStructure?: boolean; showElectrical?: boolean;
  interactive: boolean; selected: EquipmentPick | null; onSelect?: (pick: EquipmentPick) => void;
};
type Part = "frame" | "glass" | "post" | "foot" | "rail";
function Batch({ part, props }: {part: Part; props: Props}) {
  const ref = useRef<InstancedMesh>(null);
  const support = part === "post" || part === "foot";
  const count = support ? LAND_PANEL_COUNT * 2 : LAND_PANEL_COUNT;
  const geometry = useMemo(() => new BoxGeometry(...({frame:[1.08,.065,1.6],glass:[1,.012,1.51],post:[.065,1.18,.065],foot:[.24,.28,.24],rail:[1.18,.045,.07]}[part] as [number,number,number])), [part]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useLayoutEffect(() => {
    const object = new Object3D();
    const color = new Color();
    for (let i=0; i<count; i++) {
      const panel = landPanel(support ? Math.floor(i/2) : i);
      const dz = support ? (i%2 ? .53 : -.53) : 0;
      object.position.set(panel.x, panel.y, panel.z);
      object.rotation.set(-.25,0,0);
      if (part === "glass") object.position.y += .043;
      if (part === "rail") object.position.y -= .11;
      if (support) {
        const ground = terrainHeight(panel.x,panel.z+dz);
        object.position.set(panel.x,ground+(part === "foot" ? -.02 : .54),panel.z+dz);
        object.rotation.set(0,0,0);
        object.scale.set(1,part === "post" ? (dz > 0 ? 1.2 : .98) : 1,1);
      } else object.scale.set(1,1,1);
      object.updateMatrix(); ref.current!.setMatrixAt(i,object.matrix);
      const active = (props.selected?.kind === "row" && props.selected.index === panel.row) || (props.selected?.kind === "structure" && support);
      color.set(active ? "#20c8bd" : part === "glass" ? "#174b73" : part === "foot" ? "#92928b" : "#aab8c1");
      ref.current!.setColorAt(i,color);
    }
    ref.current!.instanceMatrix.needsUpdate = true;
    if(ref.current!.instanceColor) ref.current!.instanceColor.needsUpdate=true;
    ref.current!.computeBoundingSphere();
  }, [part, count, props.selected]);
  const click = (event: ThreeEvent<MouseEvent>) => {
    if(!props.interactive || event.instanceId === undefined) return;
    event.stopPropagation();
    const panel = landPanel(support ? Math.floor(event.instanceId/2) : event.instanceId);
    props.onSelect?.({kind: support || part === "rail" ? "structure" : "row", index:panel.row});
  };
  return <instancedMesh ref={ref} args={[geometry,undefined,count]} onClick={click} castShadow receiveShadow>
    <meshStandardMaterial metalness={part === "foot" ? 0 : .65} roughness={part === "glass" ? .18 : .5} />
  </instancedMesh>;
}

export function LandFarm(props: Props) {
  const terrain = useMemo(() => {
    const geo = new PlaneGeometry(30,25,50,42); geo.rotateX(-Math.PI/2);
    const positions=geo.attributes.position;
    for(let i=0;i<positions.count;i++) positions.setY(i,terrainHeight(positions.getX(i),positions.getZ(i)));
    geo.computeVertexNormals(); return geo;
  }, []);
  useEffect(()=>()=>terrain.dispose(),[terrain]);
  const pick = (kind: EquipmentPick["kind"], index=0) => (e: ThreeEvent<MouseEvent>) => {
    if(!props.interactive) return; e.stopPropagation(); props.onSelect?.({kind,index});
  };
  const glowing = (kind: EquipmentPick["kind"],index=0) => props.selected?.kind===kind && props.selected.index===index ? "#20c8bd" : "#000000";
  const stationY=terrainHeight(12,8);
  return <group>
    <mesh geometry={terrain} receiveShadow><meshStandardMaterial color="#63705a" roughness={1} transparent={props.showWires} opacity={props.showWires ? .4 : 1} depthWrite={!props.showWires} side={2} /></mesh>
    <BoxMesh args={[30,.18,25]} position={[0,-.22,0]} color="#39443e" />
    <BoxMesh args={[2.1,.12,22]} position={[11,terrainHeight(11,0)+.15,0]} color="#b6ae94" />
    <BoxMesh args={[25,.12,1.4]} position={[-.5,terrainHeight(0,10)+.15,10]} color="#b6ae94" />
    {props.showPanels && <><Batch part="frame" props={props}/><Batch part="glass" props={props}/></>}
    {props.showStructure !== false && <><Batch part="post" props={props}/><Batch part="foot" props={props}/><Batch part="rail" props={props}/></>}
    {props.showElectrical !== false && <group>
      {[0,1,2,3].map(i=>{
        const z=-6+i*4.5, y=terrainHeight(10,z);
        return <group key={i} position={[10,y,z]} onClick={pick("inverter",i)}>
          <BoxMesh args={[.9,.2,1.1]} position={[0,.1,0]} color="#969e98" />
          <BoxMesh args={[.06,1.5,.06]} position={[-.28,.85,0]} color="#a2b2b8" metalness={.7}/>
          <mesh position={[0,1.1,0]} castShadow><boxGeometry args={[.7,.85,.35]}/><meshStandardMaterial color="#d9e2e0" metalness={.5} roughness={.35} emissive={glowing("inverter",i)} emissiveIntensity={.4}/></mesh>
          <BoxMesh args={[.24,.12,.03]} position={[0,1.3,.19]} color="#143341" />
        </group>;
      })}
      <group position={[12,stationY,8]}>
        <BoxMesh args={[3.6,.22,3.4]} position={[0,.12,0]} color="#9c9f98" />
        <mesh position={[0,1,0]} castShadow onClick={pick("transformer")}><boxGeometry args={[2,1.7,1.8]}/><meshStandardMaterial color="#81928b" emissive={glowing("transformer")} emissiveIntensity={.4} metalness={.4} roughness={.5}/></mesh>
        <BoxMesh args={[2.35,.12,2.1]} position={[0,1.93,0]} color="#344e56" metalness={.65}/>
        {Array.from({length:8},(_,i)=><BoxMesh key={i} args={[.06,1.05,.13]} position={[-.75+i*.21,1,.97]} color="#415b60" metalness={.6}/>)}
        <mesh position={[-1.35,.8,0]} onClick={pick("ac")} castShadow><boxGeometry args={[.5,1.3,.7]}/><meshStandardMaterial color="#a3b1b5" emissive={glowing("ac")} emissiveIntensity={.4}/></mesh>
      </group>
      <mesh position={[9,terrainHeight(9,7)+.6,7]} castShadow onClick={pick("dc")}><boxGeometry args={[.65,1.1,.4]}/><meshStandardMaterial color="#9baeb5" emissive={glowing("dc")} emissiveIntensity={.4}/></mesh>
    </group>}
    {props.showWires && <group>
      {Array.from({length:LAND_ROWS},(_,r)=>{
        const z=-8+r*2.25;
        return <Line key={r} points={[[-10,terrainHeight(-10,z)-.3,z],[9,terrainHeight(9,z)-.3,z],[9,terrainHeight(9,7)-.3,7]]} color={props.selected?.kind === "cable" ? "#fff1b0" : "#eda954"} lineWidth={2} onClick={pick("cable")} />;
      })}
      <Line points={[[10,terrainHeight(10,-7)-.25,-7],[10,terrainHeight(10,8)-.25,8],[12,stationY-.25,8],[12,stationY+.5,8]]} color="#20c8bd" lineWidth={3} onClick={pick("cable")} />
    </group>}
    {Array.from({length:24},(_,i)=><BoxMesh key={i} args={[.04,.8,.04]} position={[-14+i*1.2,terrainHeight(-14+i*1.2,-11)+.4,-11]} color="#8b9b93" metalness={.5}/>)}
    <Line points={Array.from({length:24},(_,i)=>[-14+i*1.2,terrainHeight(-14+i*1.2,-11)+.8,-11] as [number,number,number])} color="#748b81" lineWidth={1}/>
  </group>;
}
