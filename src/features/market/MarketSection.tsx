import { marketKpis } from "../../data/content";
import { EvidenceChip } from "../../shared/EvidenceChip";
import { SectionHead } from "../../shared/SectionHead";

export function MarketSection() {
  return (
    <section className="section" id="vizyon">
      <div className="shell">
        <SectionHead
          eyebrow="01 / Pazar görünümü"
          title="Neden güneş enerjisi?"
          lede="Araştırmadaki pazar ölçeği, SEMP İnşaat için mühendislik, EPC ve bakım odaklı giriş seçeneklerini değerlendirme zemini sunar; satış veya şirket yetkinliği kanıtı değildir."
          refs="B04 · B19 · B20"
        />
        <div className="grid grid3">
          {marketKpis.map((kpi) => (
            <article className="glass" key={kpi.title}>
              <div className="card-index">{kpi.index}</div>
              <div className="kpi">{kpi.value}</div>
              <h3>{kpi.title}</h3>
              <p>{kpi.text}</p>
              <EvidenceChip evidence={kpi.evidence} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
