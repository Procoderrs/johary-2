import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, payOrder } from "../api/order";
import { useCart } from "../context/CartContext";
import { RiCheckboxCircleLine, RiTimeLine } from "@remixicon/react";

export default function OrderSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await getOrderById(id);
      setOrder(res.data.data);
      // Cart clear karo jab order load ho
      clearCart();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await payOrder(id);
      if (res.data.sessionUrl) {
        window.location.href = res.data.sessionUrl;
      }
    }  catch (err) {
    console.log("ERROR STATUS:", err.response?.status);
    console.log("ERROR MESSAGE:", err.response?.data);
    alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-gray-400">Loading order...</p>
    </div>
  );

  return (
    <div className="font-user">

      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Home / Order Summary</p>
          <h1 className="text-[28px] font-semibold">Order Summary</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 py-16">

        {/* STATUS */}
        <div className={`flex items-center gap-3 p-4 rounded-2xl mb-8 ${
          order.paymentStatus === "paid"
            ? "bg-green-50 border border-green-100"
            : "bg-amber-50 border border-amber-100"
        }`}>
          {order.paymentStatus === "paid" ? (
            <RiCheckboxCircleLine size={24} className="text-green-500" />
          ) : (
            <RiTimeLine size={24} className="text-amber-500" />
          )}
          <div>
            <p className="font-semibold text-sm">
              {order.paymentStatus === "paid" ? "Payment Successful" : "Payment Pending"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Order ID: {order._id}
            </p>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Order Items</h2>
          </div>

          <div className="divide-y divide-gray-50">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c19417] text-white text-xs rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  {item.selectedVariant && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Object.entries(item.selectedVariant.combination || {})
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")}
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ORDER INFO */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* SHIPPING ADDRESS */}
          <div className="border border-gray-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
            <div className="space-y-1 text-sm text-gray-500">
              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
              <p>{order.shippingAddress?.zipCode}</p>
              <p>{order.shippingAddress?.phone}</p>
              <p>{order.shippingAddress?.email}</p>
            </div>
          </div>

          {/* ORDER TOTAL */}
          <div className="border border-gray-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Order Total</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${order.shippingCost?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 text-base border-t border-gray-100 pt-2 mt-2">
                <span>Total</span>
                <span>${order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* PAY NOW BUTTON */}
        {order.paymentStatus !== "paid" && (
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-[#c19417] hover:bg-black text-white py-4 text-sm font-medium uppercase tracking-wider transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay Now — $${order.total?.toFixed(2)}`}
          </button>
        )}

        {order.paymentStatus === "paid" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-sm font-medium uppercase tracking-wider transition"
          >
            Continue Shopping
          </button>
        )}

      </div>
    </div>
  );
}