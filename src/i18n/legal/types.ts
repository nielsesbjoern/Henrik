export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  intro?: string;
  sections: LegalSection[];
}

export interface LegalTranslations {
  close: string;
  navAria: string;
  impressumLink: string;
  privacyLink: string;
  liabilityLink: string;
  contactHeading: string;
  emailLabel: string;
  impressum: LegalDocument;
  privacy: LegalDocument;
  liability: LegalDocument;
}
