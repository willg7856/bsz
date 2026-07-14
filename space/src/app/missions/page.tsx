import type { Metadata } from "next";
import { missions } from "@/content";
import { Section, Eyebrow, SectionTitle } from "@/components/Section";
import { SpecTable, StatGrid } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";

export const metadata: Metadata = {
  title: missions.meta.title,
  description: missions.meta.description,
  openGraph: {
    title: missions.meta.title,
    description: missions.meta.description,
  },
};

export default function MissionsPage() {
  const { hero, primary, pipeline } = missions;

  return (
    <>
      <Section tone="dark" className="!pt-16 md:!pt-24">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <SectionTitle as="h1" className="mb-5">
          {hero.title}
        </SectionTitle>
        <p className="type-body text-dim mb-10">{hero.body}</p>
        <StatGrid items={hero.stats} />
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <article className="border border-rule-light rounded-machined p-5 md:p-8 bg-light">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="type-label text-muted">{primary.code}</span>
            <span className="type-label text-hot border border-hot px-2 py-1 rounded-machined">
              {primary.badge}
            </span>
          </div>
          <h2 className="type-stat text-[clamp(26px,4vw,40px)] text-ink mb-2">
            {primary.name}
          </h2>
          <p className="type-subhead !text-[clamp(16px,2vw,22px)] mb-6">
            {primary.subtitle}
          </p>
          <p className="type-body text-ink mb-8 max-w-none">{primary.body}</p>

          <p className="type-label text-muted mb-3">{primary.objectivesLabel}</p>
          <ul className="grid gap-2 sm:grid-cols-2 mb-10">
            {primary.objectives.map((obj) => (
              <li key={obj} className="type-body text-ink/85 max-w-none text-[15px] pl-4 relative">
                <span className="absolute left-0 text-hot" aria-hidden>
                  —
                </span>
                {obj}
              </li>
            ))}
          </ul>

          <SpecTable rows={primary.specs} light />

          <p className="type-label text-muted mt-10 mb-5">
            {primary.milestonesLabel}
          </p>
          <div className="grid-auto gap-3">
            {primary.milestones.map((m) => (
              <div
                key={m.title}
                className="border border-rule-light rounded-machined p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full border ${
                      m.status === "active"
                        ? "bg-hot border-hot"
                        : "bg-transparent border-muted"
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`type-label ${
                      m.status === "active" ? "text-hot" : "text-muted"
                    }`}
                  >
                    {m.badge}
                  </span>
                </div>
                <h3 className="type-label text-ink mb-2">{m.title}</h3>
                <p className="type-body text-ink/70 max-w-none text-[14px]">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </article>
      </Section>

      <Section tone="light-alt">
        <Eyebrow tone="muted">{pipeline.eyebrow}</Eyebrow>
        <SectionTitle className="mb-4">{pipeline.title}</SectionTitle>
        <p className="type-body text-ink/80 mb-8">{pipeline.intro}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {pipeline.cards.map((card) => (
            <article
              key={card.code}
              className="border border-rule-light rounded-machined p-5 bg-light"
            >
              <p className="type-label text-muted mb-2">{card.code}</p>
              <h3 className="type-stat text-ink text-xl mb-3">{card.title}</h3>
              <p className="type-body text-ink/80 max-w-none text-[15px] mb-4">
                {card.summary}
              </p>
              <p className="type-label text-muted">{card.date}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
