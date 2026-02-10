export default function OrderHistory() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-amber-900">
        Order History
      </h2>

      <div className="text-sm text-gray-500 text-center py-10">
        No orders yet 🛒
        <br />
        Your past orders will appear here.
      </div>
    </div>
  );
}
