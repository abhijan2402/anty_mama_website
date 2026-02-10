import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import { brandTheme } from "@/lib/brandTheme";
import { useBrand } from "@/app/providers/BrandProvider";
import { useCart } from "@/app/providers/CartProvider";
import { getImageUrl } from "@/lib/utils";

export function ProductCard({ product }: any) {
  const { addToCart, items } = useCart();
  const { brand } = useBrand();
  const theme = brandTheme[brand];

  const alreadyAdded = items.some((i: any) => i.id === product._id);
  const image = getImageUrl(product.images?.[0]) || "/placeholder.png";

  return (
    <div
      className="rounded-xl overflow-hidden transition hover:shadow-md"
      style={{ border: `1px solid ${theme.border}` }}
    >
      <Link
        href={`/products/${product._id}`}
        className="block relative aspect-[4/5] bg-gray-100"
      >
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="p-3 space-y-2">
        <Link href={`/products/${product._id}`}>
          <h3
            className="text-sm font-medium line-clamp-2 hover:underline"
            style={{ color: theme.text }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-base font-semibold" style={{ color: theme.primary }}>
          {product.currency} {product.price}
        </p>

        <AddToCartButton
          color={theme.primary}
          textColor={theme.subtext}
          onAdd={() =>
            addToCart({
              id: product._id,
              name: product.name,
              price: product.price,
              brand,
            })
          }
          alreadyAdded={alreadyAdded}
        />
      </div>
    </div>
  );
}
