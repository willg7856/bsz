import type { Metadata } from "next";
import { nozzles } from "@/content";
import { Section, Eyebrow, SectionTitle } from "@/components/Section";
import { SpecTable } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";

export const metadata: Metadata = {
  title: nozzles.meta.title,
  description: nozzles.meta.description,
  openGraph: {
    title: nozzles.meta.title,
    description: nozzles.meta.description,
  },
};

export default function NozzlesPage() {
  const { hero, why, goals, milestones } = nozzles;

  return (
    <>
      <Section tone="dark" className="!pt-16 md:!pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] items-end">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="type-hero mb-6">
              {hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                  {line === hero.titleLines[hero.titleLines.length - 1] ? (
                    <span className="text-hot">.</span>
                  ) : null}
                </span>
              ))}
            </h1>
            <p className="type-body text-dim">{hero.body}</p>
          </div>
          <SpecTable rows={hero.specs} />
        </div>
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <Eyebrow tone="muted">{why.eyebrow}</Eyebrow>
        <SectionTitle className="mb-5 !text-ink">{why.title}</SectionTitle>
        <p className="type-body text-ink/80 mb-10 max-w-3xl">{why.body}</p>

        <div className="grid gap-0 border border-rule-light sm:grid-cols-2">
          {goals.map((g, i) => (
            <div
              key={g.numeral}
              className={`p-6 md:p-8 border-rule-light ${
                i % 2 === 0 ? "sm:border-r" : ""
              } ${i < goals.length - 2 ? "border-b" : i < goals.length - (goals.length % 2 === 0 ? 0 : 1) ? "border-b sm:border-b-0" : ""} ${
                i < goals.length - (goals.length % 2 === 0 ? 2 : 1) ? "" : ""
              }`}
            >
              <p className="type-label text-muted mb-4">{g.numeral}</p>
              <h3 className="type-label text-ink font-bold mb-3">{g.title}</h3>
              <p className="type-body text-ink/75 max-w-none text-[15px]">{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>Programme milestones</Eyebrow>
        <div className="mt-8 max-w-3xl space-y-6">
          {milestones.map((m) => (
            <div key={m.title} className="border-l border-rule pl-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                <h3 className="type-label text-light font-bold">{m.title}</h3>
                <span
                  className={`type-label ${
                    m.status === "active" ? "text-hot" : "text-muted"
                  }`}
                >
                  {m.badge}
                </span>
              </div>
              <p className="type-body text-dim max-w-none text-[15px]">{m.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
