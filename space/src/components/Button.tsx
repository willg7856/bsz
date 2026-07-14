import Link from "next/link";
import { nav } from "@/content";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "hot" | "dark" | "ghost";
  className?: string;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  hot: "bg-hot text-light hover:brightness-110",
  dark: "bg-transparent text-light border border-rule hover:border-dim",
  ghost: "bg-transparent text-hot hover:underline",
};

export function Button({
  href,
  children,
  variant = "hot",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`type-label inline-flex items-center justify-center px-5 py-3 rounded-machined transition-[filter,border-color,text-decoration] duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Logo({ showWordmark = true }: { showWordmark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-baseline gap-3 group">
      <span className="font-mono font-bold text-[18px] leading-none not-italic tracking-tight">
        <span className="text-light">{nav.logoMark}</span>
        <span className="text-hot">{nav.logoSlash}</span>
      </span>
      {showWordmark ? (
        <span className="type-label text-dim group-hover:text-light transition-colors duration-200 max-[479px]:hidden">
          {nav.wordmark}
        </span>
      ) : null}
    </Link>
  );
}
