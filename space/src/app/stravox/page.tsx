import type { Metadata } from "next";
import { stravox } from "@/content";
import { Section, Eyebrow, SectionTitle } from "@/components/Section";
import { Button } from "@/components/Button";
import { SpecTable } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";
import { PlaceholderBox } from "@/components/Placeholders";
import { BuildStages, FlightPhases } from "@/components/StravoxBlocks";

export const metadata: Metadata = {
  title: stravox.meta.title,
  description: stravox.meta.description,
  openGraph: {
    title: stravox.meta.title,
    description: stravox.meta.description,
  },
};

export default function StravoxPage() {
  const { hero, cutaway, specs, stages, flight, cta } = stravox;

  return (
    <>
      <Section tone="dark" className="!pt-16 md:!pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-end">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <SectionTitle as="h1" className="mb-5" hotStop={false}>
              {hero.title}
            </SectionTitle>
            <p className="type-body text-dim">{hero.body}</p>
          </div>
          <SpecTable rows={hero.specs} />
        </div>
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <PlaceholderBox
            label="STRAVOX CUTAWAY"
            alt={cutaway.imageAlt}
            aspect="aspect-[3/5]"
          />
          <ol className="relative border-l border-rule-light pl-6 space-y-7">
            {cutaway.subsystems.map((sys) => (
              <li key={sys.number}>
                <p className="type-stat text-hot text-xl mb-1">{sys.number}</p>
                <h3 className="type-label text-ink mb-2">{sys.title}</h3>
                <p className="type-body text-ink/80 max-w-none text-[15px]">
                  {sys.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="light" className="!pt-0">
        <Eyebrow tone="muted">{specs.eyebrow}</Eyebrow>
        <SectionTitle className="mb-4" hotStop={false}>
          {specs.title}
        </SectionTitle>
        <p className="type-body text-ink/80 mb-10">{specs.intro}</p>
        <div className="grid-auto gap-px border-t border-rule-light">
          {specs.cells.map((cell) => (
            <div key={cell.label} className="border-b border-rule-light py-5 pr-4">
              <p className="type-label text-muted mb-3">{cell.label}</p>
              <p className="type-stat text-[clamp(28px,4vw,42px)] text-ink leading-none">
                {cell.value}
                <span className="text-[0.45em] ml-1 align-super text-muted">
                  {cell.unit}
                </span>
              </p>
              <p className="type-body text-ink/70 mt-3 max-w-none text-[14px]">
                {cell.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="light-alt">
        <Eyebrow tone="muted">{stages.eyebrow}</Eyebrow>
        <SectionTitle className="mb-4">{stages.title}</SectionTitle>
        <p className="type-body text-ink/80 mb-8">{stages.intro}</p>
        <BuildStages />
      </Section>

      <Section tone="light">
        <Eyebrow tone="muted">{flight.eyebrow}</Eyebrow>
        <SectionTitle className="mb-10" hotStop={false}>
          {flight.title}
        </SectionTitle>
        <FlightPhases />
      </Section>

      <Section tone="light-alt">
        <Eyebrow tone="muted">{cta.eyebrow}</Eyebrow>
        <SectionTitle className="mb-4">{cta.title}</SectionTitle>
        <p className="type-body text-ink/80 mb-6">{cta.body}</p>
        <Button href={cta.link.href} variant="hot">
          {cta.link.label}
        </Button>
      </Section>
    </>
  );
}
