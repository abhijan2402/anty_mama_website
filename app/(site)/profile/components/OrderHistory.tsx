"use client";

import { useState } from "react";
import { useGetOrderQuery } from "@/lib/api/cartApi";
import dayjs from "dayjs";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderHistory() {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const limit = 10;

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
    <>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-amber-900">
          Order History
        </h2>

        {orders.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-10">
            No orders yet 🛒
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="border rounded-2xl p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
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

              <div className="text-sm text-gray-700 mb-3">
                {order.items.length} item(s) • ${order.totalAmount}
              </div>

              <button
                onClick={() => setSelectedOrder(order)}
                className="text-sm font-medium text-amber-900 hover:underline"
              >
                View Details →
              </button>
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

      {/* Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
