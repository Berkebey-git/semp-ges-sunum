import { useFullscreen } from "./useFullscreen";
import { SECTIONS } from "../data/content";
import type { SectionId } from "../data/types";

type PresentationNavProps = {
  active: SectionId;
  onGo: (id: SectionId) => void;
  lowPower: boolean;
  onLowPower: (value: boolean) => void;
};

export function PresentationNav({
  active,
  onGo,
  lowPower,
  onLowPower,
}: PresentationNavProps) {
  const { fullscreen, error, toggle } = useFullscreen();
  const index = SECTIONS.findIndex(section => section.id === active);

  return (
    <header className="topbar">
      <div className="shell topbar-inner">
        <div className="logo">
          <div className="logo-mark" aria-hidden>
            ✦
          </div>
          <div>
            SEMP
            <small>İNŞAAT • ENERJİ DÖNÜŞÜMÜ</small>
          </div>
        </div>
        <nav className="tabs" aria-label="Sunum bölümleri">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className={active === section.id ? "tab active" : "tab"}
              aria-current={active === section.id ? "step" : undefined}
              onClick={() => onGo(section.id)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button
            type="button"
            className={lowPower ? "chip selected" : "chip"}
            aria-pressed={lowPower}
            onClick={() => onLowPower(!lowPower)}
          >
            Düşük donanım
          </button>
          <button type="button" className="chip" aria-pressed={fullscreen} onClick={() => void toggle()}>
            {fullscreen ? "Tam ekrandan çık" : "Sunum modu ⛶"}
          </button>
          <span className="nav-progress">{String(index + 1).padStart(2, "0")} <span>/ 06</span></span>
<button className="chip nav-arrow" type="button" aria-label="Önceki bölüm" disabled={index === 0} onClick={() => onGo(SECTIONS[index - 1].id)}>←</button>
<button className="chip nav-arrow" type="button" aria-label="Sonraki bölüm" disabled={index === SECTIONS.length - 1} onClick={() => onGo(SECTIONS[index + 1].id)}>→</button>
        </div>
      </div>
      {error && <div className="fullscreen-error" role="status">{error}</div>}
    </header>
  );
}
