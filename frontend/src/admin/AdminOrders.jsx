import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/order";
import {useQuery,useQueryClient} from '@tanstack/react-query'

const STATUS_COLORS = {
  pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
  processing: "bg-blue-50 text-blue-600 border-blue-200",
  shipped: "bg-purple-50 text-purple-600 border-purple-200",
  delievered: "bg-green-50 text-green-600 border-green-200",
  cancelled: "bg-red-50 text-red-500 border-red-200",
};

const PAYMENT_COLORS = {
  pending: "bg-yellow-50 text-yellow-600",
  paid: "bg-green-50 text-green-600",
  failed: "bg-red-50 text-red-500",
};

export default function AdminOrders() {
  
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updating, setUpdating] = useState(null);

  const queryClient = useQueryClient();

const { data: orders = [], isLoading: loading } = useQuery({
  queryKey: ['admin-orders'],
  queryFn: () => getAllOrders().then(r => r.data?.data || []),
});

 const handleStatusUpdate = async (id, field, value) => {
  setUpdating(id);
  try {
    await updateOrderStatus(id, { [field]: value });
    // ✅ cache update karo
    queryClient.setQueryData(['admin-orders'], (old) =>
      old.map((o) => (o._id === id ? { ...o, [field]: value } : o))
    );
  } catch (err) {
    console.log(err);
  } finally {
    setUpdating(null);
  }
};

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-text-light">Loading orders...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
            Orders
          </h1>
          <p className="text-text-light text-sm mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: orders.length, color: "text-dark-text" },
          { label: "Pending", value: orders.filter(o => o.orderStatus === "pending").length, color: "text-yellow-600" },
          { label: "Processing", value: orders.filter(o => o.orderStatus === "processing").length, color: "text-blue-600" },
          { label: "Delivered", value: orders.filter(o => o.orderStatus === "delievered").length, color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-2 border border-border-1 rounded-2xl px-5 py-4">
            <p className="text-text-light text-xs mb-1">{stat.label}</p>
            <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      {orders.length === 0 ? (
        <div className="bg-bg-2 border border-border-1 rounded-3xl py-20 text-center">
          <p className="text-text-light">No orders yet</p>
        </div>
      ) : (
        <div className="bg-bg-2 border border-border-1 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-1 text-left">
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Order Status</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs text-text-light font-medium uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-1">
                {orders.map((order) => (
                  <>
                    <tr key={order._id} className="hover:bg-bg-1 transition">
                      {/* ORDER ID */}
                      <td className="px-6 py-4">
                        <p className="text-xs font-mono text-text-3">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-dark-text">
                          {order.shippingAddress?.fullName || "Guest"}
                        </p>
                        <p className="text-xs text-text-light mt-0.5">
                          {order.shippingAddress?.email}
                        </p>
                      </td>

                      {/* ITEMS */}
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, i) => (
                            <img
                              key={i}
                              src={item.image || "/placeholder.jpg"}
                              alt={item.name}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-bg-4 border-2 border-white flex items-center justify-center text-xs text-text-3">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-text-light mt-1">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </p>
                      </td>

                      {/* TOTAL */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-dark-text">
                          ${order.total?.toFixed(2)}
                        </p>
                      </td>

                      {/* PAYMENT STATUS */}
                      <td className="px-6 py-4">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => handleStatusUpdate(order._id, "paymentStatus", e.target.value)}
                          disabled={updating === order._id}
                          className={`text-xs px-3 py-1.5 rounded-full border outline-none cursor-pointer ${PAYMENT_COLORS[order.paymentStatus]}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>

                      {/* ORDER STATUS */}
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusUpdate(order._id, "orderStatus", e.target.value)}
                          disabled={updating === order._id}
                          className={`text-xs px-3 py-1.5 rounded-full border outline-none cursor-pointer ${STATUS_COLORS[order.orderStatus]}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delievered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4">
                        <p className="text-xs text-text-light">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric"
                          })}
                        </p>
                      </td>

                      {/* EXPAND */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="text-xs px-3 py-1.5 rounded-full border border-border-3 text-text-3 hover:bg-bg-4 transition"
                        >
                          {expandedOrder === order._id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED ROW */}
                    {expandedOrder === order._id && (
                      <tr key={`${order._id}-expanded`}>
                        <td colSpan={8} className="px-6 py-5 bg-bg-1">
                          <div className="grid md:grid-cols-2 gap-6">

                            {/* ITEMS */}
                            <div>
                              <p className="text-xs font-medium text-text-light uppercase tracking-wider mb-3">
                                Order Items
                              </p>
                              <div className="space-y-3">
                                {order.items.map((item, i) => (
                                  <div key={i} className="flex items-center gap-3">
                                    <img
                                      src={item.image || "/placeholder.jpg"}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded-xl border border-border-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-dark-text line-clamp-1">{item.name}</p>
                                      <p className="text-xs text-text-light">
                                        Qty: {item.quantity} × ${item.price}
                                      </p>
                                    </div>
                                    <p className="text-sm font-medium text-dark-text">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* TOTALS */}
                              <div className="mt-4 pt-4 border-t border-border-1 space-y-1 text-sm">
                                <div className="flex justify-between text-text-light">
                                  <span>Subtotal</span>
                                  <span>${order.subtotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-light">
                                  <span>Shipping</span>
                                  <span>${order.shippingCost?.toFixed(2) || "0.00"}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-dark-text pt-1">
                                  <span>Total</span>
                                  <span>${order.total?.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                            {/* SHIPPING ADDRESS */}
                            <div>
                              <p className="text-xs font-medium text-text-light uppercase tracking-wider mb-3">
                                Shipping Address
                              </p>
                              <div className="bg-bg-2 border border-border-1 rounded-2xl p-4 space-y-1 text-sm text-text-3">
                                <p className="font-medium text-dark-text">{order.shippingAddress?.fullName}</p>
                                <p>{order.shippingAddress?.address}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                                <p>{order.shippingAddress?.zipcode}</p>
                                <p className="pt-1">{order.shippingAddress?.phone}</p>
                                <p>{order.shippingAddress?.email}</p>
                              </div>

                              <div className="mt-3 flex gap-2 text-xs">
                                <span className="bg-bg-4 text-text-3 px-3 py-1 rounded-full capitalize">
                                  {order.paymentMethod}
                                </span>
                                {order.notes && (
                                  <span className="bg-bg-4 text-text-3 px-3 py-1 rounded-full">
                                    Note: {order.notes}
                                  </span>
                                )}
                              </div>
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}