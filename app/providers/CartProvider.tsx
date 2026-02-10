"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { Brand } from "./BrandProvider";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  brand: Brand;
  quantity: number; // <-- added
};

type CartContextType = {
  items: CartItem[];
  groupedItems: {
    antyMama: CartItem[];
    nurseCam: CartItem[];
  };
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    console.log(item);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev; // item already in cart
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return; // do not allow 0
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const groupedItems = useMemo(
    () => ({
      antyMama: items.filter((i) => i.brand === "ANTY_MAMA"),
      nurseCam: items.filter((i) => i.brand === "NURSE_CAM"),
    }),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [items]
  );

  const cartCount = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        groupedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

// Hook to get cart count easily
export const useCartCount = () => {
  const { cartCount } = useCart();
  return cartCount;
};
