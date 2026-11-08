---
name: presentation-qa
description: SEMP Grup 3D sunumunda 16:9 okunurluk, responsive tasarım, klavye sunumu, tarayıcı testi, hataları giderme ve kaynak kontrolünü doğrularken kullan.
---

# Sunum kalite güvencesi

## Her önemli değişiklikten sonra kontrol
1. `npm run build` varsa çalıştır; TypeScript/derleme sorunlarını düzelt.
2. Varsa testleri çalıştır. Yoksa en azından kritik hesap işlevlerine test eklemeyi öner.
3. 1920x1080 ve 1366x768 görünümünde her bölümün okunurluğunu kontrol et; ayrıca 390px mobil genişliği dene.
4. Bölüm seçimi, ok tuşları, tam ekran (`F`), 3D kamera kontrolü, panel tıklaması, kontrol kaydırıcıları, finans hesaplamasını dene.
5. Önceki çalışır özelliklerde gerileme olmadığını denetle; yükleme/performans sorunlarını raporla.
6. Belge kaynak gösterimi: her somut kaynaklı sayıda BXX / sayfa; resmî veri-öneri-varsayım-şirket verisi statüsü farklı.
7. Geçişler düşük hareket tercihini ihlal etmemeli; fokus halkaları görünür olmalı.

## Sorun bulduğunda
- Kullanıcıya gözlenen sorun, neden ve çözümü kısa bildir; kodu düzelt ve testi tekrar et.
- Browser automation mevcutsa görsel ekran görüntüsü al, tablonun/kartın taşmadığını doğrula.
- GES mevzuatı veya finans varsayımıyla ilgili veri hatasını tahminle onarma; kaynakta ne yazdığını kontrol et.

## Bitiş raporu
- Çalışan özellikler
- Düzeltilen hatalar
- Test komutları ve sonuçları
- Kalan sınırlamalar
- Sonraki tek adım
