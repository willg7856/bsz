import type { Metadata } from "next";
import { home } from "@/content";
import { Section, Eyebrow, SectionTitle, HotWordmark } from "@/components/Section";
import { Button } from "@/components/Button";
import { SpecTable, StatGrid } from "@/components/SpecTable";
import { PerforatedStrip } from "@/components/PerforatedStrip";
import { PartnerLogoPlaceholder, PlaceholderBox } from "@/components/Placeholders";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  openGraph: {
    title: home.meta.title,
    description: home.meta.description,
  },
};

export default function HomePage() {
  const { hero, partners, stats, teaser, projects } = home;

  return (
    <>
      <Section tone="dark" className="!pt-16 md:!pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-end">
          <div className="fade-in">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <HotWordmark lines={hero.wordmarkLines} />
            <div className="h-px bg-rule my-8 max-w-md" />
            <p className="type-subhead mb-5">{hero.subhead}</p>
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
          <div className="fade-in" style={{ animationDelay: "120ms" }}>
            <SpecTable rows={hero.specs} />
          </div>
        </div>
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <Eyebrow tone="muted">{partners.eyebrow}</Eyebrow>
        <div className="grid gap-4 md:grid-cols-2 mt-2">
          {partners.items.map((p) => (
            <div key={p.name}>
              <PartnerLogoPlaceholder name={p.name} />
              {p.note ? (
                <p className="type-label text-muted mt-2">{p.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="light" className="!pt-0">
        <StatGrid items={stats} light />
      </Section>

      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <Eyebrow>{teaser.eyebrow}</Eyebrow>
            <SectionTitle className="mb-5">{teaser.title}</SectionTitle>
            <p className="type-body text-dim mb-8">{teaser.body}</p>
            <Button href={teaser.link.href} variant="ghost">
              {teaser.link.label}
            </Button>
          </div>
          <PlaceholderBox label="STRAVOX RENDER" alt={teaser.imageAlt} />
        </div>
      </Section>

      {projects.map((project) => {
        const dark = project.tone === "dark";
        return (
          <Section key={project.title} tone={dark ? "dark" : "light"}>
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
              <div>
                <Eyebrow tone={dark ? undefined : "muted"}>{project.eyebrow}</Eyebrow>
                <SectionTitle className={`mb-5 ${dark ? "" : "!text-ink"}`}>
                  {project.title}
                </SectionTitle>
                <p className={`type-body mb-8 ${dark ? "text-dim" : "text-ink/75"}`}>
                  {project.body}
                </p>
                <Button href={project.link.href} variant={dark ? "ghost" : "hot"}>
                  {project.link.label}
                </Button>
              </div>
              <dl className={`w-full border-y ${dark ? "border-rule" : "border-rule-light"}`}>
                {project.meta.map((row) => (
                  <div
                    key={row.label}
                    className={`spec-row ${dark ? "" : "!border-rule-light"}`}
                  >
                    <dt className={`type-label shrink-0 ${dark ? "text-muted" : "text-muted"}`}>
                      {row.label}
                    </dt>
                    <dd
                      className={`type-stat text-right ${
                        dark ? "text-light" : "text-ink"
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>
        );
      })}
    </>
  );
}
