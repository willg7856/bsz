import type { SpecRow, StatItem } from "@/content";

export function SpecTable({
  rows,
  light = false,
}: {
  rows: readonly SpecRow[];
  light?: boolean;
}) {
  return (
    <dl className="w-full">
      {rows.map((row) => (
        <div
          key={row.label}
          className={`spec-row ${light ? "spec-row-light" : ""}`}
        >
          <dt className="type-label text-muted shrink-0">{row.label}</dt>
          <dd
            className={`type-stat text-right ${row.hot ? "text-hot" : light ? "text-ink" : "text-light"}`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function StatGrid({
  items,
  light = false,
}: {
  items: readonly StatItem[];
  light?: boolean;
}) {
  return (
    <div className="grid-auto gap-px bg-rule-light/0">
      {items.map((item) => {
        const valueColor =
          item.tone === "hot"
            ? "text-hot"
            : item.tone === "partial"
              ? "text-status-partial"
              : item.tone === "failure"
                ? "text-status-failure"
                : item.tone === "success"
                  ? "text-status-success"
                  : light
                    ? "text-ink"
                    : "text-light";
        return (
          <div
            key={item.label}
            className={`border-t ${light ? "border-rule-light" : "border-rule"} pt-5`}
          >
            <p className={`type-stat text-[clamp(36px,6vw,56px)] leading-none ${valueColor}`}>
              {item.value}
            </p>
            <p className="type-label text-muted mt-3">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
