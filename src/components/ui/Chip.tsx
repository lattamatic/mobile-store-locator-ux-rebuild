import type { ButtonHTMLAttributes, ReactNode } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  children: ReactNode;
};

export function Chip({ active, children, className = "", ...props }: ChipProps) {
  return (
    <button
      className={`shrink-0 rounded-full border px-3 py-2 text-sm font-medium transition ${
        active ? "border-ink bg-ink text-white" : "border-champagne bg-white text-ink hover:border-rosewood"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
