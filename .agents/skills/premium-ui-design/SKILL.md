---
name: premium-ui-design
description: SEMP Grup 3D GES sunumunda premium görsel tasarım, responsive 16:9 sunum, tipografi ve arayüz iyileştirmeleri yaparken kullan.
---

# Premium mühendislik sunumu tasarım becerisi

## Amaç
20 kaynak PDF'yi kalabalık bir rapora çevirmek yerine yönetim kuruluna uygun, premium, Türkçe, okunaklı bir interaktif sunum tasarla.

## Başlamadan önce
- `AGENTS.md`, `SUNUM_MIMARISI.md` ve var olan arayüzü incele; var olan işlevleri koru.
- Güncelleyeceğin ekranı ve hedef mesajını önce bir cümle ile tarif et.
- Tek görevde en fazla 1–2 ekranın görünümünü değiştir. Her değişiklik için çalışır önizleme ve hata kontrolü yap.

## Görsel tasarım sistemi
- Marka hissi: kurumsal, mühendislik odaklı, çağdaş, nefes alan, kaliteli. Küçük metinlerle dolu sunumdan kaçın.
- Başlangıç renkleri: gece laciverti `#071627`, ikinci zemin `#0D2435`, turkuaz `#20C8BD`, açık metin `#F0F6F7`, ikincil metin `#AEC2CD`, uyarı `#F4BB62`.
- Bir ekranda en fazla bir güçlü görsel odak kullan. Dekoratif parıltılar dikkat dağıtmasın.
- Büyük başlık, kısa ana mesaj, etkileşimli sahne/grafik, küçük kaynak etiketi hiyerarşisi uygula.
- 16:9 toplantı salonu görünümünü tasarımın ana ölçütü kabul et. 1920x1080 ve 1366x768'de her önemli içerik ekrana sığsın; gerektiğinde ayrıntı modal/drawer'da açılsın.
- Metin kontrastını en az WCAG AA hedefiyle kontrol et; uzun tablolar bölünmeden kaydırılmasın.
- Hafif easing, 180–350 ms geçişler; `prefers-reduced-motion` desteği. Çok sayıda sürekli animasyondan kaçın.

## Komponent fikirleri
- Hero: Türkiye pazarı / SEMP Grup stratejisi
- InteractiveControlPanel: 3D katman, görünüm ve sahne modu
- DecisionGate: risk ve izin kontrol aşamaları
- EvidenceChip: BXX/sayfa, varsayım veya resmî kaynak ayrımı
- ScenarioCompare: finansal ve teknik senaryo farkları
- PresentationNav: bölüm ilerlemesi, tam ekran, ok tuşları

## Kabul testi
- 16:9'da kırpılan tablo, kesilen cümle veya üst üste binen kart yok.
- Fare/klavye erişilebilir; kontrol etiketleri Türkçe.
- Gerçek 3D ile yalnız dekoratif arka plan ayrımı net.
- Teknik/kritik yazılar en az yeterli kontrastta.
- İlgili ekranda çıktı ekran görüntüsü incelenip gerekirse revize edilir.
