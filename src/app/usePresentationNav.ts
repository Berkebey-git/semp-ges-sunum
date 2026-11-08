import { useEffect, useState } from "react";
import { SECTIONS } from "../data/content";
import type { SectionId } from "../data/types";

export function scrollToSection(id: SectionId) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export function usePresentationNav() {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const header = document.querySelector('.topbar');
    const measure = () => document.documentElement.style.setProperty('--header-height', (header?.getBoundingClientRect().height ?? 72) + 'px');
    const resize = new ResizeObserver(measure);
    if(header) resize.observe(header);
    measure();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-22% 0px -63% 0px" },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => { observer.disconnect(); resize.disconnect(); };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || (event.target as HTMLElement)?.isContentEditable) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      event.preventDefault();
      const y = window.scrollY;
      let idx = 0;
      SECTIONS.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop < y + (document.querySelector(".topbar")?.getBoundingClientRect().height ?? 72) + 24) idx = i;
      });
      idx = Math.max(0, Math.min(SECTIONS.length - 1, idx + (event.key === "ArrowRight" ? 1 : -1)));
      scrollToSection(SECTIONS[idx].id);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return { active, go: scrollToSection };
}
