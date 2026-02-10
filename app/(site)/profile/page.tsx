"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useBrand } from "@/app/providers/BrandProvider";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  MapPin,
  LogOut,
} from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "@/lib/api/authApi";
import { useAuth } from "@/app/providers/AuthProvider";
import AddressCard from "./components/AddressCard";
import AddressModal from "./components/AddressModal";
import OrderHistory from "./components/OrderHistory";
import { brandTheme } from "@/lib/brandTheme";

export default function ProfilePage() {
  const { brand } = useBrand();
  const theme = brandTheme[brand];
  const { updateUser, logout } = useAuth();
  const { data, isLoading, refetch } = useGetProfileQuery();

  const [updateProfile] = useUpdateProfileMutation();
  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
      });
      updateUser(data);
    }
  }, [data, updateUser]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form).unwrap();
      updateUser(res);
      refetch();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary, #592720)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div
          className="backdrop-blur-xl rounded-3xl p-8 border border-[var(--brand-border, #E5E7EB)] shadow-xl"
          style={
            {
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              "--brand-primary": theme.primary,
              "--brand-text": theme.text,
              "--brand-muted": theme.muted,
              "--brand-border": theme.border,
              "--brand-subtext": theme.subtext,
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}CC)`,
                }}
              >
                <User className="w-10 h-10" style={{ color: theme.subtext }} />
              </div>
              <div>
                <h1
                  className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${theme.text}, ${theme.primary})`,
                  }}
                >
                  My Account
                </h1>
                <p className="text-[var(--brand-muted)] mt-1">
                  Manage your profile and preferences
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="group flex items-center gap-2 px-6 py-3 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold hover:border-opacity-100"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                color: theme.text,
                borderColor: theme.border,
              }}
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-[-1px] transition-transform" />
              Logout
            </button>
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div
          className="backdrop-blur-xl rounded-3xl p-8 border shadow-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(229, 231, 235, 0.5)",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-clip-text  flex text-amber-900 items-center gap-3">
              <User className="w-7 h-7" style={{ color: theme.primary }} />
              Profile Details
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}E6)`,
                color: theme.subtext,
              }}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-3">
                <label className="font-semibold text-amber-900 flex items-center gap-2">
                  <User className="w-5 h-5" style={{ color: theme.primary }} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-4 border rounded-2xl bg-white/50 backdrop-blur-sm  outline-none transition-all duration-300 text-lg placeholder:text-[var(--brand-muted)] shadow-sm h-14 text-amber-900"
                    placeholder="Enter your full name"
                    style={{ borderColor: theme.border }}
                  />
                ) : (
                  <div
                    className="px-4 py-4 text-amber-900 bg-[rgba(255,255,255,0.3)] backdrop-blur-sm rounded-2xl border shadow-sm min-h-[3.5rem] flex items-center text-xl font-semibold"
                    style={{
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  >
                    {form.name || "No name set"}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label className="font-semibold text-amber-900 flex items-center gap-2">
                  <Mail className="w-5 h-5" style={{ color: theme.primary }} />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    type="email"
                    className="w-full px-4 py-4 border rounded-2xl text-amber-900 bg-white/50 backdrop-blur-sm  outline-none transition-all duration-300 text-lg  shadow-sm h-14"
                    placeholder="Enter your email"
                    style={{ borderColor: theme.border }}
                  />
                ) : (
                  <div
                    className="px-4 py-4 bg-[rgba(255,255,255,0.3)]  text-amber-900 backdrop-blur-sm rounded-2xl border shadow-sm min-h-[3.5rem] flex items-center text-xl font-semibold"
                    style={{
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  >
                    {form.email || "No email set"}
                  </div>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-3 md:col-span-2">
                <label className="font-semibold text-amber-900 flex items-center gap-2">
                  <Phone className="w-5 h-5" style={{ color: theme.primary }} />
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    type="tel"
                    className="w-full px-4 py-4 border rounded-2xl bg-white/50 backdrop-blur-sm  text-amber-900 outline-none transition-all duration-300 text-lg placeholder:text-[var(--brand-muted)] shadow-sm h-14"
                    placeholder="Enter your mobile number"
                    style={{ borderColor: theme.border }}
                  />
                ) : (
                  <div
                    className="px-4 py-4 bg-[rgba(255,255,255,0.3)] text-amber-900 backdrop-blur-sm rounded-2xl border shadow-sm min-h-[3.5rem] flex items-center text-xl font-semibold"
                    style={{
                      borderColor: theme.border,
                      color: theme.text,
                    }}
                  >
                    {form.mobile || "No mobile set"}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div
                className="flex gap-4 pt-4 border-t"
                style={{ borderColor: theme.border }}
              >
                <button
                  type="submit"
                  className=" group relative overflow-hidden font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3  bg-amber-950"
                >
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    if (data)
                      setForm({
                        name: data.name || "",
                        email: data.email || "",
                        mobile: data.mobile || "",
                      });
                  }}
                  className="px-8 py-4 border backdrop-blur-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    color: theme.text,
                    borderColor: theme.border,
                  }}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ADDRESSES SECTION */}
        <div
          className="backdrop-blur-xl rounded-3xl p-8 border shadow-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderColor: "rgba(229, 231, 235, 0.5)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold bg-clip-text  text-amber-900 flex items-center gap-3">
              <MapPin className="w-7 h-7" style={{ color: theme.primary }} />
              Saved Addresses
            </h2>
            <button
              onClick={() => {
                setEditingAddress(null);
                setModalOpen(true);
              }}
              className="group flex items-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}E6)`,
                color: theme.subtext,
              }}
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Address
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data?.addresses?.length > 0 ? (
              data.addresses.map((addr: any) => (
                <AddressCard
                  key={addr._id}
                  address={addr}
                  brandTheme={theme}
                  onEdit={(a) => {
                    setEditingAddress(a);
                    setModalOpen(true);
                  }}
                  onDelete={async (id) => {
                    try {
                      await deleteAddress({ id }).unwrap();
                      toast.success("Address deleted successfully!");
                      refetch();
                    } catch (error: any) {
                      toast.error(
                        error?.data?.message || "Failed to delete address"
                      );
                    }
                  }}
                />
              ))
            ) : (
              <div className="md:col-span-2 text-center py-16">
                <MapPin
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: theme.muted }}
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: theme.text }}
                >
                  No addresses saved
                </h3>
                <p className="text-[var(--brand-muted)] mb-6">
                  Add your first address to get started
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}E6)`,
                    color: theme.subtext,
                  }}
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>

        <OrderHistory />

        <AddressModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={editingAddress}
          brandTheme={theme}
          onSubmit={async (payload) => {
            try {
              const res = editingAddress
                ? await updateAddress({
                    id: editingAddress._id,
                    body: payload,
                  }).unwrap()
                : await addAddress(payload).unwrap();
              updateUser(res);
              setModalOpen(false);
              setEditingAddress(null);
              toast.success("Address saved successfully!");
              refetch();
            } catch (error: any) {
              toast.error(error?.data?.message || "Failed to save address");
            }
          }}
        />
      </div>
    </div>
  );
}
