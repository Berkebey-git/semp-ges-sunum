import fs from 'node:fs';
import path from 'node:path';
const fail=message=>{throw new Error(message)};
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
if(!fs.existsSync('dist/index.html'))fail('Önce npm run build çalıştırın.');
const files=walk('dist');
const forbidden=files.filter(p=>/(^|[\\/])(node_modules|sources|pdfler|tmp|\.git|\.env[^\\/]*)($|[\\/])/.test(p)||/\.(txt|map|log)$/i.test(p));
if(forbidden.length)fail('Üretimde beklenmeyen dosyalar: '+forbidden.join(', '));
const pdfs=files.filter(p=>p.endsWith('.pdf'));
if(pdfs.length!==20)fail('20 atıf verilen referans PDF bekleniyor.');
for(let id=1;id<=20;id++)if(!fs.existsSync(`dist/references/B${String(id).padStart(2,'0')}.pdf`))fail('Eksik referans: '+id);
const config=JSON.parse(fs.readFileSync('vercel.json','utf8').replace(/^\uFEFF/,''));
if(config.framework!=='vite'||config.outputDirectory!=='dist')fail('Vercel ayarları eşleşmiyor.');
const html=fs.readFileSync('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g))if(!fs.existsSync('dist'+match[1]))fail('Eksik giriş varlığı: '+match[1]);
for(const p of files.filter(p=>/\.(js|html|css|json)$/.test(p))){const s=fs.readFileSync(p,'utf8');if(/-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{36}/.test(s))fail('Gizli anahtar örüntüsü bulundu: '+p);}
console.log(`Yayın paketi kontrolü başarılı: ${files.length} dosya; 20 kullanılan referans PDF; ham araştırma metni, node_modules ve bilinen gizli anahtar örüntüsü yok.`);
console.log('Not: Bu kontrol yayın/erişim veya PDF paylaşım yetkisi onayı değildir.');
