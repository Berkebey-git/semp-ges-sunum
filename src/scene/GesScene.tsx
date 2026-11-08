import type { PerspectiveCamera } from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitImpl } from "three-stdlib";
import { roofLighting } from "./roofLighting";
import { OrbitControls } from "@react-three/drei";
import { SiteModel } from "./SiteModels";
import type { GesSceneProps } from "./types";

function sunPosition(angleDeg: number): [number, number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  const radius = 9;
  return [-Math.cos(rad) * radius, Math.sin(rad) * radius, 2.5];
}

export function GesScene({
  mode,
  sunAngle,
  showPanels,
  showWires,
  showStructure, showElectrical,
  interactive,
  selected,
  onSelect,
  lowPower, animateWater,
  hour, night = false, resetView = 0,
}: GesSceneProps) {
  const lighting = roofLighting(hour ?? 12, night);
  const land = mode === "land";
  const timed = true;
  const dark = timed && lighting.night;
  const sun = timed && (hour !== undefined || land) ? lighting.position.map(v => v * (land ? 2 : 1)) as [number,number,number] : sunPosition(sunAngle);
  const controls = useRef<OrbitImpl>(null);
  const { camera, invalidate, size } = useThree();
  const baseFov = useRef((camera as PerspectiveCamera).fov);
  useEffect(() => {
    {
      const perspective = camera as PerspectiveCamera;
      // Keep the full site visible in portrait viewports without changing model geometry.
      perspective.fov = 2 * Math.atan(Math.tan(baseFov.current * Math.PI / 360) * Math.max(1, 1.2 / (size.width / Math.max(1,size.height)))) * 180 / Math.PI;
      perspective.updateProjectionMatrix();
      if (mode === "land") camera.position.set(29,25,32);
      else if(mode === "float") camera.position.set(19,14,20);
      else camera.position.set(11,9,14);
      controls.current?.target.set(0, mode === "land" ? .8 : .45, 0);
      controls.current?.update();
      invalidate();
    }
  }, [resetView, mode, camera, invalidate, size.width, size.height]);

  return (
    <>
      <color attach="background" args={[dark ? "#030a17" : mode === "roof" ? "#152b3b" : "#0b2333"]} />
      <fog attach="fog" args={[dark ? "#030a17" : mode === "roof" ? "#081825" : "#0b2333", land ? 55 : 24, land ? 110 : 52]} />
      <ambientLight color="#b9e5ff" intensity={timed ? (dark ? .22 : .8) : 1.45} />
      <hemisphereLight args={["#b7dafa", "#18222c", timed ? (dark ? .3 : 1.15) : 1.5]} />
      <directionalLight
        color={dark ? "#8eafff" : "#ffe2ac"}
        intensity={timed ? (dark ? .35 : 2.7) : 2.1}
        position={dark ? (land ? [12,22,-12] : [5,9,-5]) : sun}
        shadow-bias={-.0003}
        shadow-normalBias={.04}
        castShadow={!lowPower}
        shadow-mapSize={[lowPower ? 512 : 1024, lowPower ? 512 : 1024]}
        shadow-camera-left={land ? -25 : -15}
        shadow-camera-right={land ? 25 : 15}
        shadow-camera-top={land ? 25 : 15}
        shadow-camera-bottom={land ? -25 : -15}
      />
      <pointLight color="#ffc879" intensity={dark ? 0 : 3.5} distance={20} position={sun} />
      <mesh position={dark ? [5, 9, -5] : sun}>
        <sphereGeometry args={[0.43, 24, 16]} />
        <meshBasicMaterial color={dark ? "#bfd4ff" : "#ffd58d"} />
      </mesh>
      {mode === "roof" && <><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#112c36" roughness={1} />
      </mesh>
      <gridHelper args={[24, 24, "#176274", "#174658"]} position={[0, -0.12, 0]} /></>}
      <SiteModel
        mode={mode}
        showPanels={showPanels}
        showWires={showWires}
        animateWater={animateWater}
        lowPower={lowPower}
        showStructure={showStructure}
        showElectrical={showElectrical}
        interactive={interactive}
        selected={selected}
        onSelect={onSelect}
      />
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableDamping
        dampingFactor={0.055}
        maxPolarAngle={Math.PI / 2.06}
        minDistance={7}
        maxDistance={land ? 70 : mode === "float" ? 48 : 29}
        target={[0, land ? .8 : .45, 0]}
      />
    </>
  );
}
