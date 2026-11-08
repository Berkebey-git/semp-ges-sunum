import { useState } from "react";
import { GesCanvas } from "../../scene/LazyGesCanvas";
import { EvidenceChip } from "../../shared/EvidenceChip";
import { scrollToSection } from "../../app/usePresentationNav";
import { SECTIONS } from "../../data/content";
import type { SiteMode } from "../../data/types";
import type { EquipmentPick } from "../../scene/types";

const SITES: { id: SiteMode; label: string }[] = [
  { id: "roof", label: "Çatı" }, { id: "land", label: "Arazi" }, { id: "float", label: "Yüzer" },
];
export function HeroSection({ lowPower }: { lowPower: boolean }) {
  const [mode, setMode] = useState<SiteMode>("roof");
  const [view, setView] = useState(0);
  const [selected, setSelected] = useState<EquipmentPick | null>(null);
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">SEMP İNŞAAT / STRATEJİ & MÜHENDİSLİK</div>
            <h1 id="hero-heading">Güneş enerjisinde<br /><span>yeni bir ufuk.</span></h1>
            <p className="hero-question">Bu pazara nasıl girmeliyiz?</p>
            <p className="desc">Fırsatı anlayın. İş modelini belirleyin. Teknik ve finansal kararları aynı masada değerlendirin.</p>
            <div className="actions">
              <button className="btn primary" type="button" onClick={() => scrollToSection("vizyon")}>Sunumu başlat ↗</button>
              <button className="btn" type="button" onClick={() => scrollToSection("teknik")}>3D teknik laboratuvar →</button>
            </div>
            <div className="hero-meta">
              <div className="metric"><b>28.222 <small>MW</small></b><span>Türkiye güneş kurulu gücü</span></div>
              <div className="metric"><b>%22,2</b><span>Toplam kurulu güçteki pay</span></div>
            </div>
            <div className="hero-evidence"><span>Rapora göre · Eylül 2026</span><EvidenceChip evidence={{ file: "B04", page: "s.2", date: "Eylül 2026", status: "resmi_kaynakli" }} /></div>
          </div>
          <div className="hero-stage">
            <div className="scene" aria-label="Sürüklenerek döndürülebilen temsili GES modeli">
              <GesCanvas key={view} hero mode={mode} sunAngle={45} showPanels showWires interactive selected={selected} onSelect={setSelected} lowPower={lowPower} />
            </div>
            <div className="hero-scene-heading"><span className="live-dot" /> ETKİLEŞİMLİ SANTRAL <span>3D / KONSEPT</span></div>
            <div className="hero-scene-toolbar" role="group" aria-label="Ana ekran saha seçimi">
              {SITES.map(site => <button type="button" key={site.id} className={mode === site.id ? "chip selected" : "chip"} aria-pressed={mode === site.id} onClick={() => { setMode(site.id); setSelected(null); }}>{site.label}</button>)}
              <button type="button" className="chip reset-view" onClick={() => setView(v => v + 1)} aria-label="3D görünümü sıfırla">↺ Görünüm</button>
            </div>
            <div className="hero-scene-caption" aria-live="polite">
              <strong>{selected ? (selected.kind === "panel" ? `PV modülü #${selected.index + 1} seçildi` : selected.kind === "inverter" ? "İnverter seçildi" : "Ekipman seçildi") : "Sahayı kendi açınızdan keşfedin."}</strong>
              <span>Sürükle: döndür · Tekerlek: yakınlaş · Ekipmana tıkla</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom"><span>YÖNETİM KARAR YOLCULUĞU</span><span>3D geometri temsilidir · Üretim simülasyonu değildir</span></div>
        <nav className="chapter-strip" aria-label="Sunum yolculuğu">
          {SECTIONS.map((section, index) => <button type="button" key={section.id} onClick={() => scrollToSection(section.id)}><span>0{index + 1}</span><b>{section.label}</b><i aria-hidden>↗</i></button>)}
        </nav>
      </div>
    </section>
  );
}
