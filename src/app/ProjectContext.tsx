import { createContext, useContext, useState, type ReactNode } from "react";
import type { SiteMode } from "../data/types";
import { calculateEnergy, DEFAULT_ENERGY, type EnergyInputs } from "../lib/energy";
function useProjectState() {
  const [mode,setMode]=useState<SiteMode>("roof");
  const [scenarios,setScenarios]=useState<Record<SiteMode,EnergyInputs>>({roof:{...DEFAULT_ENERGY},land:{...DEFAULT_ENERGY},float:{...DEFAULT_ENERGY}});
  const [panelSelections,setPanelSelections]=useState<Record<SiteMode,{id:string;watts:number}|null>>({roof:null,land:null,float:null});
  const inputs=scenarios[mode];
  const selection=panelSelections[mode];
  const panelId=selection?.watts===inputs.panelWatts?selection.id:null;
  const setInputs=(next:EnergyInputs)=>setScenarios(prev=>({...prev,[mode]:next}));
  const applyPanel=(id:string,watts:number)=>{setPanelSelections(prev=>({...prev,[mode]:{id,watts}}));setInputs({...inputs,panelWatts:watts});};
  return {mode,setMode,inputs,setInputs,panelId,applyPanel,energy:calculateEnergy(inputs)};
}
const Context=createContext<ReturnType<typeof useProjectState>|null>(null);
export function ProjectProvider({children}:{children:ReactNode}) {const value=useProjectState();return <Context.Provider value={value}>{children}</Context.Provider>}
export function useProject(){const value=useContext(Context);if(!value)throw new Error("ProjectProvider missing");return value;}
