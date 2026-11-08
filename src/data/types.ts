export type EvidenceStatus =
  | "resmi_kaynakli"
  | "yonetim_onerisi"
  | "temsili_hesap"
  | "sirketten_dogrulanacak";

export type Evidence = {
  file: string;
  page: string;
  date?: string;
  status: EvidenceStatus;
};

export type SectionId =
  | "hero"
  | "vizyon"
  | "strateji"
  | "teknik"
  | "finans"
  | "yolharitasi";

export type SiteMode = "roof" | "land" | "float";
