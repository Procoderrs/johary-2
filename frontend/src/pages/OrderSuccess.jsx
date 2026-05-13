import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { RiCheckboxCircleLine } from "@remixicon/react";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // cart clear karo
  }, []);

  useEffect(() => {
  const confirmOrder = async () => {
    if (orderId) {
      try {
        await api.post(`/orders/${orderId}/confirm-payment`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  confirmOrder();
  clearCart();
}, []);

  return (
    <div className="font-user min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <RiCheckboxCircleLine size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-2">
          Thank you for your purchase. Your order has been received.
        </p>
        {orderId && (
          <p className="text-xs text-gray-400 mb-6">
            Order ID: <span className="font-medium text-gray-600">{orderId}</span>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Link
            to="/dashboard"
            className="bg-[#c19417] text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-black transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/my-orders"
            className="border border-gray-300 text-gray-700 px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-50 transition"
          >
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}