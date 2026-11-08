import { lazy, Suspense } from "react";
import type { GesSceneProps } from "./types";
const Scene=lazy(()=>import("./GesCanvas").then(module=>({default:module.GesCanvas})));
export function GesCanvas(props:GesSceneProps & {hero?:boolean}) {return <Suspense fallback={<div className="scene-fallback" role="status">3D sahne yükleniyor…</div>}><Scene {...props}/></Suspense>}
