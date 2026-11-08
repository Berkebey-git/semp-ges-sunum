# SEMP İnşaat — 3D GES Yönetim Sunumu · 1.0

Mevcut uygulama üzerine geliştirilen Türkçe, kaynaklı sektör giriş platformu. Sunum markası SEMP İnşaat; özgün araştırma belgelerindeki şirket adları değiştirilmedi. Şirketin gerçek tüzel kişiliği, yetkileri, personeli ve mali kapasitesi doğrulanmış değildir.

## Çalıştırma

Node.js 22.x proje ve CI hedefidir. Bu bilgisayardaki testler Node 24.15.0 ile yapıldı; uzak Node 22 CI henüz çalıştırılmadı.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Vite kullanılabilir portu ekranda gösterir. Bu teslimde çalışan adres: http://127.0.0.1:5175/ (sunucu yeniden başlatılırsa port değişebilir).

```sh
npm test
npm run build
npm run verify:release
npm run preview -- --host 127.0.0.1
```

## Kullanım ve kapsam

- Altı ana bölüm: başlangıç, fırsat, strateji/izin, 3D sistem, finans, yol haritası. Ok tuşları ileri/geri; F veya Sunum modu tam ekran isteği gönderir. Tarayıcı tam ekrana izin vermeyebilir.
- Çatı, arazi ve yüzer santral: fareyle döndürme/yakınlaşma, sıfırlama, ekipman bilgisi, saat/gece ve katmanlar. Dokunmatik yörünge kontrolü kütüphanede mevcut; gerçek cihaz ve çoklu dokunma bu teslimde test edilmedi.
- Portre ekranında kamera görüş açısı uyarlanır. 700px altı veya dokunmatik işaretçide DPR 1, gölgeler ve sürekli su animasyonu kapalıdır. Masaüstünde Düşük donanım seçeneği aynı azaltmayı sağlar. Görünmeyen sahnelerde su durur; azaltılmış hareket tercihi gözetilir.
- Enerji girdileri yatırımcı finansına canlı bağlanır. EPC proje kârı ve yatırımcı tasarruf/NPV/IRR ayrı modellerdir. Üç sahada girdiler ayrı saklanır; 3D modül adedi üretim hesabını değiştirmez.
- Model bazlı panel/inverter karşılaştırması, kullanıcı teklif alanları ve sınırlı elektriksel ön kontrol bulunur.
- Hukuk haritasında rol, saha, rejim, şebeke seçimi; sekiz EPC aşamasında belge ve sorumlu zinciri bulunur. İşaretler yerel çalışma notudur, resmî onay değildir.
- Final ekranında yedi yönetim sorusu, 30/60/90 gün, onay gündemi, personel/bakım/teşvik/sigorta/satış/büyüme özetleri ve 20 konu karşılığı bulunur. Takvim öneridir, resmî süre taahhüdü değildir.

## Kaynak ve doğruluk sınırı

20 özgün PDF'nin yalnız editoryal olarak seçilen iddiaları gösterilir; kaynak metinleri topluca ekrana basılmaz. Atıflar BXX/sayfa ile ve özgün PDF bağlantılarıyla sunulur. Rapora göre resmî kaynaklı veri, yönetim önerisi, temsili hesap ve şirketten doğrulanacak bilgi ayrılır.

Tüm finans ve enerji senaryoları temsilidir. Üretim, statik, elektrik projesi, proje fizibilitesi veya doğrulanmış PVGIS sonucu değildir. Güncel mevzuatın tamamı teyit edilmedi; sınırlı kontrol kaydı hukuk ekranındadır. Şirket belgesi, gerçek fiyat/stok, bağlantı kapasitesi ve yayın için PDF paylaşım hakkı teyidi ayrıca gerekir.

## Kontrol ve yayın

27 otomatik test; enerji, finans, ışık, arazi yerleşimi, hukuk/EPC ve kaynak kapsamını denetler. `verify:release` üretimde ham metin/araştırma klasörü, node_modules, kaynak haritası ve bazı gizli anahtar örüntülerini arar; kapsamlı güvenlik denetimi değildir. 20 atıf verilen PDF (yaklaşık 16,4 MB) `public/references` içinde bilinçli olarak tutulur; hepsi birlikte indirilmez, bağlantıyla açılır.

Three.js çekirdeği yaklaşık 688 kB (gzip 177 kB) ve 500 kB uyarısı sürer. Sahne ve panel önizlemesi lazy yüklenir; çekirdek ayrı önbellek parçasıdır. Uyarı gizlenmedi ve render çekirdeği yapay olarak bölünmedi. Yeni bağımlılık eklenmedi.

- [Tarayıcı kontrol kaydı](qa/FINAL_KONTROL.md)
- [Kaynak kapsamı](KAYNAK_KAPSAM_KONTROLU.md)
- [GitHub / Vercel yayın hazırlığı](YAYIN_HAZIRLIGI.md)

GitHub aktarımı, hesap bağlantısı ve herkese açık Vercel yayını yapılmadı. Kullanıcının açık yayın onayı gerekir. Ekran görüntüleri `qa/screenshots/` altında yerel teslimdir ve Git'e dahil edilmez.
