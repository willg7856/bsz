import type { Metadata } from "next";
import { contact, site } from "@/content";
import { Section, Eyebrow, SectionTitle } from "@/components/Section";
import { PerforatedStrip } from "@/components/PerforatedStrip";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  openGraph: {
    title: contact.meta.title,
    description: contact.meta.description,
  },
};

export default function ContactPage() {
  const { hero, reasons, form } = contact;

  return (
    <>
      <Section tone="dark" className="!pt-16 md:!pt-24">
        <div className="grid gap-10 lg:grid-cols-2 items-end">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <SectionTitle as="h1" className="mb-5">
              {hero.title}
            </SectionTitle>
            <p className="type-body text-dim">{hero.body}</p>
          </div>
          <div>
            <p className="type-label text-muted mb-3">{hero.emailLabel}</p>
            <a
              href={`mailto:${site.email}`}
              className="type-stat text-hot text-[clamp(20px,3vw,32px)] hover:underline break-all"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Section>

      <PerforatedStrip />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow tone="muted">{reasons.eyebrow}</Eyebrow>
            <ul className="border border-rule-light rounded-machined divide-y divide-rule-light">
              {reasons.items.map((reason) => (
                <li key={reason.label}>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(reason.subject)}`}
                    className="flex items-center justify-between gap-4 px-4 py-4 type-label text-ink hover:bg-light-alt transition-colors duration-200"
                  >
                    <span>{reason.label}</span>
                    <span className="text-hot" aria-hidden>
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="type-label text-muted mb-5">{form.title}</p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
