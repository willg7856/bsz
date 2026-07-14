import Link from "next/link";
import { footer, site, nav } from "@/content";
import { Logo } from "@/components/Button";

export function Footer() {
  return (
    <footer className="bg-dark text-light border-t border-rule">
      <div className="container-site section-pad grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="type-body text-dim mt-4">{site.tagline}</p>
        </div>
        <div>
          <p className="type-label text-muted mb-4">{footer.pagesLabel}</p>
          <ul className="space-y-2">
            {footer.pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="type-label text-dim hover:text-light transition-colors duration-200"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="type-label text-muted mb-4">{footer.contactLabel}</p>
          <a
            href={`mailto:${site.email}`}
            className="type-label text-hot block mb-2 hover:underline"
          >
            {site.email}
          </a>
          <p className="type-label text-dim">{site.location}</p>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="container-site py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="type-label text-muted">{site.copyright}</p>
          <p className="type-label text-muted">{site.foundedLine}</p>
          <span className="sr-only">{nav.wordmark}</span>
        </div>
      </div>
    </footer>
  );
}
