import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import { brandTheme } from "@/lib/brandTheme";
import { useBrand } from "@/app/providers/BrandProvider";
import { useCart } from "@/app/providers/CartProvider";
import { getImageUrl } from "@/lib/utils";
import { useAddToCartMutation } from "@/lib/api/cartApi";
import { toast } from "sonner";

export function ProductCard({ product }: any) {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const { brand } = useBrand();
  const theme = brandTheme[brand];

  const image = getImageUrl(product.images?.[0]) || "/placeholder.png";

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product._id }).unwrap();
      toast.success("Added to cart");
    } catch (err: any) {
      if (err?.status === 409) {
        toast.info("Item already in cart");
      } else {
        toast.error("Failed to add item");
      }
    }
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition hover:shadow-md"
      style={{ border: `1px solid ${theme.border}` }}
    >
      <Link
        href={`/products/${product._id}`}
        className="block relative aspect-[3/4] bg-gray-100"
      >
        <Image src={image} alt={product.name} fill className="object-contain" />
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
          loading={isLoading}
          onAdd={handleAddToCart}
        />
      </div>
    </div>
  );
}
