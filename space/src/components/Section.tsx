type SectionProps = {
  children: React.ReactNode;
  tone?: "dark" | "light" | "light-alt" | "nav" | "panel";
  className?: string;
  id?: string;
  as?: "section" | "div" | "header" | "footer";
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  dark: "bg-dark text-light",
  light: "bg-light text-ink",
  "light-alt": "bg-light-alt text-ink",
  nav: "bg-nav text-light",
  panel: "bg-panel text-light",
};

export function Section({
  children,
  tone = "dark",
  className = "",
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={`${toneClass[tone]} ${className}`}>
      <div className="container-site section-pad">{children}</div>
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "dim",
}: {
  children: React.ReactNode;
  tone?: "dim" | "muted" | "hot" | "ink";
}) {
  const color =
    tone === "dim"
      ? "text-dim"
      : tone === "muted"
        ? "text-muted"
        : tone === "hot"
          ? "text-hot"
          : "text-ink";
  return <p className={`type-label ${color} mb-4`}>{children}</p>;
}

export function SectionTitle({
  children,
  hotStop = true,
  as: Tag = "h2",
  className = "",
}: {
  children: string;
  hotStop?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const endsWithStop = children.trim().endsWith(".");
  const text = endsWithStop ? children.trim().slice(0, -1) : children;

  return (
    <Tag className={`type-section ${className}`}>
      {text}
      {hotStop ? <span className="text-hot">.</span> : endsWithStop ? "." : null}
    </Tag>
  );
}

export function HotWordmark({
  lines,
  as: Tag = "h1",
}: {
  lines: readonly string[];
  as?: "h1" | "h2";
}) {
  return (
    <Tag className="type-hero">
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        const isZero = line.toUpperCase() === "ZERO";
        return (
          <span key={line} className="block">
            {isZero || isLast ? (
              <>
                <span className={isZero ? "text-hot" : undefined}>{line}</span>
                {isLast ? <span className="text-hot">.</span> : null}
              </>
            ) : (
              line
            )}
          </span>
        );
      })}
    </Tag>
  );
}
