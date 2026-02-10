"use client";

import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import clsx from "clsx";

type Props = {
  categories: string[];
  active: string | null;
  onChange: (v: string | null) => void;
};

export function ProductFilters({ categories, active, onChange }: Props) {
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  return (
    <div className="space-y-4">
      {/* Section title */}
      <h4
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: theme.text }}
      >
        Categories
      </h4>

      <div className="space-y-1.5">
        {/* All */}
        <button
          onClick={() => onChange(null)}
          className={clsx(
            "w-full text-left px-3 py-2 rounded-md text-sm transition",
            active === null ? "font-medium" : "hover:opacity-80"
          )}
          style={{
            backgroundColor: active === null ? theme.primary : "transparent",
            color: active === null ? theme.subtext : theme.muted,
          }}
        >
          All Products
        </button>

        {/* Categories */}
        {categories.map((c) => {
          const isActive = active === c;

          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-md text-sm transition"
              )}
              style={{
                backgroundColor: isActive ? theme.primary : "transparent",
                color: isActive ? theme.subtext : theme.muted,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
