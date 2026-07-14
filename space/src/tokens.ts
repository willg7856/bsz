/**
 * Design tokens — the single source of truth for visual values.
 * Wired into tailwind.config.ts / globals.css @theme.
 * Components must never hardcode hex values; use Tailwind token classes.
 */

export const colors = {
  dark: "#0A0A0C",
  nav: "#121215",
  panel: "#101116",
  rule: "#24262B",
  light: "#FAFAF7",
  lightAlt: "#EFEFEC",
  ruleLight: "#D8D8D2",
  ink: "#12141A",
  muted: "#6E757C",
  dim: "#8E959C",
  hot: "#FF5722",
  statusPartial: "#E2B93B",
  statusFailure: "#E5484D",
  statusSuccess: "#21B573",
  airbrake: "#22C3D6",
  white: "#FFFFFF",
} as const;

export const fonts = {
  mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
  sans: "var(--font-archivo), system-ui, sans-serif",
} as const;

export const typeScale = {
  hero: "clamp(52px, 9vw, 96px)",
  section: "clamp(30px, 5vw, 56px)",
  subhead: "clamp(22px, 3.4vw, 40px)",
  label: "11px",
  labelLg: "12px",
  body: "17px",
} as const;

export const spacing = {
  container: "1120px",
  sectionY: "clamp(64px, 9vw, 120px)",
  sectionX: "clamp(20px, 4vw, 40px)",
  radius: "3px",
  perforatedH: "14px",
} as const;

export const layout = {
  bodyMaxWidth: "56ch",
  gridMin: "260px",
  labelTracking: "0.14em",
  heroTracking: "-0.02em",
} as const;
