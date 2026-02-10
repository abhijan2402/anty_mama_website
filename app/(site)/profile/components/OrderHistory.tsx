"use client";

import { useState } from "react";
import { useGetOrderQuery } from "@/lib/api/cartApi";
import dayjs from "dayjs";

export default function OrderHistory() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetOrderQuery({ page, limit });

  const orders = data?.orders || [];
  const pagination = data?.pagination || {};

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-sm text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-amber-900">
        Order History
      </h2>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-sm text-gray-500 text-center py-10">
          No orders yet 🛒
          <br />
          Your past orders will appear here.
        </div>
      )}

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order._id} className="border rounded-xl p-4 text-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-900">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-xs text-gray-500">
                  {dayjs(order.createdAt).format("DD MMM YYYY")}
                </p>
              </div>

              <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 capitalize">
                {order.orderStatus}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-1">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-gray-700">
                  <span className="truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-3 pt-3 border-t font-semibold">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
