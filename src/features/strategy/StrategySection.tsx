import { GovernanceSection } from "../governance/GovernanceSection";
import { businessModels, decisionGates, riskLimits } from "../../data/content";
import { EvidenceChip } from "../../shared/EvidenceChip";
import { SectionHead } from "../../shared/SectionHead";
import { scrollToSection } from "../../app/usePresentationNav";

export function StrategySection() {
  return (
    <section className="section" id="strateji">
      <div className="shell">
        <SectionHead
          eyebrow="02 / Şirketin sektöre girişi"
          title="Hangi iş modeliyle başlayacağız?"
          lede="Kontrollü başlangıç: mühendislik ve EPC koordinasyonu, ardından tekrarlayan işletme-bakım gelirleri. Büyük öz yatırımlar ayrı karar gerektirir."
          refs="B01–B06 · B15 · B20"
        />
        <nav className="governance-shortcuts" aria-label="Strateji alt bölümleri"><a href="#hukuk-izin">Hukuk ve izin haritası ↗</a><a href="#epc-akisi">EPC proje akışı ↗</a></nav>
        <div className="grid grid4">
          {businessModels.map((model) => (
            <article
              className="glass chapter-card"
              key={model.title}
              onClick={() => scrollToSection(model.target)}
              onKeyDown={(event) => {
                if (event.key === "Enter") scrollToSection(model.target);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="card-index">{model.index}</div>
              <h3>{model.title}</h3>
              <p>{model.text}</p>
              <span className="card-link">İncele ↗</span>
            </article>
          ))}
        </div>
        <div className="two-col" style={{ marginTop: 22 }}>
          <div className="glass">
            <h3>İlk iş için karar kapıları</h3>
            <div className="steps">
              {decisionGates.map((gate) => (
                <div className="step" key={gate.code}>
                  <i>{gate.code}</i>
                  <b>{gate.title}</b>
                  <span>{gate.text}</span>
                </div>
              ))}
            </div>
            <EvidenceChip
              evidence={{ file: "B05", page: "s.2–3", status: "yonetim_onerisi" }}
            />
          </div>
          <div className="glass">
            <h3>Başlangıçta kaçınacağımız riskler</h3>
            <p style={{ marginBottom: 18 }}>
              Bu sınırlar araştırma belgelerinde tekrar eden yönetim kontrol önerileridir.
            </p>
            <div className="steps">
              {riskLimits.map((risk) => (
                <div className="step" key={risk.title}>
                  <i>!</i>
                  <b>{risk.title}</b>
                  <span>{risk.text}</span>
                </div>
              ))}
            </div>
            <EvidenceChip
              evidence={{ file: "B13", page: "s.1", status: "yonetim_onerisi" }}
            />
          </div>
        </div>
        <GovernanceSection />
      </div>
    </section>
  );
}
