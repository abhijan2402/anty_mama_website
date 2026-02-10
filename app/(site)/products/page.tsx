"use client";

import { useState } from "react";
import { useBrand } from "@/app/providers/BrandProvider";
import { brandTheme } from "@/lib/brandTheme";
import { SearchBar } from "./components/SearchBar";
import { ProductCard } from "./components/ProductCard";
import { Pagination } from "./components/Pagination";
import { useGetProductsQuery } from "@/lib/api/productApi";
import { EmptyProducts } from "../components/EmptyProducts";

const PER_PAGE = 6;

const BRAND_MAP: Record<string, "anty-mama" | "nurse-cam"> = {
  ANTY_MAMA: "anty-mama",
  NURSE_CAM: "nurse-cam",
};

export default function ProductsPage() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const apiBrand = BRAND_MAP[brand];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetProductsQuery({
    brand: apiBrand,
    search,
    page,
    limit: PER_PAGE,
    isActive: true,
    sortBy: "createdAt",
    order: "desc",
  });

  const products = data?.products ?? [];
  const pagination = data?.pagination;

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        Loading products…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: theme.text }}
          >
            Our Products
          </h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: theme.muted }}>
            Explore our carefully curated range designed for performance,
            durability, and everyday use.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />

        {/* Products */}
        {products.length === 0 ? (
          <EmptyProducts search={search} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            {products.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination?.pages > 1 && (
          <Pagination
            page={pagination.page}
            total={pagination.pages}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
