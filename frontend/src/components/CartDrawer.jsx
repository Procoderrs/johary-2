import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { RiCloseLine, RiDeleteBinLine, RiShoppingBagLine } from "@remixicon/react";
import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();


const handleCheckout = () => {
  onClose();
  if (!user) {
    navigate("/account?redirect=checkout");
  } else {
    navigate("/checkout");
  }
};
  return createPortal(
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <RiShoppingBagLine size={20} />
            <h3 className="font-semibold text-gray-900">
              My Cart ({cartCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <RiShoppingBagLine size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-[#c19417] text-sm font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div key={item.cartKey} className="flex gap-4">

                  {/* IMAGE */}
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={onClose}
                    className="w-20 h-20 flex-shrink-0 bg-gray-50 border border-gray-100 overflow-hidden"
                  >
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={onClose}
                      className="text-sm font-medium text-gray-900 hover:text-[#c19417] line-clamp-2 leading-snug"
                    >
                      {item.name}
                    </Link>

                    {/* Variant */}
                    {item.selectedVariant && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(item.selectedVariant.combination || {}).map(([k, v]) => (
                          <span key={k} className="text-xs text-gray-400 capitalize">
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price */}
                    <p className="text-sm font-semibold text-[#c19417] mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* QTY + DELETE */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 text-sm"
                        >−</button>
                        <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 text-sm"
                        >+</button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition"
                      >
                        <RiDeleteBinLine size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-3">

            {/* SUBTOTAL */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-400">
              Shipping calculated at checkout
            </p>

            {/* BUTTONS */}
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full text-center border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-3 text-sm font-medium uppercase tracking-wider transition"
            >
              View Cart
            </Link>

            <button
  onClick={handleCheckout}
  className="block w-full text-center bg-[#c19417] hover:bg-black text-white py-3 text-sm font-medium uppercase tracking-wider transition"
>
  Checkout
</button>

          </div>
        )}

      </div>
    </>,
    document.body
  );
}