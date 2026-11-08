---
name: financial-simulations
description: GES kurulu güç, panel sayısı, öz tüketim, proje maliyeti, yatırım geri dönüşü, EPC marjı ve senaryo karşılaştırmaları geliştirirken kullan.
---

# Finansal / teknik simülasyon becerisi

## Kaynak
- Önce `sources/07.txt`, `sources/13.txt`, `sources/14.txt`, `sources/18.txt`, ilgili olduğunda `sources/19.txt` ve `sources/20.txt` içindeki sayfaları oku.
- Şirket EPC marjı ile santral yatırımcısının getirilerini asla tek metrikte karıştırma.
- Değer kaynağını dörtlü veri statüsüyle tut: rapora göre resmî, yönetim önerisi, temsili varsayım, şirketten doğrulanacak.

## Çalışma yöntemi
- `inputs`, `derived`, `assumptions`, `outputs`, `source` alanlarını ayrı veri katmanlarında tut.
- kW/kWp/kWh/MWh, AC/DC, TL/USD, KDV dahil/hariç birimlerinin açık etiketini göster.
- Karşılaştırmalı senaryolar oluştur: baz, temkinli, iyimser. Sabit sayı yerine kullanıcı girdileri ve açıklanmış varsayımlar kullanılmalı.
- Hesapları pure functions olarak yaz, sınır değer testleri ekle. Geçersiz / negatif girdiye anlamlı geri bildirim göster.
- Yıllık üretim ve geri dönüş tahminleri güncel PVGIS/meteoroloji ve gerçek tüketim profili olmadığında yalnız örnek modeldir.
- Saatlik mahsuplaşma ve ihtiyaç fazlası satış sınırlarını doğrulanmadan basitleştirip gelir garantisine dönüştürme.

## Sunum
- Kaydırmalı giriş kontrolleri + sayısal girdi ve anlaşılır karşılaştırma grafikleri sun.
- Grafiklere kaynak ve varsayım bağlantısı koy; yatırımcı/EPC nakit akışını iki ayrı sekmede göster.
- Yönetim için 'Bu kararı verebilmek için hangi veri eksik?' kartı ekle.
