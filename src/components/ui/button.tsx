import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "text";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`button button--${variant} ${className}`}>
      {children}
      {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </Link>
  );
}
