/**
 * Pflichtangaben für Impressum (§ 5 DDG) und Datenschutz.
 * Bitte mit realen Kontaktdaten befüllen – ohne Anschrift und E-Mail
 * ist das Impressum nicht rechtskonform.
 */
export const legalOperator = {
  name: "Niels Schade",
  street: "[Straße und Hausnummer]",
  zipCity: "[PLZ Ort]",
  country: "Deutschland",
  email: "[E-Mail-Adresse]",
} as const;

export type LegalPageId = "impressum" | "datenschutz" | "haftung";

export const legalPageIds: LegalPageId[] = [
  "impressum",
  "datenschutz",
  "haftung",
];

export function isLegalPageId(value: string): value is LegalPageId {
  return legalPageIds.includes(value as LegalPageId);
}
