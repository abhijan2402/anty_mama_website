"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

type Props = {
  address: any;
  onEdit: (addr: any) => void;
  onDelete: (id: string) => void;
  brandTheme:any;
};

export default function AddressCard({ address, onEdit, onDelete, brandTheme }: Props) {
  return (
    <div className="relative rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="space-y-1">
        <p className="font-semibold text-gray-900">{address.fullName}</p>
        <p className="text-sm text-gray-600">{address.phone}</p>
        <p className="text-sm text-gray-600">{address.addressLine1}</p>
        <p className="text-sm text-gray-600">
          {address.city}, {address.state} - {address.postalCode}
        </p>
        <p className="text-sm text-gray-600">{address.country}</p>
      </div>

      {/* ACTIONS */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(address)}
          className="p-2 rounded-lg border text-amber-900 hover:bg-gray-50"
        >
          <FiEdit2 size={14} />
        </button>

        <button
          onClick={() => onDelete(address._id)}
          className="p-2 rounded-lg border hover:bg-red-50 text-red-600"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}
