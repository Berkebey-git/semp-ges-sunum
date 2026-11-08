import { useCallback, useEffect, useState } from "react";

export function useFullscreen() {
  const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement));
  const [error, setError] = useState("");
  const toggle = useCallback(async () => {
    setError("");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        if (!document.fullscreenElement) setError("Bu ortam tam ekrana geçişi tamamlamadı. Sunumu normal tarayıcı penceresinde açarak yeniden deneyin.");
      } else setError("Bu tarayıcı tam ekranı desteklemiyor.");
    } catch {
      setError("Tam ekran açılamadı. Tarayıcı izinlerini kontrol edin.");
    }
  }, []);
  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    const key = (e: KeyboardEvent) => {
      const target=e.target as HTMLElement | null;
      if(e.key.toLowerCase()!=="f" || e.ctrlKey || e.metaKey || e.altKey || e.repeat || target?.isContentEditable || ["INPUT","TEXTAREA","SELECT"].includes(target?.tagName??"")) return;
      e.preventDefault(); void toggle();
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("fullscreenchange",sync); document.removeEventListener("keydown",key); };
  }, [toggle]);
  return { fullscreen, error, toggle };
}
