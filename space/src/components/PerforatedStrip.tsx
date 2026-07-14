import { colors, spacing } from "@/tokens";

export function PerforatedStrip() {
  return (
    <div
      aria-hidden="true"
      className="w-full"
      style={{
        height: spacing.perforatedH,
        backgroundColor: colors.light,
        backgroundImage: `repeating-linear-gradient(90deg, ${colors.dark} 0px, ${colors.dark} 44px, transparent 44px, transparent 52px)`,
      }}
    />
  );
}
