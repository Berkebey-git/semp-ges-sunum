import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Component, type ReactNode, Suspense } from "react";
import { GesScene } from "./GesScene";
import type { GesSceneProps } from "./types";

type GesCanvasProps = GesSceneProps & {
  hero?: boolean;
};

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="scene-fallback">
          3D sahne bu tarayıcıda başlatılamadı. WebGL desteğini kontrol edin. Metin ve finans
          bölümleri çalışmaya devam eder.
        </div>
      );
    }
    return this.props.children;
  }
}

export function GesCanvas({ hero = false, ...scene }: GesCanvasProps) {
  const host = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const device = window.matchMedia('(max-width: 700px), (pointer: coarse)');
    const size = () => setCompact(device.matches);
    size(); device.addEventListener('change', size);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches || document.hidden);
    sync(); media.addEventListener("change", sync); document.addEventListener("visibilitychange",sync);
    const observer = new IntersectionObserver(entries => setVisible(entries[0]?.isIntersecting ?? false));
    if(host.current) observer.observe(host.current);
    return () => {device.removeEventListener("change",size);observer.disconnect();media.removeEventListener("change",sync);document.removeEventListener("visibilitychange",sync);};
  }, []);
  const economical = scene.lowPower || compact;
  const motion = (scene.animateWater ?? true) && visible && !reduced && !economical;
  return (
    <div className="canvas-shell" ref={host}>
    <SceneErrorBoundary>
      <Canvas
        className="ges-canvas"
        frameloop="demand"
        dpr={economical ? [1, 1] : [1, 1.75]}
        shadows={!economical}
        gl={{ antialias: !economical, powerPreference: "low-power" }}
        camera={{
          position: hero ? [11, 8, 13] : [11, 9, 14],
          fov: hero ? 39 : 43,
          near: 0.1,
          far: 100,
        }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <GesScene {...scene} lowPower={economical} animateWater={motion} />
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
    {scene.selected && <EquipmentInfo pick={scene.selected} />}
    </div>
  );
}

const EQUIPMENT_INFO = {
  platform: { title: "Yüzer platform", text: "Şamandıra, taşıyıcı ve servis yürüyüş yolunun temsili modeli. Su seviyesi, dalga, rüzgâr, korozyon ve kaldırma kapasitesi saha özelinde doğrulanır.", source: "B07 / s.2" },
  anchor: { title: "Ankraj ve bağlama", text: "Yüzer adayı su tabanına bağlayan halat ve ağırlıklar kavramsaldır. Batimetri, zemin, su seviyesi değişimi ve dinamik yüklerle mühendislik hesabı gerekir.", source: "B07 / s.2" },
  shore: { title: "Kıyı bağlantısı", text: "Temsili servis köprüsü ve kıyı erişimi. Su yüzeyi kullanım hakkı, kıyı düzeni ve ilgili idare koşulları proje özelinde değerlendirilir.", source: "B09 / s.8" },
  floatingCable: { title: "Yüzer kablo bağlantısı", text: "Hareket payı bırakılan DC kıyı bağlantısı ve inverter sonrası AC hattı temsilidir. Kablo seçimi, mekanik koruma ve elektrik güvenliği projeyle doğrulanır.", source: "B10 / s.2" },
  row: { title: "Panel sırası", text: "Arazi üzerinde tekrarlanan temsili PV dizisi. Sıra aralığı, eğim ve yönlenme gerçek ışınım, gölgelenme ve saha verileriyle belirlenir; bu yerleşim üretim hesabı değildir.", source: "B10 / s.3" },
  structure: { title: "Taşıyıcı konstrüksiyon", text: "Metal dikme, ray ve beton temel/ankrajın kavramsal gösterimi. Temel tipi, korozyon, rüzgâr ve zemin davranışı proje özelinde doğrulanmalıdır.", source: "B10 / s.2" },
  transformer: { title: "Trafo istasyonu", text: "İnverter çıkışının şebeke bağlantı seviyesine dönüştürüldüğü temsili istasyon. Trafo, OG hücre ve koruma koordinasyonu bağlantı görüşüne göre seçilir; güç/gerilim sınıfı atanmadı.", source: "B10 / s.2" },
  cable: { title: "Yeraltı kablo güzergâhı", text: "Turuncu DC toplama, turkuaz AC bağlantı güzergâhıdır. Saydam zemin altında temsilidir; kazı derinliği, kesit, gerilim düşümü ve koruma hesabı içermez.", source: "B10 / s.2" },
  panel: { title: "PV modülü", text: "Metal çerçeve, cam yüzey ve hücre dizisi temsili olarak modellenmiştir. Güç, Voc/Isc ve sıcaklık katsayıları üreticinin model bazlı veri sayfasından doğrulanır.", source: "B10 / s.3" },
  inverter: { title: "String inverter", text: "PV dizisinden gelen DC gücü AC’ye dönüştürür. MPPT aralığı, giriş akımı ve şebeke uyumu projeye göre seçilir.", source: "B10 / s.2" },
  dc: { title: "DC koruma panosu", text: "DC toplama, ayırma ve koruma katmanının kavramsal gösterimi. Sigorta, ayırıcı ve aşırı gerilim koruması gereksinimleri projeye göre belirlenir.", source: "B10 / s.2" },
  ac: { title: "AC dağıtım panosu", text: "İnverter çıkışının AC dağıtım ve koruma katmanı. Kısa devre, seçicilik, gerilim ve ölçüm düzeni proje bazında değerlendirilir.", source: "B10 / s.2" },
};
function EquipmentInfo({ pick }: { pick: NonNullable<GesSceneProps["selected"]> }) {
  const [closed, setClosed] = React.useState(false);
  React.useEffect(() => setClosed(false), [pick]);
  const info = EQUIPMENT_INFO[pick.kind];
  if (closed) return null;
  return <aside className="equipment-popup" aria-label="Seçilen ekipman bilgisi" aria-live="polite">
    <button type="button" onClick={() => setClosed(true)} aria-label="Ekipman bilgisini kapat">×</button>
    <span>TEMSİLİ MODEL · ÜRETİCİ CAD VERİSİ DEĞİLDİR</span>
    <h4>{info.title}{(pick.kind === "panel" || pick.kind === "row" || pick.kind === "inverter") ? " #" + (pick.index + 1) : ""}</h4>
    <p>{info.text}</p><small>{info.source} · Rapora göre teknik açıklama</small>
  </aside>;
}
