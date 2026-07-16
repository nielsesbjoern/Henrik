import type { Category } from "../data/stops";
import { getCategoryConfig } from "../utils/categories";
import { useI18n } from "../i18n";

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const { t } = useI18n();
  const config = getCategoryConfig(t.categories)[category];
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1";

  return (
    <span
      className={`meta-mono inline-flex items-center border border-[color:var(--color-control-border)] bg-[color:var(--color-paper)] ${config.badgeText} ${sizeClass}`}
      style={{ color: config.color }}
    >
      {config.label}
    </span>
  );
}
