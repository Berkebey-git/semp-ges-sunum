# 00 — CURSOR'DA İLK YAPILACAKLAR

Bu proje 20 GES araştırma PDF'sine ve 20 sayfa işaretli metin dosyasına dayanır. Özet PDF üretmek yerine gerçek 3D etkileşimli web sunumu oluşturuyoruz.

## İlk 10 dakika — yalnız başlangıç

1. Bu ZIP'i Windows'ta **Tümünü Ayıkla** ile klasöre çıkar. ZIP'in içinden açarak düzenlemeye çalışma.
2. `SEMP_GES_3D_Baslangic/index.html` dosyasını çift tıklayıp Chrome/Edge'de ilk konsepti incele; internet gerekir.
3. Cursor'da **File → Open Folder** ile `SEMP_GES_3D_Baslangic` klasörünü aç; üst klasörü değil.
4. Sol panelde veya Cursor Customize → Skills ekranında proje becerilerinin yüklendiğini doğrula. `.cursor/skills/` içine zaten dört özel beceri koyuldu. Görünmüyorsa yeni Agent sohbeti başlat.
5. Agent sohbetine **CURSOR_ASAMA_01.md** içindeki ilk görev istemini yapıştır. Küçük adımlarla ilerlet.
6. Cursor `npm install` ve `npm run build` komutlarını önerdiğinde terminal komutlarını kontrol ederek çalıştırmasına izin ver; Node.js kurulu değilse önce Node.js LTS gerekir.
7. Geliştirilmiş React projesi tamamlanınca terminalde `npm run dev` ile yerel adresi aç.

## Beceri çağırma

- `/premium-ui-design` → premium arayüz ve yönetim sunumu.
- `/interactive-3d-ges` → Three.js 3D sahneleri.
- `/financial-simulations` → hesaplayıcılar ve görselleştirme.
- `/presentation-qa` → tüm ekranların ve interaktif işlevlerin kontrolü.

Cursor becerileri uygun görevde otomatik seçebilir; `/` ile elle de çağırabilirsin. Bunlar kod üretim talimatlarıdır; tek başlarına 3D modeli oluşturmaz veya ücretli servis sağlamaz.

## Daha sonra isteğe bağlı eklentiler

- Ctrl+Shift+X → **Prettier**, **ESLint**. Tailwind kullanılırsa **Tailwind CSS IntelliSense** de eklenebilir.
- Customize → Plugins/MCPs → tasarım referansı için **Figma** (ancak Figma dosyan varsa), otomatik tarayıcı kontrolü için güvenilir bir **Playwright MCP** değerlendir.
- Rastgele GitHub reposunu otomatik yükleyip sınırsız terminal erişimi verme; kaynağı ve izinlerini incele.

## İlk Cursor mesajı için kısa alternatif

"`AGENTS.md`, `00_ILK_ADIMLAR.md`, `SUNUM_MIMARISI.md` ve `CURSOR_ASAMA_01.md` dosyalarını oku. Mevcut çalışan prototipi koru. Önce tek sayfalık bir geliştirme planı çıkar ve Aşama 1'e geç. Premium tasarım, 3D GES ve kalite testi için `.cursor/skills` altındaki becerileri uygun görevlerde kullan. Tüm 20 PDF'yi aynı anda bağlama. Çalışır build al ve bana nerede açacağımı göster."
