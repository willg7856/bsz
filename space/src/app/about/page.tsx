import type { Metadata } from "next";
import { about } from "@/content";
import { Section, Eyebrow, SectionTitle, HotWordmark } from "@/components/Section";
import { StatGrid } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  openGraph: {
    title: about.meta.title,
    description: about.meta.description,
  },
};

export default function AboutPage() {
  const { hero, mission, quote, values } = about;

  return (
    <>
      <Section tone="dark" className="!pt-16 md:!pt-24">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <HotWordmark lines={hero.wordmarkLines} />
        <p className="type-body text-dim mt-8 mb-10">{hero.body}</p>
        <StatGrid items={hero.stats} />
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow tone="muted">{mission.eyebrow}</Eyebrow>
            <SectionTitle>{mission.title}</SectionTitle>
          </div>
          <p className="type-body text-ink">{mission.body}</p>
        </div>

        <div className="h-px bg-rule-light my-12" />

        <div className="grid gap-10 lg:grid-cols-2">
          <blockquote className="border-l-[3px] border-hot pl-5">
            <p className="type-stat text-[clamp(18px,2.5vw,26px)] text-ink leading-snug">
              {quote.text}
            </p>
          </blockquote>
          <div className="space-y-5">
            {quote.side.map((para) => (
              <p key={para.slice(0, 24)} className="type-body text-ink">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>{values.eyebrow}</Eyebrow>
        <div className="grid-auto gap-px mt-6">
          {values.items.map((item) => (
            <div key={item.numeral} className="border-t border-rule pt-5">
              <p className="type-stat text-hot text-2xl mb-3">{item.numeral}</p>
              <h3 className="type-label text-light mb-3">{item.title}</h3>
              <p className="type-body text-dim max-w-none text-[15px]">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
