import { useI18n } from "../i18n";

interface HenriksSpeisekarteProps {
  foodChecked: Set<string>;
  onToggleFood: (foodId: string) => void;
  onNavigateToStop: (stopId: number) => void;
}

function FoodCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="food-checkbox shrink-0 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="food-checkbox__input"
        aria-label={label}
      />
      <span className="food-checkbox__box" aria-hidden>
        {checked && (
          <svg
            className="food-checkbox__mark"
            viewBox="0 0 12 12"
            width="10"
            height="10"
            aria-hidden
          >
            <path
              d="M1.5 6.2 Q3.8 8.8 10.2 2.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </label>
  );
}

export function HenriksSpeisekarte({
  foodChecked,
  onToggleFood,
  onNavigateToStop,
}: HenriksSpeisekarteProps) {
  const { t, format, foodItems } = useI18n();

  return (
    <section className="speisekarte" aria-label={t.food.ariaLabel}>
      <header className="mb-5">
        <p className="meta-mono text-[11px] tracking-[0.12em] text-[color:var(--color-pencil)]">
          {t.food.meta}
        </p>
        <h2 className="mt-1 text-xl text-ink sm:text-2xl">
          {t.food.title}
        </h2>
      </header>

      <ul className="speisekarte-list space-y-4">
        {foodItems.map((item) => {
          const checked = foodChecked.has(item.id);

          return (
            <li key={item.id} className="speisekarte-item flex gap-3">
              <FoodCheckbox
                checked={checked}
                onChange={() => onToggleFood(item.id)}
                label={format(t.food.markTasted, { name: item.name })}
              />
              <div className="min-w-0 flex-1">
                <p className="text-base leading-snug text-ink sm:text-lg">
                  {item.name}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigateToStop(item.stopId)}
                  className="meta-mono mt-0.5 block text-left text-[11px] text-[color:var(--color-pencil)] underline decoration-[color:var(--color-pencil)] decoration-dotted underline-offset-2 transition hover:text-[color:var(--color-azulejo)] hover:decoration-[color:var(--color-azulejo)]"
                >
                  {item.where}
                </button>
                <p className="meta-mono mt-1 text-[10px] leading-relaxed text-[color:var(--color-pencil)]">
                  {item.source}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
