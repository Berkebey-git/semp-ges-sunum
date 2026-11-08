import type { Evidence, SectionId, SiteMode } from "./types";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Başlangıç" },
  { id: "vizyon", label: "Fırsat" },
  { id: "strateji", label: "Strateji / İzin" },
  { id: "teknik", label: "3D Sistem" },
  { id: "finans", label: "Finans" },
  { id: "yolharitasi", label: "Yol Haritası" },
];

export const STATUS_LABEL: Record<Evidence["status"], string> = {
  resmi_kaynakli: "Resmî kaynaklı",
  yonetim_onerisi: "Yönetim önerisi",
  temsili_hesap: "Temsili hesap",
  sirketten_dogrulanacak: "Şirketten doğrulanacak",
};

export const marketKpis = [
  {
    index: "PAZAR",
    value: "28.222 MW",
    title: "Güneş kurulu gücü",
    text: "ETKB Eylül 2026 dönem sonu verisi; yıl sonu değeri değildir. Pazara giriş için satış garantisi değildir.",
    evidence: { file: "B04", page: "s.2", date: "Eylül 2026", status: "resmi_kaynakli" as const },
  },
  {
    index: "EKOSİSTEM",
    value: "42.221",
    title: "GES tesisi",
    text: "Mevcut santral parkı bakım ve izleme hizmetlerini gündeme getirir. Tesis sayısı müşteri sayısı değildir.",
    evidence: { file: "B04", page: "s.2", date: "Eylül 2026", status: "resmi_kaynakli" as const },
  },
  {
    index: "HEDEF PAZAR",
    value: "B2B",
    title: "Sanayi ve ticari çatılar",
    text: "İlk 90 gün için tüketim profili ve saha erişimi net bir fabrika/lojistik çatısına odaklanma önerisi.",
    evidence: { file: "B19", page: "s.2–3", status: "yonetim_onerisi" as const },
  },
];

export const businessModels = [
  {
    index: "01 / KEŞİF",
    title: "Danışmanlık ve fizibilite",
    text: "Müşterinin tüketimi, saha uygunluğu, ön tasarım ve yatırımın teknik-ekonomik ön elemesi.",
    target: "teknik" as SectionId,
  },
  {
    index: "02 / EPC",
    title: "Mühendislik ve kurulum",
    text: "Yetkili proje müellifiyle tasarım; tedarik, montaj, test ve kurum kabulü koordinasyonu.",
    target: "teknik" as SectionId,
  },
  {
    index: "03 / O&M",
    title: "Bakım ve SCADA",
    text: "Uzaktan izleme, arıza yönetimi, performans takibi ve sözleşmeli bakım operasyonu.",
    target: "yolharitasi" as SectionId,
  },
  {
    index: "04 / OPSİYONEL",
    title: "Şirketin kendi yatırımı",
    text: "Öz GES, arazi, yüzer GES, depolama ve elektrik satışı ayrı sermaye/yetki incelemesi.",
    target: "finans" as SectionId,
  },
];

export const decisionGates = [
  { code: "G1", title: "Şirket", text: "Tüzel kişi, sicil, temsil ve faaliyet uygunluğu" },
  { code: "G2", title: "Saha", text: "Çatı/arsa hakkı, statik, imar ve ÇED ön elemesi" },
  { code: "G3", title: "Şebeke", text: "EDAŞ/OSB/TEİAŞ bağlantı süreci" },
  { code: "G4", title: "Teknik", text: "SMM, proje onayı, tedarik ve güvenli uygulama" },
  { code: "G5", title: "Kabul", text: "Test, resmî kabul, garanti ve işletme devri" },
];

export const riskLimits = [
  { title: "İzin olmadan", text: "Kesin bağlantı, üretim veya teslim garantisi yok." },
  { title: "İmza yetkisi", text: "Diploma, şirket için otomatik SMM yetkisi değildir." },
  { title: "Stok", text: "Pilot gereği kanıtlanmadan büyük depo / ithalat yükü yok." },
  { title: "Finans", text: "EPC kârı ile yatırımcının IRR’si ayrı tutulur." },
  { title: "Şantiye", text: "İSG, alt yüklenici ve kabul kayıtları eksiksiz." },
];

export const siteCopy: Record<
  SiteMode,
  { title: string; desc: string; evidence: Evidence }
> = {
  roof: {
    title: "Sanayi Çatısı GES",
    desc: "Mevcut çatı, statik kontrol, yangın güvenliği ve şebeke bağlantısına göre projelendirilir.",
    evidence: { file: "B09", page: "s.2", status: "yonetim_onerisi" },
  },
  land: {
    title: "Arazi GES",
    desc: "Mülkiyet, imar, tarım/ÇED, zemin, drenaj ve bağlantı koşulları birlikte incelenir.",
    evidence: { file: "B09", page: "s.2–3", status: "yonetim_onerisi" },
  },
  float: {
    title: "Yüzer GES",
    desc: "Su yüzeyi kullanım hakkı, DSİ görüşleri, yüzer platform, ankraj, korozyon ve çevre koşulları ayrı kontrol edilir.",
    evidence: { file: "B09", page: "s.3", status: "yonetim_onerisi" },
  },
};

export const roadmap = [
  {
    window: "0–15",
    title: "Hukuki ve şirket altyapısı",
    text: "Tüzel kişi, NACE, temsil yetkisi, mühendis imzası ve hedef pazarın netleştirilmesi.",
  },
  {
    window: "15–30",
    title: "Partner ve kalite ağı",
    text: "En az iki tedarik kanalı, yetkili mühendislik ve montaj çözüm ortaklarının değerlendirilmesi.",
  },
  {
    window: "30–60",
    title: "İlk müşteri ve fizibilite",
    text: "Sanayi/ticari çatı adayı; fatura, saha, şebeke, teklif, finans ve risk kontrolü.",
  },
  {
    window: "60–90",
    title: "Pilot GO / HOLD / NO-GO",
    text: "İzin, fiyat, sözleşme, finans ve teknik onay kapılarının belgeli değerlendirilmesi.",
  },
];

export const growthSteps = [
  { code: "01", title: "EPC", text: "Mühendislik + tedarik + kurulum geliri" },
  { code: "02", title: "Bakım", text: "Tekrarlayan hizmet sözleşmeleri" },
  { code: "03", title: "SCADA", text: "İzleme, alarm, performans analitiği" },
  { code: "04", title: "Yatırım", text: "Finansal kanıta bağlı seçici proje geliştirme" },
];

export const boardDecisions = [
  { decision: "İlk hedef segment", proof: "Müşteri profili / proje kapasitesi" },
  { decision: "İmza modeli", proof: "EMO ve yetkili müellif belgeleri" },
  { decision: "Satın alma", proof: "Karşılaştırmalı B2B teklifler" },
  { decision: "Risk sınırı", proof: "Marj, nakit ve teminat limiti" },
  { decision: "Pilot GO kararı", proof: "İzin, teknik ve finans onayları" },
];
