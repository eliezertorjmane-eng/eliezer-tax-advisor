import { getOlehHadashReformContext } from "./olehHadash";

export const oleExemptionIntroduction = "Pour les Olim Hadashim ayant fait leur Alyah entre le 5 novembre 2025 et le 31 décembre 2026.\n\nCette exonération temporaire concerne, sous conditions, certains salaires et bénéfices professionnels réalisés en Israël, pour les années fiscales 2026–2030.";

export const oleExemptionAssumptions = "Cette simulation suppose que votre date d'Alyah correspond au début de votre résidence fiscale en Israël et que les revenus saisis sont éligibles à la réforme. Les situations particulières nécessitent une vérification.";

export type OleResidencyTiming = "" | "same" | "different" | "unsure";

// Presentation adapter only: never silently substitute an administrative arrival date.
export function resolveOleExemptionResidencyDate(aliyahDate: string, timing: OleResidencyTiming, effectiveResidencyDate: string) {
  if (timing === "same") return aliyahDate;
  if (timing === "different") return effectiveResidencyDate;
  return "";
}

export function getOleExemptionArrivalContext(aliyahDate: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(aliyahDate)) return null;
  const date = new Date(`${aliyahDate}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== aliyahDate) return null;
  const context = getOlehHadashReformContext(aliyahDate);
  if (context) return context;
  return aliyahDate < "2025-11-05" ? "before" : "after";
}
