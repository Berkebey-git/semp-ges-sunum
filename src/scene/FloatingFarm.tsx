import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { BackSide, Group, InstancedMesh, MeshPhysicalMaterial, Object3D, PlaneGeometry } from "three";
import { Environment, Line } from "@react-three/drei";
import { SolarPanel } from "./SolarPanel";
import { BoxMesh } from "./BoxMesh";
import type { EquipmentPick } from "./types";

type Props={showPanels:boolean;showWires:boolean;interactive:boolean;selected:EquipmentPick|null;onSelect?:(pick:EquipmentPick)=>void;animateWater?:boolean;lowPower?:boolean};
const PLATFORMS=Array.from({length:24},(_,i)=>({x:-3.5+i%6*1.25,z:-2.6+Math.floor(i/6)*1.7}));
function Water({active,lowPower}:{active:boolean;lowPower:boolean}) {
  const time=useMemo(()=>({value:0}),[]);
  const geometry=useMemo(()=>{const geo=new PlaneGeometry(24,17,lowPower?20:60,lowPower?16:45);geo.rotateX(-Math.PI/2);return geo;},[lowPower]);
  const material=useMemo(()=>{
    const mat=new MeshPhysicalMaterial({color:"#126077",metalness:.35,roughness:.2,clearcoat:1,clearcoatRoughness:.15,transparent:true,opacity:.87,depthWrite:false,envMapIntensity:1});
    mat.onBeforeCompile=shader=>{
      shader.uniforms.uWaterTime=time;
      shader.vertexShader="uniform float uWaterTime;\n"+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>\n transformed.y += .055*sin(position.x*1.7+uWaterTime*.8)+.035*cos(position.z*2.2+uWaterTime*.6);");
      shader.vertexShader=shader.vertexShader.replace("#include <beginnormal_vertex>","#include <beginnormal_vertex>\n objectNormal=normalize(vec3(-.0935*cos(position.x*1.7+uWaterTime*.8),1.0,.077*sin(position.z*2.2+uWaterTime*.6)));");
    };
    mat.customProgramCacheKey=()=>"semp-water-v1";return mat;
  },[time]);
  useEffect(()=>()=>{geometry.dispose();},[geometry]);
  useEffect(()=>()=>material.dispose(),[material]);
  useFrame((state,delta)=>{if(active){time.value+=Math.min(delta,.05);state.invalidate();}});
  return <mesh geometry={geometry} material={material} receiveShadow position={[0,-.03,0]}/>;
}
function Pontoons({props}:{props:Props}) {
  const ref=useRef<InstancedMesh>(null);
  useLayoutEffect(()=>{
    const obj=new Object3D();PLATFORMS.forEach((p,i)=>{obj.position.set(p.x,.18,p.z);obj.updateMatrix();ref.current!.setMatrixAt(i,obj.matrix);});ref.current!.instanceMatrix.needsUpdate=true;ref.current!.computeBoundingSphere();
  },[]);
  return <instancedMesh ref={ref} args={[undefined,undefined,24]} castShadow receiveShadow onClick={e=>{if(props.interactive&&e.instanceId!==undefined){e.stopPropagation();props.onSelect?.({kind:"platform",index:e.instanceId});}}}>
    <boxGeometry args={[1.16,.27,1.6]}/><meshStandardMaterial color={props.selected?.kind==="platform"?"#20c8bd":"#91b7b9"} metalness={.05} roughness={.55}/>
  </instancedMesh>;
}
export function FloatingFarm(props:Props) {
  const island=useRef<Group>(null);
  const time=useRef(0);
  useFrame((_,delta)=>{if(props.animateWater&&island.current){time.current+=Math.min(delta,.05);island.current.position.y=Math.sin(time.current*.7)*.018;island.current.rotation.z=Math.sin(time.current*.45)*.002;}});
  useEffect(()=>{if(!props.animateWater&&island.current){island.current.position.y=0;island.current.rotation.z=0;}},[props.animateWater]);
  const pick=(kind:EquipmentPick["kind"],index=0)=>(e:ThreeEvent<MouseEvent>)=>{if(props.interactive){e.stopPropagation();props.onSelect?.({kind,index});}};
  return <group>
    <Environment resolution={64} frames={1}>
      <mesh scale={40}><sphereGeometry args={[1,24,16]}/><meshBasicMaterial color="#264b65" side={BackSide}/></mesh>
      <mesh position={[0,15,-8]} rotation={[Math.PI/4,0,0]}><boxGeometry args={[22,.1,12]}/><meshBasicMaterial color="#b1d7e1"/></mesh>
    </Environment>
    <BoxMesh args={[24,.3,17]} position={[0,-1.35,0]} color="#203f46"/>
    <Water active={props.animateWater??false} lowPower={props.lowPower??false}/>
    <BoxMesh args={[3.7,1.5,11]} position={[10.2,-.25,0]} color="#686d5c"/>
    <BoxMesh args={[3.8,.1,11.1]} position={[10.2,.54,0]} color="#939784"/>
    <BoxMesh args={[1.4,.16,2]} position={[8.5,.6,0]} color="#9ba5a0"/>
    <group ref={island}>
      <Pontoons props={props}/>
      {PLATFORMS.map((p,i)=><group key={i}>
        <BoxMesh args={[.05,.17,1.35]} position={[p.x-.38,.36,p.z]} color="#a9b6be" metalness={.7}/>
        <BoxMesh args={[.05,.17,1.35]} position={[p.x+.38,.36,p.z]} color="#a9b6be" metalness={.7}/>
        {props.showPanels&&<SolarPanel detailed index={i} position={[p.x,.53,p.z]} tilt={-.12} interactive={props.interactive} selected={props.selected?.kind==="panel"&&props.selected.index===i} onSelect={props.onSelect}/>}
      </group>)}
      {[-3.5,-1.8,-.1,1.6,3.1].map(z=><BoxMesh key={z} args={[8.3,.1,.18]} position={[-.3,.25,z]} color="#6e8f95"/>)}
      <BoxMesh args={[1.05,.13,7.7]} position={[4.25,.28,0]} color="#7b9294" metalness={.5}/>
    </group>
    <group onClick={pick("shore")}>
      <BoxMesh args={[3.8,.15,.9]} position={[6.6,.48,0]} color="#a5b7bd" metalness={.6}/>
      {[-.46,.46].map(z=><Line key={z} points={[[4.7,.9,z],[8.5,1.1,z]]} color="#b6c9c9" lineWidth={1.8}/>)}
    </group>
    {[[-4.4,-3.6],[4,-3.6],[-4.4,3.7],[4,3.7]].map(([x,z],i)=><group key={i} onClick={pick("anchor",i)}>
      <Line points={[[x,.2,z],[x*1.6,-1.05,z*1.65]]} color={props.selected?.kind==="anchor"?"#ffd38c":"#a8b4a7"} lineWidth={2.5}/>
      <BoxMesh args={[.7,.35,.7]} position={[x*1.6,-1.05,z*1.65]} color="#8b9189"/>
      <mesh position={[x,.16,z]} castShadow><sphereGeometry args={[.14,12,8]}/><meshStandardMaterial color="#e4ac65"/></mesh>
    </group>)}
    <group onClick={pick("inverter")}>
      <BoxMesh args={[1.8,.2,1.4]} position={[10.1,.7,1.8]} color="#a8ada5"/>
      <mesh position={[10.1,1.4,1.8]} castShadow><boxGeometry args={[1.2,1.2,.65]}/><meshStandardMaterial color="#c7d4d7" metalness={.5} roughness={.35} emissive={props.selected?.kind==="inverter"?"#20c8bd":"#000000"} emissiveIntensity={.3}/></mesh>
      <BoxMesh args={[.35,.18,.03]} position={[10.1,1.6,2.14]} color="#103e50"/>
    </group>
    <mesh position={[10.1,1.25,-1]} castShadow onClick={pick("ac")}><boxGeometry args={[.85,1.25,.65]}/><meshStandardMaterial color="#8ca3ac"/></mesh>
    {props.showWires&&<group onClick={pick("floatingCable")}>
      <Line points={[[3.4,.6,2.8],[4.3,.5,2.8],[4.3,.55,0],[6,.35,0],[7,.5,0],[8.5,.65,0],[10.1,.9,1.8]]} color="#e5a45c" lineWidth={2.8}/>
      <Line points={[[10.1,.9,1.8],[10.6,.85,1],[10.6,.85,-1],[10.1,.9,-1]]} color="#20c8bd" lineWidth={2.8}/>
    </group>}
  </group>;
}
