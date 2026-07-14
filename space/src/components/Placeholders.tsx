import { colors } from "@/tokens";

/** Marked placeholders until real assets land. */

export function PlaceholderBox({
  label,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  label: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden rounded-machined border border-rule bg-panel ${aspect} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(160deg, ${colors.panel} 0%, ${colors.dark} 45%, ${colors.hot} 160%)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-4 gap-2">
        <span className="type-label text-hot">PLACEHOLDER ASSET</span>
        <span className="type-label text-dim">{label}</span>
      </div>
    </div>
  );
}

export function PartnerLogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      role="img"
      aria-label={`${name} logo placeholder`}
      className="border border-rule-light rounded-machined px-5 py-6 bg-light min-h-[88px] flex items-center"
    >
      <div>
        <p className="type-label text-muted mb-2">Partner logo placeholder</p>
        <p className="type-stat text-ink text-lg">{name}</p>
      </div>
    </div>
  );
}

export function FlightDiagramPlaceholder({
  title,
  colorClass,
}: {
  title: string;
  colorClass: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder flight-profile diagram for ${title} phase`}
      className="border border-rule-light rounded-machined bg-light-alt aspect-[16/9] relative overflow-hidden"
    >
      <div className={`absolute top-0 inset-x-0 h-1.5 ${colorClass}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="type-label text-muted text-center px-4">
          PLACEHOLDER · {title} DIAGRAM
        </p>
      </div>
    </div>
  );
}
