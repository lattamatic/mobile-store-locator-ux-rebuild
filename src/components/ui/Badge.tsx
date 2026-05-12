import type { ReactNode } from "react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        tone === "success" ? "bg-sage text-white" : "bg-blush text-rosewood"
      }`}
    >
      {children}
    </span>
  );
}
