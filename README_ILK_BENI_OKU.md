# SEMP Grup — Etkileşimli 3D GES Yönetim Sunumu

Bu klasör **bir özet rapor değil**, geliştirmeye hazır **interaktif web sunumu başlangıç paketi**dir.

## Şu anda çalışan ilk sürüm (v0.1)

- 360° döndürülebilen temel 3D çatı, arazi ve yüzer GES konsept modelleri.
- PV panellere tıklayıp ilgili bilgilendirmeyi açma.
- Güneş yüksekliğinin **yalnız görsel etkisini** değiştiren kontrol; üretim hesabı değildir.
- Modelde panel ve şematik enerji hattı görünürlüğünü açıp kapatma.
- GES pazar göstergeleri, şirketin iş modelleri, izin/risk kontrolleri ve 90 gün yol haritası.
- Çalışan, düzenlenebilir **basitleştirilmiş** öz tüketim/maliyet hesaplayıcısı.
- Üstten bölüm seçimi, sağ/sol okla bölüm değiştirme ve **F** ile tarayıcı tam ekran sunum modu.
- 20 özgün PDF ve 20 sayfa işaretli metin aktarımı.

## Siteyi hemen gör

1. ZIP dosyasını bir klasöre çıkar.
2. `index.html` dosyasını Chrome veya Edge ile aç.
3. Three.js kütüphanesi internetten yüklendiği için **ilk açılışta internet gerekir**.
4. 3D sahneyi fareyle döndür, tekerlekle yaklaş; `3D Sistem` ekranında saha tipini değiştir.
5. Finans ekranında sayıları girip sonuçları izle.
6. `F`: tam ekran. `←` / `→`: sunum bölümleri arasında geçiş.

Three.js CDN'i engelleniyorsa sayfaların metin ve hesap ekranları çalışır; 3D yüklenmez. Gelecekte Vite/React projesine taşıyınca bağımlılıklar yerel kurulur.

## Cursor ile ilerleme

1. Cursor'u aç → **File > Open Folder** → bu klasörü seç.
2. Agent / Chat paneline `CURSOR_ASAMA_01.md` içindeki istemi kopyala.
3. Tek seferde tüm projeyi yeniden yazdırma. **Önce kaynak tarama ve modüler mimari**, sonra **3D geliştirme**, sonra **sunum akışları**, en son **test ve optimizasyon**.
4. Her aşamada tarayıcıdan gözle kontrol et; çalışan özellikleri silmeden ilerle.
5. Proje kurallarını `AGENTS.md` ve `.cursor/rules/ges-projesi.mdc` içinde hazırladım.

## Kaynak düzeni

- `pdfler/`: 20 özgün araştırma PDF'si, şekil/tablo/hukuk kontrolü için.
- `sources/01.txt` ... `sources/20.txt`: Her sayfa `--- SAYFA X ---` etiketiyle ayrılmış PDF metni.
- `data/belge_index.json`: Tam belge indeksi ve SHA-256 denetim bilgileri.
- `SUNUM_MIMARISI.md`: Hangi belge, hangi interaktif ekrana dönüşecek?
- `CURSOR_ASAMA_01.md`: Cursor'a verilecek ilk yapım istemi.
- `CURSOR_ASAMA_02.md`: İlk aşama tamamlandığında sonraki 3D görevleri.

## Önemli doğruluk ve güvenlik notu

20 PDF **toplam 289 sayfa**dır. Araştırma dosyalarında resmî kaynaklı veriler, yönetim önerileri, örnek maliyetler ve doğrulanması gereken şirket bilgileri bir aradadır. Bunları tek tip "gerçek" veri gibi göstermeyin. İlk sürümdeki 3D model, verim/ışınım hesabı yapmaz; finans modülü saatlik mahsuplaşma, vergiler, kredi, gölge, degradasyon ve gelir rejimini içermez. Gerçek GES mühendislik tasarımı, mevzuat uyumu veya yatırım kararı yerine kullanılamaz.

İlk sürüm şirket içi yönetim toplantısına dönük bir **konsept / prototip**tir; ana amacımız aynı kod tabanını Cursor ile gelişmiş ve güvenilir bir sunuma dönüştürmektir.

## Yeni: Cursor becerileri (v0.2 kurulum paketi)

Bu pakete `.cursor/skills/` altında dört beceri eklendi: `premium-ui-design`, `interactive-3d-ges`, `financial-simulations`, `presentation-qa`. Kullanım sırası için `00_ILK_ADIMLAR.md` dosyasını açın.
