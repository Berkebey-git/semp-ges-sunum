# GitHub / Vercel yayın hazırlığı

08.11.2026 — Yapılandırma hazır, yayın yapılmadı.

## Hazırlananlar

- `package-lock.json`, Node 22.x hedefi (`package.json`, `.nvmrc`), Vite/React build.
- `vercel.json`: Vite, `npm ci`, `npm run build`, `dist`; statik varlık önbelleği ve temel yanıt başlıkları.
- `.github/workflows/ci.yml`: push/PR için test, build ve yayın paketi kontrolü; yayın adımı veya hesap sırrı yok.
- `.gitignore`: node_modules/dist/.env/.vercel, özgün araştırma kopyaları, ham metinler, geçici dosyalar ve yerel ekran görüntüleri hariç.
- `.vercelignore`: CLI ile olası paketlemede de ham araştırma ve yerel araçları dışarıda tutar.
- Atıf bağlantıları için `public/references/B01.pdf`–`B20.pdf` kasıtlı olarak pakettedir. İç kullanım damgalı araştırma PDF'lerinin üçüncü kişilere dağıtım hakkı henüz onaylanmadı.

## Onay sonrası uygulanacak yol

1. Belgelerin paylaşım hakkı, marka ve şirket adı ile hedef erişim kitlesini doğrulayın. İç sunum için erişim kısıtı seçimini yönetim belirlesin.
2. Kullanıcının açık onayından sonra gözden geçirilmiş dosyaları GitHub deposuna aktarın. `git add .` öncesinde dosya listesi/secret kontrolü yapın; kaynak PDF'leri gözden kaçırmayın.
3. Vercel'de bu depoyu içe aktarın; kök dizin proje kökü, framework Vite, Node 22.x, build `npm run build`, output `dist`. Harici servis veya ortam sırrı gerekmez.
4. GitHub CI sonucu ve Vercel önizlemesini kontrol edin. HTTPS URL'de üç 3D sahneyi, kaynak PDF'leri, `/#hukuk-izin` ve `/#epc-akisi` bağlantılarını, hesapları, mobil ve tam ekranı yeniden deneyin.
5. Herkese açık dağıtım/ücretli plan için kullanıcının açık onayı olmadan işlem yapmayın. Depo bağlantısı sonraki push'larda Vercel dağıtımı tetikleyebilir; bu bağlantıyı da onaydan önce kurmayın.

Gezinme aynı sayfada hash/section temellidir. Yeni path tabanlı yönlendirici eklenmediği için bütün istekleri index.html'e çevirecek kural eklenmedi; bulunamayan PDF/JS dosyası HTML ile maskelenmez. Three.js varlıkları yerel paketlidir, HTTP CDN veya dış font isteği yoktur. Gerçek HTTPS dağıtımı, güvenlik başlıkları ve otomatik dağıtım bu aşamada çalıştırılmadı.

Yerelde Node 24.15.0 kullanıldı; Node 22 hedefli uzak CI henüz çalışmadı. Vercel planı/hesabı veya alan adı seçilmedi; ücretsiz kullanım garantisi verilmez.

Yapılandırma karşılaştırması: [Vercel Vite belgesi](https://vercel.com/docs/frameworks/frontend/vite), [Node sürüm belgesi](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) — 08.11.2026. Bu teknik yayın belgeleri sunumun mühendislik/hukuk içeriğine kaynak olarak eklenmedi.
