# Aşama 1 — Mimari plan (v0.2)

Hedef: `index.html` v0.1’deki çalışan sunumu silmeden Vite + React + TypeScript + React Three Fiber + Drei’ye taşımak. 20 PDF bu aşamada işlenmez; yalnız prototipte zaten kullanılan B04, B13, B19, B20 ve teknik uyarılar için B07/B09/B10 seçilir.

## Korunan özellikler

- 6 bölüm: Başlangıç, Fırsat, Strateji, 3D Sistem, Finans, Yol Haritası
- Hero ve laboratuvar 3D sahneleri (orbit, zoom, gölge)
- Çatı / arazi / yüzer GES
- Güneş yüksekliği (yalnız görsel), panel ve enerji hattı görünürlüğü
- Panele tıklama bilgisi
- Öz tüketim eğitim hesabı
- Ok tuşları, `F` tam ekran, üst menü
- `BXX / sayfa` kaynak etiketleri ve temsili hesap uyarısı

## Klasör yapısı

```
src/
  app/           sunum kabuğu, navigasyon, klavye
  features/      6 bölüm (hero, market, strategy, lab, finance, roadmap)
  scene/         R3F canvas, sahne geometrisi, panel/inverter
  data/          editoryal içerik + kaynak statüsü
  lib/           saf finans fonksiyonları
  shared/        EvidenceChip, kartlar, bölüm başlığı
  styles/        tasarım tokenları
```

v0.1 dosyası `prototip-v01.html` olarak saklanır. Vite girişi kök `index.html` olur.

## Teknik kararlar

- React 18 + `@react-three/fiber` 8 + `@react-three/drei` 9 + Three 0.170 (mevcut prototiple aynı Three hattı)
- 3D yüklenmezse metin ve finans çalışmaya devam eder (ErrorBoundary)
- Düşük donanım: gölge kapatma + DPR tavanı
- Hesaplar `lib/finance.ts` içinde test edilir; EPC kârı bu aşamada gösterilmez
- CSS tokenları: `#071627` / `#0D2435` / `#20C8BD` / `#F0F6F7`

## Bu aşamada yapılmayanlar

- Hotspot kabul akışı, marka kıyas tablosu, CRM, SCADA animasyonu
- Meteoroloji / üretim simülasyonu
- Aşama 2 (`CURSOR_ASAMA_02.md`) 3D zenginleştirmesi
