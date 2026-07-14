import type { Metadata } from "next";
import { b1m } from "@/content";
import { Section, Eyebrow, SectionTitle } from "@/components/Section";
import { Button } from "@/components/Button";
import { SpecTable } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";

export const metadata: Metadata = {
  title: b1m.meta.title,
  description: b1m.meta.description,
  openGraph: {
    title: b1m.meta.title,
    description: b1m.meta.description,
  },
};

export default function B1mPage() {
  const { hero, why, objectives, specs, milestones } = b1m;

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
            <p className="type-body text-dim mb-8">{hero.body}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={hero.ctaPrimary.href} variant="hot">
                {hero.ctaPrimary.label}
              </Button>
              <Button href={hero.ctaSecondary.href} variant="dark">
                {hero.ctaSecondary.label}
              </Button>
            </div>
          </div>
          <SpecTable rows={hero.specs} />
        </div>
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <Eyebrow tone="muted">{why.eyebrow}</Eyebrow>
        <SectionTitle className="mb-5 !text-ink">{why.title}</SectionTitle>
        <p className="type-body text-ink/80 mb-10 max-w-3xl">{why.body}</p>

        <div className="grid gap-0 border border-rule-light md:grid-cols-2">
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-rule-light">
            <p className="type-label text-muted mb-5">Flight objectives</p>
            <ul className="space-y-3">
              {objectives.map((obj) => (
                <li key={obj} className="type-body text-ink max-w-none text-[15px] flex gap-3">
                  <span className="text-muted font-mono" aria-hidden>○</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 md:p-8 bg-light">
            <SpecTable rows={specs} light />
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>Path to first flight</Eyebrow>
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
