"use client";

import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

interface Props {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: Props) {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-full max-w-2xl bg-white rounded-2xl shadow-xl z-50 p-6 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-amber-950">
                  Order #{order._id.slice(-6)}
                </h3>
                <p className="text-xs text-gray-500">
                  {dayjs(order.createdAt).format("DD MMM YYYY")}
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-amber-950 bg-red-50 hover:text-black py-1 px-2 rounded-md"
              >
                ✕
              </button>
            </div>

            {/* Order Items */}
            <div className="space-y-2 border-2 rounded-lg p-4 mb-4">
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className="mb-4 text-sm text-gray-700">
              <h4 className="font-semibold mb-1">Shipping Address</h4>
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>
                {order.shippingAddress.addressLine1},{" "}
                {order.shippingAddress.city}
              </p>
              <p>
                {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
            </div>

            {/* Summary */}
            <div className="border-t pt-3 text-sm text-black">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.totalAmount}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div> */}
              <div className="flex justify-between font-semibold text-base mt-2">
                <span>Total</span>
                <span>${order.totalAmount}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
