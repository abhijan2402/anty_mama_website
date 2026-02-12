// components/CheckoutModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBrand } from "@/app/providers/BrandProvider";
import { MapPin, CreditCard, Truck, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/lib/api/authApi";
import { useCreateOrderMutation } from "@/lib/api/cartApi";
import { brandTheme } from "@/lib/brandTheme";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: any[];
  totalAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  cartItems,
  totalAmount,
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const { data: profile } = useGetProfileQuery();
  const [createOrder] = useCreateOrderMutation();
  const router = useRouter();

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedAddress = profile?.addresses?.find(
    (addr: any) => addr._id === selectedAddressId
  );

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        items: cartItems.map((item: any) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: selectedAddress.fullName || profile?.name,
          phone: selectedAddress.phone || profile?.mobile,
          addressLine1: selectedAddress.addressLine1,
          addressLine2: selectedAddress.addressLine2 || "",
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: "India",
          isDefault: selectedAddress.isDefault || false,
        },
        paymentProvider: "stripe",
        paymentIntentId: "",
      }).unwrap();

      toast.success("Order placed successfully");
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              max-w-4xl w-full max-h-[90vh] overflow-y-auto 
              bg-white rounded-2xl border shadow-xl z-50 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: theme.primary }}
                  >
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: theme.text }}
                    >
                      Complete Order
                    </h2>
                    <p className="text-xs" style={{ color: theme.muted }}>
                      {cartItems.length} items • ${totalAmount}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-amber-900 bg-red-50"
                >
                  ✕
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Addresses */}
                <div>
                  <h3
                    className="text-sm font-semibold mb-4 flex items-center gap-2"
                    style={{ color: theme.text }}
                  >
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </h3>

                  {/* CONDITIONAL RENDERING */}
                  {profile?.addresses?.length === 0 ? (
                    <div className="border-2 border-dashed rounded-xl p-6 text-center bg-gray-100">
                      <p className="text-sm text-gray-600 mb-4">
                        No delivery address found.
                      </p>

                      <button
                        onClick={() => {
                          onClose();
                          // you can route to address page here
                          router.push("/profile?tab=addresses");
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{
                          background: theme.primary,
                          color: theme.subtext,
                        }}
                      >
                        + Add New Address
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {profile?.addresses?.map((address: any) => (
                        <div
                          key={address._id}
                          onClick={() => setSelectedAddressId(address._id)}
                          className="cursor-pointer p-4 border rounded-xl transition"
                          style={{
                            borderColor:
                              selectedAddressId === address._id
                                ? theme.primary
                                : theme.border,
                            background:
                              selectedAddressId === address._id
                                ? `${theme.primary}08`
                                : "white",
                          }}
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {address.fullName || address.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {address.addressLine1}, {address.city}
                          </p>
                          <p className="text-xs text-gray-500">
                            {address.state} {address.postalCode}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-4">
                  <h3
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: theme.text }}
                  >
                    <Truck className="w-4 h-4" />
                    Order Summary
                  </h3>

                  <div className="space-y-2 max-h-56 overflow-y-auto border rounded-lg p-3 text-gray-800">
                    {cartItems.map((item: any) => (
                      <div
                        key={item.productId._id}
                        className="flex justify-between text-sm"
                      >
                        <span className="truncate">
                          {item.productId.name} × {item.quantity}
                        </span>
                        <span>${item.productId.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg text-gray-800">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalAmount}</span>
                    </div>
                    {/* <div className="flex justify-between text-gray-800">
                      <span>Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div> */}
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedAddress || loading}
                    className="w-full h-11 rounded-xl text-sm font-semibold 
                      flex items-center justify-center gap-2 
                      disabled:opacity-50"
                    style={{
                      background: theme.primary,
                      color: theme.subtext,
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                        Placing Order
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-gray-500">
                    Secure checkout • SSL encrypted
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
