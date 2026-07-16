import { useI18n } from "../i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[color:var(--color-control-border)] bg-[color:var(--color-card)] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl text-sm leading-relaxed text-[color:var(--color-pencil)]">
        <p>{t.footer.text}</p>
      </div>
    </footer>
  );
}
