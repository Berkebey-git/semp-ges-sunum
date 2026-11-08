import { STATUS_LABEL } from "../data/content";
import type { Evidence } from "../data/types";

export function EvidenceChip({ evidence }: { evidence: Evidence }) {
  return (
    <span className={`evidence evidence--${evidence.status}`}>
      {evidence.file} / {evidence.page}
      <em>{STATUS_LABEL[evidence.status]}</em>
    </span>
  );
}
