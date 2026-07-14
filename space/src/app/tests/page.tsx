import type { Metadata } from "next";
import { tests } from "@/content";
import { Section, Eyebrow, SectionTitle } from "@/components/Section";
import { StatGrid } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";
import { TestEntry } from "@/components/TestEntry";

export const metadata: Metadata = {
  title: tests.meta.title,
  description: tests.meta.description,
  openGraph: {
    title: tests.meta.title,
    description: tests.meta.description,
  },
};

export default function TestsPage() {
  const { hero, inventory, next, campaigns } = tests;

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

      <Section tone="light-alt">
        <Eyebrow tone="muted">{inventory.eyebrow}</Eyebrow>
        <SectionTitle className="mb-8">{inventory.title}</SectionTitle>
        <StatGrid items={inventory.summaryStats} light />
        <div className="grid-auto gap-4 mt-10">
          {inventory.cards.map((card) => (
            <div
              key={card.title}
              className="border border-rule-light rounded-machined p-5 bg-light"
            >
              <p className="type-stat text-[40px] text-ink leading-none">{card.value}</p>
              <p className="type-label text-ink mt-3">{card.title}</p>
              <p className="type-body text-ink/70 mt-3 max-w-none text-[15px]">
                {card.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>{next.eyebrow}</Eyebrow>
        <SectionTitle className="mb-8">{next.title}</SectionTitle>
        <div className="border border-rule rounded-machined p-6 bg-panel">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="type-label text-dim">{next.code}</span>
            <span className="type-label text-status-partial border border-status-partial px-2 py-1 rounded-machined">
              {next.badge}
            </span>
          </div>
          <h3 className="type-stat text-[clamp(20px,3vw,28px)] text-light mb-4">
            {next.name}
          </h3>
          <p className="type-body text-dim mb-4">{next.body}</p>
          <p className="type-label text-muted">
            Engine · <span className="text-light">{next.engine}</span>
          </p>
        </div>
      </Section>

      <Section tone="light">
        <Eyebrow tone="muted">{tests.logEyebrow}</Eyebrow>
        <SectionTitle className="mb-10">{tests.logTitle}</SectionTitle>
        <div className="space-y-14">
          {campaigns.map((campaign) => (
            <div key={campaign.id}>
              <header className="mb-6 pb-4 border-b border-rule-light">
                <p className="type-label text-muted mb-2">
                  {campaign.title} · {campaign.date}
                </p>
                <p className="type-body text-ink/80 max-w-none">{campaign.summary}</p>
              </header>
              <div className="space-y-6">
                {campaign.entries.map((entry) => (
                  <TestEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
