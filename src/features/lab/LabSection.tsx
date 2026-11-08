import { useProject } from "../../app/ProjectContext";
import { EquipmentComparison } from "../equipment/EquipmentComparison";
import { EnergyScenario } from "./EnergyScenario";
import { LAND_PANEL_COUNT } from "../../scene/landLayout";
import { useMemo, useState } from "react";
import { siteCopy } from "../../data/content";
import type { SiteMode } from "../../data/types";
import { EvidenceChip } from "../../shared/EvidenceChip";
import { SectionHead } from "../../shared/SectionHead";
import { GesCanvas } from "../../scene/LazyGesCanvas";
import { PANEL_COUNT } from "../../scene/modelCounts";
import type { EquipmentPick } from "../../scene/types";

const MODES: { id: SiteMode; label: string }[] = [
  { id: "roof", label: "Çatı GES" },
  { id: "land", label: "Arazi GES" },
  { id: "float", label: "Yüzer GES" },
];

export function LabSection({ lowPower }: { lowPower: boolean }) {
  const [animateWater, setAnimateWater] = useState(true);
  const [landWires, setLandWires] = useState(false);
  const [showStructure, setShowStructure] = useState(true);
  const [showElectrical, setShowElectrical] = useState(true);
  const [hour, setHour] = useState(12);
  const [night, setNight] = useState(false);
  const [resetView, setResetView] = useState(0);
  const {mode,setMode}=useProject();
  const sunAngle = 45;
  const [showPanels, setShowPanels] = useState(true);
  const [showWires, setShowWires] = useState(true);
  const [selected, setSelected] = useState<EquipmentPick | null>(null);

  const visibleWires = mode === "land" ? landWires : showWires;
  const isNight = night || hour <= 6 || hour >= 18;
  const copy = siteCopy[mode];
  const info = useMemo(() => {
    if (!selected) return "Bir PV panele veya inverter kutusuna tıklayarak inceleyebilirsiniz.";
    if (["platform","anchor","shore","floatingCable"].includes(selected.kind)) return "Yüzer ekipman açıklaması sahnede açıldı; su seviyesi ve yükler gerçek verilerle doğrulanmalıdır (B07 / s.2).";
    if (["row", "structure", "transformer", "cable"].includes(selected.kind)) return "Seçilen arazi bileşeninin açıklaması sahnede açıldı. Yerleşim ve boyutlar temsilidir (B10 / s.2–3).";
    if (selected.kind === "dc" || selected.kind === "ac") return "Seçilen koruma panosunun teknik açıklaması sahnede açıldı (B10 / s.2).";
    if (selected.kind === "inverter") {
      return "String inverter (temsili). DC’yi AC’ye çevirir; koruma ve şebeke koşulları proje bazında boyutlandırılır (B10 / s.3; B16 / s.2).";
    }
    return `PV modülü #${selected.index + 1} seçildi. Bu görselleştirme temsili bir modül kullanır. Gerçek boyut, güç ve Voc/Isc değerleri üretici veri sayfasından doğrulanmalıdır (B10 / s.3; B11 / s.2–3).`;
  }, [selected]);

  return (
    <section className="section" id="teknik">
      <div className="shell">
        <SectionHead
          eyebrow="03 / 3D teknik laboratuvar"
          title="Santrali yakından inceleyin."
          lede="Üç sahayı seçin, panel dizilimini görün, güneş açısını değiştirin. Model eğitim amaçlıdır: gerçek üretim, gölgelenme veya statik hesabı yapmaz."
          refs="B07–B12 · B16"
        />
        <div className="interactive-layout">
          <div className="glass lab-stage">
            <div className="mini-scene">
              <GesCanvas
                hour={hour}
                night={night}
                animateWater={animateWater}
                resetView={resetView}
                mode={mode}
                sunAngle={sunAngle}
                showPanels={showPanels}
                showWires={visibleWires}
                showStructure={showStructure}
                showElectrical={showElectrical}
                interactive
                selected={selected}
                onSelect={setSelected}
                lowPower={lowPower}
              />
            </div>
            <div className="lab-toolbar">
              <div className="model-control" role="group" aria-label="Santral tipi">
                {MODES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={mode === item.id ? "chip selected" : "chip"}
                    onClick={() => {
                      setMode(item.id);
                      setSelected(null);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
<button className="chip" type="button" onClick={() => setResetView(v => v + 1)}>↺ Görünümü sıfırla</button>
              <button className="chip" type="button" onClick={()=>document.getElementById("ekipman")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth"})}>Ekipman kıyası ↓</button>
              <button className="chip" type="button" onClick={()=>document.getElementById("enerji-senaryosu")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth"})}>Enerji hesabına geç ↓</button>
            </div>
          </div>
          <div className="glass">
            <div className="badge-soft">Etkileşimli model • demo</div>
            <h3 className="model-title">{copy.title}</h3>
            <p>{copy.desc}</p>
            <EvidenceChip evidence={copy.evidence} />
            <hr className="divider" />
            <div className="roof-controls">
              <div className="model-control" role="group" aria-label="Aydınlatma modu">
                <button type="button" className={!isNight ? "chip selected" : "chip"} aria-pressed={!isNight} onClick={() => { setNight(false); if(hour <= 6 || hour >= 18) setHour(12); }}>☀ Gündüz</button>
                <button type="button" className={isNight ? "chip selected" : "chip"} aria-pressed={isNight} onClick={() => setNight(true)}>☾ Gece</button>
              </div>
              <div className="form-row"><label htmlFor="roofHour">Görsel saat</label><output htmlFor="roofHour">{String(Math.floor(hour)).padStart(2,"0")}:{hour % 1 ? "30" : "00"}</output></div>
              <input id="roofHour" className="range" type="range" min={0} max={23.5} step={.5} value={hour} onChange={e => { setHour(Number(e.target.value)); setNight(false); }} />
              <p className="small-note">Konum ve tarih içermeyen temsili güneş yolu. Saat ve gölgeler üretim tahmini değildir. Düşük donanım modunda gölgeler kapalıdır.</p>
              <div className="model-control" role="group" aria-label="Sahne ekipmanlarını seç">
                {(mode === "float" ? ([{kind:"panel",label:"PV modülü"},{kind:"platform",label:"Platform"},{kind:"anchor",label:"Ankraj"},{kind:"shore",label:"Kıyı bağlantısı"},{kind:"inverter",label:"İnverter"},{kind:"floatingCable",label:"Yüzer kablo"},{kind:"ac",label:"AC pano"}] as const) : mode === "land" ? ([{kind:"row",label:"Panel sırası"},{kind:"structure",label:"Konstrüksiyon"},{kind:"inverter",label:"İnverter"},{kind:"transformer",label:"Trafo"},{kind:"dc",label:"DC pano"},{kind:"ac",label:"AC pano"},{kind:"cable",label:"Yeraltı kabloları"}] as const) : ([{ kind: "panel", label: "PV modülü" }, { kind: "inverter", label: "İnverter" }, { kind: "dc", label: "DC pano" }, { kind: "ac", label: "AC pano" }] as const)).map(item => <button key={item.kind} type="button" className={selected?.kind === item.kind ? "chip selected" : "chip"} aria-pressed={selected?.kind === item.kind} disabled={((item.kind === "panel" || item.kind === "row") && !showPanels) || (item.kind === "structure" && !showStructure) || ((item.kind === "cable" || item.kind === "floatingCable") && !visibleWires) || (["inverter","transformer","dc","ac"].includes(item.kind) && mode === "land" && !showElectrical)} onClick={() => { setSelected({kind: item.kind, index: 0}); }}>{item.label}</button>)}
              </div>
              <p className="small-note">Turuncu: DC kablo · Turkuaz: AC kablo. Güzergâhlar temsilidir.</p>
            </div>
            <div className="controls">
              {mode === "land" && <>
                <div className="form-row"><label htmlFor="landStructure">Konstrüksiyon ve temeller</label><input id="landStructure" type="checkbox" checked={showStructure} onChange={e=>{setShowStructure(e.target.checked); if(selected?.kind === "structure") setSelected(null);}} /></div>
                <div className="form-row"><label htmlFor="landElectrical">İnverter, panolar ve trafo</label><input id="landElectrical" type="checkbox" checked={showElectrical} onChange={e=>{setShowElectrical(e.target.checked); if(selected && ["inverter","dc","ac","transformer"].includes(selected.kind)) setSelected(null);}} /></div>
                <p className="small-note">Kablo katmanı açıkken zemin saydamlaşır: yeraltı kesit gösterimi. Topografya ölçülmüş saha verisi değildir.</p>
              </>}
              {mode === "float" && <div className="form-row"><label htmlFor="waterMotion">Su ve platform hareketi</label><input id="waterMotion" type="checkbox" checked={animateWater} onChange={e=>setAnimateWater(e.target.checked)}/></div>}
              {mode === "float" && <p className="small-note">Dalga ve yansımalar görseldir; hidrodinamik hesap değildir. Hareket, düşük donanımda ve azaltılmış hareket tercihinde durur.</p>}
              <div className="form-row">
                <label htmlFor="panelToggle">PV dizisini göster</label>
                <input
                  id="panelToggle"
                  type="checkbox"
                  checked={showPanels}
                  onChange={(event) => { setShowPanels(event.target.checked); if (!event.target.checked && (selected?.kind === "panel" || selected?.kind === "row")) setSelected(null); }}
                />
              </div>
              <div className="form-row">
                <label htmlFor="wireToggle">Kablo güzergâhlarını göster</label>
                <input
                  id="wireToggle"
                  type="checkbox"
                  checked={visibleWires}
                  onChange={(event) => { if(mode === "land") setLandWires(event.target.checked); else setShowWires(event.target.checked); if(selected?.kind === "cable" || selected?.kind === "floatingCable") setSelected(null); }}
                />
              </div>
            </div>
            <p className="sideinfo">{info}</p>
            <div className="result-grid">
              <div className="statbox">
                <span className="value">{mode === "land" ? LAND_PANEL_COUNT : PANEL_COUNT}</span>
                <span className="label">Görseldeki temsili panel</span>
              </div>
              <div className="statbox">
                <span className="value">3</span>
                <span className="label">İncelenen saha tipi</span>
              </div>
            </div>
            <div className="alert">
              Bu modeller örnek konsepttir. Boyutlandırma, panel verimi, rüzgâr/kar yükü ve şebeke
              bağlantısı yetkili mühendislerce gerçek saha verisiyle hesaplanmalıdır.
            </div>
          </div>
        </div>
        <EquipmentComparison />
        <EnergyScenario mode={mode} onMode={next=>{setMode(next);setSelected(null);}} />
      </div>
    </section>
  );
}
