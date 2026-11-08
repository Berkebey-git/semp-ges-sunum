import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SolarPanel } from "../../scene/SolarPanel";
export default function PanelPreview({dimensions}:{dimensions:number[]}) {
 return <div className="catalog-preview"><Canvas frameloop="demand" camera={{position:[2,2.8,3],fov:40}} dpr={[1,1.5]}><ambientLight intensity={1.5}/><directionalLight position={[2,4,3]} intensity={3}/><group scale={[dimensions[1]/1134,dimensions[2]/35,dimensions[0]/2278]}><SolarPanel detailed index={0} tilt={0} position={[0,0,0]} selected={false} interactive={false}/></group><OrbitControls enablePan={false} minDistance={2} maxDistance={7}/></Canvas><span>Boyut oranları katalogdan · CAD / üretici modeli değildir · Sürükleyin</span></div>;
}
