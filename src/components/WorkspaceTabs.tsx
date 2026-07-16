import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "../i18n";

export type WorkspaceTab = "protocol" | "food" | "notes";

interface WorkspaceTabsProps {
  protocol: ReactNode;
  food: ReactNode;
  notes: ReactNode;
  /** Increment to force-open the protocol panel and scroll to it. */
  revealProtocolSignal?: number;
}

export function WorkspaceTabs({
  protocol,
  food,
  notes,
  revealProtocolSignal = 0,
}: WorkspaceTabsProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<WorkspaceTab>("protocol");
  const rootRef = useRef<HTMLDivElement>(null);
  const lastRevealRef = useRef(0);

  const openTo = (tab: WorkspaceTab) => {
    setActive(tab);
    setOpen(true);
    requestAnimationFrame(() => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    if (!revealProtocolSignal || revealProtocolSignal === lastRevealRef.current) {
      return;
    }
    lastRevealRef.current = revealProtocolSignal;
    openTo("protocol");
  }, [revealProtocolSignal]);

  useEffect(() => {
    const openProtocol = () => openTo("protocol");
    window.addEventListener("sellano:open-protocol", openProtocol);
    return () => window.removeEventListener("sellano:open-protocol", openProtocol);
  }, []);

  const tabs: {
    id: WorkspaceTab;
    label: string;
    teaser: string;
  }[] = [
    {
      id: "protocol",
      label: t.workspace.protocol,
      teaser: t.workspace.protocolTeaser,
    },
    {
      id: "food",
      label: t.workspace.food,
      teaser: t.workspace.foodTeaser,
    },
    {
      id: "notes",
      label: t.workspace.notes,
      teaser: t.workspace.notesTeaser,
    },
  ];

  const panel =
    active === "protocol" ? protocol : active === "food" ? food : notes;

  return (
    <div
      ref={rootRef}
      id="workspace"
      className="workspace-dock border-t border-[color:var(--color-control-border)] bg-[color:var(--color-paper)]"
      aria-label={t.workspace.ariaLabel}
    >
      {!open ? (
        <div className="workspace-teaser mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <div className="workspace-teaser__head">
            <div className="min-w-0 flex-1">
              <p className="brand-label text-[10px] tracking-[0.14em] text-[color:var(--color-stamp)]">
                {t.workspace.teaserEyebrow}
              </p>
              <p className="book-prose mt-1.5 max-w-[36ch] text-[1.05rem] leading-snug text-ink">
                {t.workspace.teaserLead}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openTo("protocol")}
              className="btn-stamp brand-label shrink-0 px-4 py-2.5 text-[11px] tracking-[0.12em]"
            >
              {t.workspace.expand}
            </button>
          </div>

          <div className="workspace-teaser__grid" role="list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="listitem"
                onClick={() => openTo(tab.id)}
                className="workspace-teaser__card"
              >
                <span className="brand-label text-[11px] tracking-[0.12em] text-ink">
                  {tab.label}
                </span>
                <span className="mt-1 block font-book text-[0.95rem] leading-snug text-[color:var(--color-pencil)]">
                  {tab.teaser}
                </span>
                <span className="meta-mono mt-3 inline-flex items-center gap-1 text-[10px] tracking-[0.08em] text-[color:var(--color-stamp)]">
                  {t.workspace.openCta}
                  <span aria-hidden>→</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-expanded
              aria-controls="workspace-panel"
              className="flex w-full min-h-12 items-center justify-between gap-3 py-3 text-left transition hover:opacity-90"
            >
              <div className="min-w-0">
                <p className="brand-label text-[10px] tracking-[0.1em] text-[color:var(--color-pencil)]">
                  {t.workspace.ariaLabel}
                </p>
                <p className="mt-0.5 text-sm text-ink">
                  {tabs.find((tab) => tab.id === active)?.label}
                </p>
              </div>
              <span
                className="meta-mono shrink-0 rotate-180 text-[color:var(--color-pencil)]"
                aria-hidden
              >
                ▾
              </span>
              <span className="sr-only">{t.workspace.collapse}</span>
            </button>
          </div>

          <div
            className="mx-auto flex max-w-6xl gap-0 overflow-x-auto border-t border-[color:var(--color-control-border)] px-4 sm:px-6"
            role="tablist"
            aria-label={t.workspace.ariaLabel}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                id={`workspace-tab-${tab.id}`}
                aria-controls={`workspace-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={`brand-label shrink-0 border-b-2 px-4 py-3 text-[11px] tracking-[0.12em] transition ${
                  active === tab.id
                    ? "border-[color:var(--color-stamp)] text-ink"
                    : "border-transparent text-[color:var(--color-pencil)] hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            id="workspace-panel"
            role="tabpanel"
            aria-labelledby={`workspace-tab-${active}`}
            className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6"
          >
            {panel}
          </div>
        </>
      )}
    </div>
  );
}
