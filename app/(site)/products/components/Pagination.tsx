import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";

export function Pagination({ page, total, onChange }: any) {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const pages = Math.ceil(total);

  return (
    <div className="flex justify-center gap-2 mt-12">
      {Array.from({ length: pages }).map((_, i) => {
        const active = page === i + 1;

        return (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className="h-8 w-8 rounded-full text-xs font-medium transition"
            style={{
              backgroundColor: active ? theme.primary : "transparent",
              color: active ? theme.subtext : theme.muted,
              border: `1px solid ${theme.border}`,
            }}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
