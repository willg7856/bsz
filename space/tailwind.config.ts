import type { Config } from "tailwindcss";
import { colors, fonts, spacing } from "./src/tokens";

/**
 * Theme values mirror src/tokens.ts.
 * Tailwind v4 also reads these via @theme in globals.css — keep both in sync.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: colors.dark,
        nav: colors.nav,
        panel: colors.panel,
        rule: colors.rule,
        light: colors.light,
        "light-alt": colors.lightAlt,
        "rule-light": colors.ruleLight,
        ink: colors.ink,
        muted: colors.muted,
        dim: colors.dim,
        hot: colors.hot,
        "status-partial": colors.statusPartial,
        "status-failure": colors.statusFailure,
        "status-success": colors.statusSuccess,
        airbrake: colors.airbrake,
      },
      fontFamily: {
        mono: fonts.mono.split(",").map((s) => s.trim()),
        sans: fonts.sans.split(",").map((s) => s.trim()),
      },
      maxWidth: {
        container: spacing.container,
        prose: "56ch",
      },
      borderRadius: {
        machined: spacing.radius,
      },
    },
  },
  plugins: [],
};

export default config;
