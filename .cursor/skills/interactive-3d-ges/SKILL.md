---
name: interactive-3d-ges
description: SEMP Grup GES projesinde Three.js, React Three Fiber, Drei kullanarak çatı, arazi, yüzer GES 3D sahneleri ve seçilebilir enerji ekipmanları oluştururken kullan.
---

# Etkileşimli 3D GES becerisi

## Teknoloji
- React + TypeScript, `@react-three/fiber`, `@react-three/drei`, Three.js; seçimi yapılmadan yeni ağır bağımlılık ekleme.
- Mevcut basit `index.html` görsellerini önce incele; işlevleri kaybetmeden modüler mimariye taşı.

## Sahne hedefi
- Çatı GES: fabrika binası, paneller, string inverter, DC/AC koruma/pano, trafonun kavramsal yerleşimi.
- Arazi GES: panel dizileri, sıra araları, inverter/trafo alanı, servis yolu.
- Yüzer GES: platform, sıra, su yüzeyi, kablo, ankraj kavramsal gösterimi.
- Her sahnede orbit, zoom, reset, etiket ve tıklanabilir bileşen ayrıntıları.
- İsteğe bağlı görsel enerji akışı animasyonu: DC modül → DC koruma → inverter → AC pano → trafo/şebeke. Enerji akışı temsilidir; hesaplanmış güç akışı değildir.

## Teknik doğruluk
- 3D geometri ve ekipman ölçekleri temsili olabilir; bunu küçük açıklamayla belirt.
- Güneş açısı görseli ışınım/üretim simülasyonu değildir. Ölçümsüz üretim garantisi verme.
- PDF 07, 09, 10, 11, 12, 16 ve 17'deki ilgili sayfaları incele. Ekipman açıklamasında `BXX/sayfa` kaynağı göster.
- Teknik yanlışları önle: AC/DC, trafo, inverter ve korumaları doğru işlevlerle tanıt.

## Performans ve etkileşim
- Yüksek maliyetli geometriyi tekilleştir/instancing kullan. Gerektiğinde LOD, gölge kalite seviyesi ve DPR adaptasyonu yap.
- 3D yüklenmezse bilgi ekranları ve finans modülü çalışmaya devam etmeli.
- İyi ışık, ambient, gerekirse yumuşak kontakt gölge, seçili nesne highlight; aşırı neon yerine gerçekçi kurumsal ton.
- Sahneler arasında geçişlerde bellek sızıntısı ve event listener birikmesi olmasın.

## Kabul kriteri
- Her sahne döndürülür ve sıfırlanır.
- En az panel ve inverter tıklanabilir; Türkçe açıklama gösterilir.
- Masaüstü ve düşük donanım için görünüm ayarı vardır.
- Vite build başarılı; tarayıcı konsolunda hatalar yoktur.
