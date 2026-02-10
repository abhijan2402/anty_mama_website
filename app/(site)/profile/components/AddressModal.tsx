"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, MapPin } from "lucide-react";

type AddressForm = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddressForm) => void;
  initialData?: AddressForm | null;
  brandTheme: any;
};

const EMPTY_FORM: AddressForm = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: true,
};

export default function AddressModal({
  open,
  onClose,
  onSubmit,
  initialData,
  brandTheme,
}: Props) {
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);

  /* 🔁 FIX: SYNC EDIT DATA PROPERLY */
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl mx-4 rounded-3xl bg-white shadow-2xl p-6 sm:p-8"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${brandTheme.primary}1A` }}
            >
              <MapPin style={{ color: brandTheme.primary }} />
            </div>
            <h3
              className="text-xl font-bold"
              style={{ color: brandTheme.text }}
            >
              {initialData ? "Edit Address" : "Add New Address"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-800 hover:bg-gray-200 bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* FULL NAME */}
          <div className="sm:col-span-2">
            <label className="label">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="input"
              placeholder="John Doe"
            />
          </div>

          {/* PHONE */}
          <div className="sm:col-span-2">
            <label className="label">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input"
              placeholder="9876543210"
            />
          </div>

          {/* ADDRESS 1 */}
          <div className="sm:col-span-2">
            <label className="label">Address Line 1</label>
            <input
              value={form.addressLine1}
              onChange={(e) =>
                setForm({ ...form, addressLine1: e.target.value })
              }
              className="input"
              placeholder="House no, Street, Area"
            />
          </div>

          {/* ADDRESS 2 */}
          <div className="sm:col-span-2">
            <label className="label">Address Line 2 (optional)</label>
            <input
              value={form.addressLine2}
              onChange={(e) =>
                setForm({ ...form, addressLine2: e.target.value })
              }
              className="input"
              placeholder="Landmark, Apartment"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="label">City</label>
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="input"
            />
          </div>

          {/* STATE */}
          <div>
            <label className="label">State</label>
            <input
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="input"
            />
          </div>

          {/* POSTAL */}
          <div className="sm:col-span-2">
            <label className="label">Postal Code</label>
            <input
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="input"
            />
          </div>

          {/* ACTION */}
          <button
            type="submit"
            className="sm:col-span-2 h-12 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${brandTheme.primary}, ${brandTheme.primary}CC)`,
            }}
          >
            {initialData ? "Update Address" : "Save Address"}
          </button>
        </form>
      </motion.div>

      {/* LOCAL STYLES */}
      <style jsx>{`
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: ${brandTheme.text};
        }
        .input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          border-radius: 14px;
          border: 1px solid ${brandTheme.border};
          background: #fff;
          outline: none;
          transition: all 0.2s ease;
          color: #2a3439;
        }
        .input:focus {
          border-color: ${brandTheme.primary};
          box-shadow: 0 0 0 4px ${brandTheme.primary}22;
        }
      `}</style>
    </div>
  );
}
