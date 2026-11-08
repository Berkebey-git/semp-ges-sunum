type SectionHeadProps = {
  eyebrow: string;
  title: string;
  lede: string;
  refs: string;
  detail?: string;
};

export function SectionHead({ eyebrow, title, lede, refs, detail }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <span className="executive-label">YÖNETİCİ ÖZETİ</span>
        <p className="lede">{lede}</p>
        <details className="section-scope"><summary>Kapsam ve karar sınırları</summary><p>{detail ?? "Bu bölüm araştırmaya dayalı karar desteğidir. Kaynak ve sayfalar ilgili kartlardadır. Şirket belgeleri, güncel mevzuat ve projeye özgü teknik/ticari koşullar ayrıca doğrulanır; temsili hesaplar proje onayı değildir."}</p></details>
      </div>
      <span className="secnum">{refs}</span>
    </div>
  );
}
