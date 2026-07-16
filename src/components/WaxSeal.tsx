interface WaxSealProps {
  animate?: boolean;
  label: string;
  subtitle?: string;
}

export function WaxSeal({ animate = false, label, subtitle }: WaxSealProps) {
  return (
    <div
      className={`wax-seal ${animate ? "wax-seal--press" : ""}`}
      role="img"
      aria-label={subtitle ? `${label}. ${subtitle}` : label}
    >
      <div className="wax-seal__blob" aria-hidden>
        <span className="wax-seal__gloss" />
        <span className="wax-seal__rim" />
        <span className="wax-seal__crest">
          <span className="wax-seal__initials">HF</span>
        </span>
      </div>
      <p className="wax-seal__caption meta-mono">{label}</p>
      {subtitle && (
        <p className="wax-seal__subtitle meta-mono">{subtitle}</p>
      )}
    </div>
  );
}
