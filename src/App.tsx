import { ProjectProvider } from "./app/ProjectContext";
import { useState } from "react";
import { PresentationNav } from "./app/PresentationNav";
import { usePresentationNav } from "./app/usePresentationNav";
import { FinanceSection } from "./features/finance/FinanceSection";
import { HeroSection } from "./features/hero/HeroSection";
import { LabSection } from "./features/lab/LabSection";
import { MarketSection } from "./features/market/MarketSection";
import { RoadmapSection } from "./features/roadmap/RoadmapSection";
import { StrategySection } from "./features/strategy/StrategySection";

export default function App() {
  const { active, go } = usePresentationNav();
  const [lowPower, setLowPower] = useState(false);

  return (
    <ProjectProvider>
      <PresentationNav
        active={active}
        onGo={go}
        lowPower={lowPower}
        onLowPower={setLowPower}
      />
      <main>
        <HeroSection lowPower={lowPower} />
        <MarketSection />
        <StrategySection />
        <LabSection lowPower={lowPower} />
        <FinanceSection />
        <RoadmapSection />
      </main>
      <footer className="footer">
        <div className="shell">
          <b>SEMP İNŞAAT • GES SEKTÖRÜNE GİRİŞ</b>
          <p>
            Araştırma ve strateji platformu · 20 PDF / 289 sayfa. Şirket verileri ve
            resmî belgeler proje bazında doğrulanmalıdır. 3D çizimler ve finans hesapları yalnızca
            görsel/öğretici örneklerdir.
          </p>
          <p>Klavye: ← / → bölümler · F tam ekran. Şirket yetkileri ve proje uygunluğu ayrıca doğrulanacaktır.</p>
        </div>
      </footer>
    </ProjectProvider>
  );
}
