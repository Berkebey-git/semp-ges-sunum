# SEMP Grup GES 3D — Kalıcı Cursor Proje Talimatları

## Amaç
SEMP Grup'un Türkiye güneş enerjisi sektörüne girişi için interaktif yönetim sunumu geliştir. 20 PDF ayrı ayrı özetlenmeyecek; yönetim karar yolculuğunu anlatan profesyonel bir web uygulamasına dönüştürülecek. Türkçe arayüz, 16:9 projeksiyon, toplantı salonu ve masaüstü önceliklidir.

## Kaynak doğrulama
- İçeriğin tek temeli `pdfler/` ve `sources/` içindeki 20 araştırma dosyasıdır. Kullanıcı dış araştırma istemedikçe harici bilgiyle doldurma.
- Belgelerden veri kullanınca `BXX / sayfa` göster. `sources/XX.txt` içinde sayfa işaretleri bulunur; görsel tablo/şema varsa **PDF'nin özgün sayfasını** kontrol et.
- Veriyi dört ayrı statüde tut: `resmi_kaynakli` (rapora göre), `yonetim_onerisi`, `temsili_hesap`, `sirketten_dogrulanacak`.
- Hukukî onay, lisans, fiyat, bağlantı kapasitesi, proje kârlılığı, üretim ve yatırım geri dönüşünü kesinmiş gibi sunma.
- 2026 tarihli veya fiyat/standart/mevzuat içeren bir veriyi güncel resmî kaynaktan doğrulamadan "bugün geçerli" deme.

## Ürün / deneyim
- 20 ekran yapmak yerine 6 ana bölüm: (1) Pazar ve fırsat (2) Giriş stratejisi (3) Proje geliştirme ve izinler (4) Teknik 3D GES (5) Finans ve ticari model (6) 90 gün ve uzun vadeli büyüme.
- 3D: çatı, arazi, yüzer GES; panel seçme; inverter/koruma/trafo katmanları; açıklayıcı enerji akışı; kontrol etiketleri.
- Model fiziksel doğruluk iddiası taşımasın; fiziksel simülasyon isteyen özellikler gerçek model/meteoroloji girdisi gerektirir.
- Paneller ve saha seçimiyle verim hesabını birbirinden ayır. Görsel güneş açısı değişimi enerji üretim simülasyonu değildir.
- Hesaplayıcılarda kullanıcı girdisini ve varsayımları göster. EPC kârı ile yatırımcı tasarrufu/IRR'yi karıştırma.
- Sunumda klavye okları, tam ekran, erişilebilir kontrast ve düşük donanımda 3D çözünürlük azaltma.

## Tasarım
Lüks B2B mühendislik sunumu. Koyu lacivert arka plan + turkuaz vurgu + yeterli beyaz boşluk. Gürültülü geçişler, boğucu tablolar ve her kartta aşırı animasyon istemiyoruz. 3D içeriği gerçekten etkileşimli kıl; yalnız videodan veya statik görselden ibaret olmasın.

## Geliştirme disiplini
- Önce mevcut `index.html` v0.1'i çalıştırıp incele. Çalışan özellikleri koru.
- Kullanıcı onayı olmadan tüm dosyaları silme/yeniden oluşturma.
- Tek aşamada birkaç bileşen üret; değişiklik listesini ve test sonucunu göster.
- `source`/`pdfler` metinlerini web sunumuna topluca basma. Yalnız editoryal olarak seçilmiş içerikleri göster.
- Yeni kod modüler olacak; uygun aşamada Vite + React + TypeScript + Three.js + React Three Fiber + Drei'ye geçir. `@react-three/fiber` ve React ana sürümleri uyumlu kurulmalı.
- Kurulum komutlarını README'de güncel tut. Build/test hatalarını açıkça bildir.
