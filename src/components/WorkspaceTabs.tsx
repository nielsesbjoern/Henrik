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

  useEffect(() => {
    if (!revealProtocolSignal || revealProtocolSignal === lastRevealRef.current) {
      return;
    }
    lastRevealRef.current = revealProtocolSignal;
    setActive("protocol");
    setOpen(true);
    requestAnimationFrame(() => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [revealProtocolSignal]);

  useEffect(() => {
    const openProtocol = () => {
      setActive("protocol");
      setOpen(true);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    window.addEventListener("sellano:open-protocol", openProtocol);
    return () => window.removeEventListener("sellano:open-protocol", openProtocol);
  }, []);

  const tabs: { id: WorkspaceTab; label: string }[] = [
    { id: "protocol", label: t.workspace.protocol },
    { id: "food", label: t.workspace.food },
    { id: "notes", label: t.workspace.notes },
  ];

  const panel =
    active === "protocol" ? protocol : active === "food" ? food : notes;

  return (
    <div
      ref={rootRef}
      id="workspace"
      className="border-t border-[color:var(--color-control-border)] bg-[color:var(--color-paper)]"
      aria-label={t.workspace.ariaLabel}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="workspace-panel"
          className="flex w-full min-h-12 items-center justify-between gap-3 py-3 text-left transition hover:opacity-90"
        >
          <div className="min-w-0">
            <p className="brand-label text-[10px] tracking-[0.1em] text-[color:var(--color-pencil)]">
              {t.workspace.ariaLabel}
            </p>
            <p className="mt-0.5 text-sm text-ink">
              {open
                ? tabs.find((tab) => tab.id === active)?.label
                : t.workspace.collapsedHint}
            </p>
          </div>
          <span
            className={`meta-mono shrink-0 text-[color:var(--color-pencil)] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
          <span className="sr-only">
            {open ? t.workspace.collapse : t.workspace.expand}
          </span>
        </button>
      </div>

      {open && (
        <>
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
                    ? "border-[color:var(--color-ink)] text-ink"
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
