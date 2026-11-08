# SEMP Grup — Yönetim toplantısı için 3D interaktif sunum mimarisi

## Hikâye
Açılışta 3D sanayi çatısı: "Şirket olarak bu pazara neden ve hangi kapsamla girmeliyiz?" Sorun → sektör fırsatı → iş modeli → izin/teknik gerçeklik → rakamlarla model → 90 gün içinde yapılacaklar → yönetim onayı.

## Bölümler ve 20 kaynak dosyasının eşleştirilmesi

| Etkileşimli bölüm | Ana dosyalar | Ekran/etkileşim örneği |
|---|---|---|
| 1. Fırsat ve sektör | 04, 19, 20 | Tarihli pazar KPI'ları; hizmet gelir zinciri; müşteri segmentleri seçici |
| 2. Giriş stratejisi ve organizasyon | 01, 02, 03, 05, 06, 15 | EPC/danışman/yatırımcı rol ayrımı; karar ağacı; uygunluk kontrol kapıları |
| 3. Proje geliştirme ve onay | 07, 08, 09 | Çatı/arazi/yüzer GES seçici; süreç animasyonu; izin ve kurum haritası |
| 4. 3D teknik sistem ve tedarik | 07, 10, 11, 12, 16 | Panel/inverter/pano/trafo 3D hotspot; model bazlı 3 markalı kıyas; kabul akışı |
| 5. Finans ve piyasalar | 13, 14, 18 | Gerçek/senaryo ayrımı; öz tüketim, tahmini enerji ve basit finans hesaplayıcı; EPC kârı vs yatırımcı IRR |
| 6. Satış, bakım ve büyüme | 17, 19, 20, 15 | CRM müşteri puanlama örneği; SCADA O&M; 90 gün; risk ve GO/HOLD/NO-GO |

## Sahne senaryosu

1. **Açılış (30 sn)**: 3D dönen çatılı GES, ekranın sağında konsept, solda 3 önemli pazar verisi.
2. **Fırsat (60 sn)**: Eylül 2026 güneş kurulu gücü (28.222 MW), toplamdan payı (%22,2), tesis sayısı (42.221). Tarih açık gösterilir. Bunlar pazara giriş için satış garantisi değildir.
3. **Şirketimiz nasıl gelir üretir (90 sn)**: Keşif, mühendislik/proje imzası, tedarik, EPC, bakım. Proje sahibi / EPC / SMM / şebeke işletmecisi ayrımı.
4. **Örnek çatı GES (2 dk)**: Tesis 3D, panel seçimi, inverter, kablo, koruma, pano, trafo ve sayaç. Her hotspot bir teknik güvenlik/karar sorusunu açsın.
5. **Üç saha karşılaştırması (90 sn)**: Çatı: statik/yangın/çatı hakkı. Arazi: tapu/tarım/ÇED/imar. Yüzer: DSİ/su kullanım hakkı/ankraj/korozyon. İlk 90 günlük öneri için ticari çatıya dön.
6. **Şebekeye bağlanmak (90 sn)**: Ön eleme → başvuru → teknik değerlendirme → çağrı/bağlantı → proje onayı → montaj/test → kabul → işletme. Adımların kapsamı projeye göre değişebilir.
7. **Ekipman ve rakip markalar (90 sn)**: B11'deki katalog bazlı 610W CW/Trina/Jinko; 100–110kW Huawei/GoodWe/Sungrow. Ürün revizyonu, stok ve fiyat teyitleri zorunlu.
8. **Finansal senaryo (2 dk)**: Kurulu güç, özgül üretim, öz tüketim, elektrik birim değeri, yatırım ve bakım girdileri. Sonuçlar canlı değişir; varsayımları vurgula.
9. **İşletme ve servis (60 sn)**: Tesis alarmı → arıza → iş emri → müdahale → rapor. Sözleşmeli hizmet modeli.
10. **Karar ve kapanış (90 sn)**: Yönetimin onayı için pilot, yetkili mühendislik, ortaklar, risk limitleri, bütçe ve 90 gün yol haritası.

## Teknik uygulama kararları

- **v0.1**: Saf HTML/CSS/JS + Three.js CDN. Çalışan demo dosyası `index.html`.
- **v0.2**: Vite + React + TS + React Three Fiber + Drei + veri JSON + `features/` mimarisi.
- **v0.3**: Gerçek tedarik tablosu, güvenilir hesap senaryoları, görsel 3D hotspotlar, onay süreci ve kaynak modalı.
- **v1.0**: Sunucu gerektirmeden lokal kullanım, optimize edilmiş 3D varlıklar, offline kaynaklar, tam ekran ve toplantı senaryosu.

## Teknik etiketi ve kaynak statüsü

Her bilgi bileşeni `kaynak_dosya`, `sayfa`, `veri_tarihi`, `statü` alanlarıyla kaydedilir. Sınıflar:

- `resmi_kaynakli`: PDF'nin atıf verdiği resmî veriye dayalı, kendi tarihini gösterir.
- `yonetim_onerisi`: Şirket önceliklendirmesi ve iş modeli tavsiyesi; onaylanmış şirket stratejisi değildir.
- `temsili_hesap`: Varsayımsal eğitim örneği; fiyat, üretim veya getiri garantisi değildir.
- `sirketten_dogrulanacak`: Şirketin sicil, yetki, mali tablolar, müşteri portföyü gibi gerçek kanıtları henüz eklenmedi.

## Kalite kontrol listesi

- 20 dosyanın hiçbirini unutma; karşılıklarını ekrandaki ilgili karar bağlamında göster.
- 3D sahne gerçekten sürüklenip yakınlaşılabiliyor olmalı.
- Tablolar dizüstü/projeksiyon ekranında kesilmeyecek ve okunur olacak.
- Kaynak gösterimi tek tıkla özgün PDF/sayfayı bulabilsin.
- Sayısal göstergeyi güncel fiyat veya mevzuat bilgisiyle karıştırma.
- Animasyonlar yerine yüksek FPS ve kullanıcı kontrolünü öncelikle koru.
