import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api/order";
import { RiPackageLine, RiTruckLine, RiCheckboxCircleLine, RiTimeLine, RiCloseCircleLine } from "@remixicon/react";



const STATUS_CONFIG = {
  pending: { label: "Pending", color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: RiTimeLine },
  processing: { label: "Processing", color: "text-blue-600 bg-blue-50 border-blue-200", icon: RiPackageLine },
  shipped: { label: "Shipped", color: "text-purple-600 bg-purple-50 border-purple-200", icon: RiTruckLine },
  delievered: { label: "Delivered", color: "text-green-600 bg-green-50 border-green-200", icon: RiCheckboxCircleLine },
  cancelled: { label: "Cancelled", color: "text-red-500 bg-red-50 border-red-200", icon: RiCloseCircleLine },
};

const PAYMENT_CONFIG = {
  pending: { label: "Unpaid", color: "text-yellow-600 bg-yellow-50" },
  paid: { label: "Paid", color: "text-green-600 bg-green-50" },
  failed: { label: "Failed", color: "text-red-500 bg-red-50" },
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-gray-400">Loading orders...</p>
    </div>
  );

  return (
    <div className="font-body">

      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Home / My Orders</p>
          <h1 className="text-[28px] font-semibold">My Orders</h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-16">

        {orders.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl">
            <RiPackageLine size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Link to="/shop" className="bg-[#c19417] text-white px-6 py-3 text-sm uppercase">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.pending;
              const payment = PAYMENT_CONFIG[order.paymentStatus] || PAYMENT_CONFIG.pending;
              const StatusIcon = status.icon;
              const isExpanded = expandedOrder === order._id;

              return (
                <div key={order._id} className="border border-gray-100 rounded-2xl overflow-hidden">

                  {/* ORDER HEADER */}
                  <div className="flex flex-wrap items-center gap-4 px-6 py-4 bg-gray-50">

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                      <p className="text-sm font-mono font-medium text-gray-800">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Date</p>
                      <p className="text-sm text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric"
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Total</p>
                      <p className="text-sm font-semibold text-gray-900">${order.total?.toFixed(2)}</p>
                    </div>

                    {/* PAYMENT BADGE */}
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${payment.color}`}>
                      {payment.label}
                    </span>

                    {/* ORDER STATUS BADGE */}
                    <span className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-medium ${status.color}`}>
                      <StatusIcon size={13} />
                      {status.label}
                    </span>

                    {/* PAY NOW — agar unpaid */}
                    {order.paymentStatus === "pending" && order.orderStatus !== "cancelled" && (
                      <Link
                        to={`/order/${order._id}`}
                        className="text-xs bg-[#c19417] text-white px-4 py-1.5 rounded-full hover:bg-black transition"
                      >
                        Pay Now
                      </Link>
                    )}

                    {/* EXPAND */}
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                      className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition"
                    >
                      {isExpanded ? "Hide" : "Details"}
                    </button>

                  </div>

                  {/* ITEMS PREVIEW */}
                  <div className="px-6 py-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 4).map((item, i) => (
                        <img
                          key={i}
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      {order.items.length > 0 && ` — ${order.items[0].name}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}`}
                    </p>
                  </div>

                  {/* EXPANDED DETAILS */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-6 py-5 grid md:grid-cols-2 gap-6">

                      {/* ITEMS */}
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Items</p>
                        <div className="space-y-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <img
                                src={item.image || "/placeholder.jpg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-xl border border-gray-100"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-400">
                                  Qty: {item.quantity} × ${item.price}
                                </p>
                              </div>
                              <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-1 text-sm">
                          <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span><span>${order.subtotal?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>Shipping</span><span>${order.shippingCost?.toFixed(2) || "0.00"}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-gray-800 pt-1">
                            <span>Total</span><span>${order.total?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* SHIPPING */}
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                          Shipping Address
                        </p>
                        <div className="bg-gray-50 rounded-2xl p-4 space-y-1 text-sm text-gray-600">
                          <p className="font-medium text-gray-800">{order.shippingAddress?.fullName}</p>
                          <p>{order.shippingAddress?.address}</p>
                          <p>{order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
                          <p>{order.shippingAddress?.phone}</p>
                          <p>{order.shippingAddress?.email}</p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}