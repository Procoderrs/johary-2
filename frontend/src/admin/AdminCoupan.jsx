import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoupons, createCoupon, deleteCoupon, toggleCoupon } from "../api/coupan";
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";

export default function AdminCoupons() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxUses: "",
    expiryDate: "",
  });
  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => getCoupons().then(r => r.data?.data || []),
  });

  const handleCreate = async () => {
    if (!form.code || !form.discountValue) return;
    setCreating(true);
    try {
      await createCoupon({
        ...form,
        code: form.code.toUpperCase(),
        discountValue: Number(form.discountValue),
        minOrderAmount: Number(form.minOrderAmount || 0),
        maxUses: form.maxUses ? Number(form.maxUses) : null,
        expiryDate: form.expiryDate || null,
      });
      setSuccessMsg("Coupon created!");
      setForm({ code: "", discountType: "percentage", discountValue: "", minOrderAmount: "", maxUses: "", expiryDate: "" });
      queryClient.invalidateQueries(["coupons"]);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setSuccessMsg(err.response?.data?.message || "Error!");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    await deleteCoupon(id);
    queryClient.invalidateQueries(["coupons"]);
  };

  const handleToggle = async (id) => {
    await toggleCoupon(id);
    queryClient.invalidateQueries(["coupons"]);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
          Jewelry Admin
        </p>
        <h1 className="text-4xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
          Coupons
        </h1>
        <p className="text-text-light text-sm mt-2">Create and manage discount coupons</p>
      </div>

      {/* CREATE FORM */}
      <div className="bg-card border border-border-1 rounded-[30px] p-8">
        <h2 className="text-2xl text-dark-text mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Create Coupon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
            placeholder="Coupon Code (e.g. SAVE20)"
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent text-dark-text uppercase"
          />

          <select
            value={form.discountType}
            onChange={(e) => setForm({ ...form, discountType: e.target.value })}
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed ($)</option>
          </select>

          <input
            type="number"
            value={form.discountValue}
            onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
            placeholder={form.discountType === "percentage" ? "Discount % (e.g. 20)" : "Discount $ (e.g. 10)"}
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
          />

          <input
            type="number"
            value={form.minOrderAmount}
            onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })}
            placeholder="Min Order Amount ($)"
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
          />

          <input
            type="number"
            value={form.maxUses}
            onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
            placeholder="Max Uses (blank = unlimited)"
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
          />

          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
          />
        </div>

        {successMsg && (
          <p className="text-green-600 text-sm mt-3">{successMsg}</p>
        )}

        <button
          onClick={handleCreate}
          disabled={creating}
          className="mt-5 flex items-center gap-2 bg-primary-gold-accent hover:bg-hover-bg text-white px-8 py-3 rounded-full transition disabled:opacity-50"
        >
          <RiAddLine size={18} />
          {creating ? "Creating..." : "Create Coupon"}
        </button>
      </div>

      {/* COUPONS LIST */}
      <div className="bg-card border border-border-1 rounded-[30px] overflow-hidden">
        <div className="px-8 py-6 border-b border-border-1">
          <h2 className="text-2xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
            All Coupons ({coupons.length})
          </h2>
        </div>

        {coupons.length === 0 ? (
          <div className="py-16 text-center text-text-light">No coupons yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border-1 bg-bg-1">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Code</th>
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Min Order</th>
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Uses</th>
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs text-text-light uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-1">
                {coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-bg-1 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-primary-gold-accent">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-text">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : `$${coupon.discountValue}`
                      }
                    </td>
                    <td className="px-6 py-4 text-sm text-text-light">
                      ${coupon.minOrderAmount}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-light">
                      {coupon.usedCount} / {coupon.maxUses || "∞"}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-light">
                      {coupon.expiryDate
                        ? new Date(coupon.expiryDate).toLocaleDateString()
                        : "No expiry"
                      }
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggle(coupon._id)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition ${
                          coupon.isActive
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-red-50 text-red-500 border-red-200"
                        }`}
                      >
                        {coupon.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <RiDeleteBinLine size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}