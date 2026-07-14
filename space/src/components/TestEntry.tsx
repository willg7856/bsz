import type { TestEntry as TestEntryData, TestStatus } from "@/content";
import { tests } from "@/content";
import { SpecTable } from "@/components/SpecTable";

const statusClass: Record<TestStatus, string> = {
  partial: "text-status-partial border-status-partial",
  failure: "text-status-failure border-status-failure",
  success: "text-status-success border-status-success",
};

export function TestEntry({ entry }: { entry: TestEntryData }) {
  return (
    <article className="border border-rule-light rounded-machined p-5 md:p-6 bg-light">
      <header className="flex flex-wrap items-center gap-3 mb-5">
        <h3 className="type-stat text-[clamp(22px,3vw,32px)] text-ink">{entry.id}</h3>
        <span className="type-label text-muted border border-rule-light px-2 py-1 rounded-machined">
          {entry.badge}
        </span>
        <span
          className={`type-label border px-2 py-1 rounded-machined ml-auto ${statusClass[entry.status]}`}
        >
          {tests.statusLabels[entry.status]}
        </span>
      </header>

      <SpecTable rows={entry.specs} light />

      <div className="mt-6">
        <p className="type-label text-muted mb-3">{tests.observationsLabel}</p>
        <ul className="space-y-2">
          {entry.observations.map((item) => (
            <li key={item} className="type-body text-ink/90 max-w-none pl-4 relative">
              <span className="absolute left-0 text-hot" aria-hidden>
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-rule-light pt-5">
        <p className="type-label text-muted mb-2">{tests.learnedLabel}</p>
        <p className="type-body text-ink">{entry.learned}</p>
      </div>
    </article>
  );
}
