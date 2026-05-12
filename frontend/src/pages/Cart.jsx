import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseLine, RiPokerHeartsFill, RiArrowLeftRightLine, RiGift2Fill, RiBus2Line } from "@remixicon/react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [shipping, setShipping] = useState("free");
  const [showAddress, setShowAddress] = useState(false);
  const navigate = useNavigate();

  const shippingCost = shipping === "flat" ? 10 : shipping === "local" ? 5 : 0;
  const total = cartTotal + shippingCost;

  return (
    <div className="font-body">

      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Home / Cart</p>
          <h1 className="text-[28px] uppercase font-semibold">Cart</h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:py-16 py-4">
        <div className="flex flex-col xl:flex-row gap-8">

          {/* LEFT */}
          <div className="w-full xl:w-[65%] space-y-8">
            <h2 className="md:text-4xl text-3xl font-medium">Cart Summary</h2>

            {/* COUPON */}
            <div className="bg-[#e6f7e6] text-[#2a7a25] p-4 flex flex-col text-center md:text-left md:flex-row md:justify-between items-center gap-3">
              <p className="tracking-[0.1px] max-w-[550px]">Use GET20OFF coupon code to get 20% off on minimum order above $100</p>
              <button className="uppercase transition font-semibold hover:bg-[#2a7a25] hover:text-white xl:w-[200px] border border-[#2a7a25] px-4 py-2 text-[15px]">
                Apply Coupon
              </button>
            </div>

            {/* EMPTY STATE */}
            {cart.length === 0 ? (
              <div className="text-center py-16 border border-[#f1efea]">
                <p className="text-4xl mb-4">🛒</p>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link to="/shop" className="bg-[#c19417] text-white px-6 py-3 text-sm uppercase">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* DESKTOP TABLE */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-[#f1efea]">
                      <tr>
                        <th className="w-[40px]"></th>
                        <th className="p-3 font-medium text-lg">Product</th>
                        <th className="p-3 font-medium text-lg">Price</th>
                        <th className="p-3 font-medium text-lg">Quantity</th>
                        <th className="p-3 font-medium text-lg">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.cartKey} className="border-b border-[#f1efea]">
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeFromCart(item.cartKey)}
                              className="text-red-400 hover:bg-red-100 rounded-full transition p-1"
                            >
                              <RiCloseLine size={20} />
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image || "/placeholder.jpg"}
                                alt={item.name}
                                className="w-[70px] h-[80px] object-cover"
                              />
                              <div>
                                <p>{item.name}</p>
                                {item.selectedVariant && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {Object.entries(item.selectedVariant.combination || {})
                                      .map(([k, v]) => `${k}: ${v}`)
                                      .join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-medium text-lg">${item.price}</td>
                          <td className="p-3">
                            <div className="flex items-center bg-[#f1efea] w-fit">
                              <button
                                onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                                className="px-3 py-1 text-lg"
                              >−</button>
                              <span className="px-4 text-[#666]">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                                className="px-3 py-1 text-lg"
                              >+</button>
                            </div>
                          </td>
                          <td className="p-3 font-medium text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CART */}
                <div className="md:hidden space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartKey} className="border-b border-[#f1efea] pb-4 space-y-3">
                      <div className="flex items-center gap-4 border-b border-[#f1efea] pb-3">
                        <button onClick={() => removeFromCart(item.cartKey)} className="text-red-400">
                          <RiCloseLine size={20} />
                        </button>
                        <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-[70px] h-[80px] object-cover" />
                      </div>
                      <div className="flex justify-between border-b border-[#f1efea] pb-2">
                        <p className="text-sm text-[#666]">Product</p>
                        <p className="text-sm font-medium">{item.name}</p>
                      </div>
                      <div className="flex justify-between border-b border-[#f1efea] pb-2">
                        <p className="text-sm text-[#666]">Price</p>
                        <p className="font-medium">${item.price}</p>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#f1efea] pb-2">
                        <p className="text-sm text-[#666]">Quantity</p>
                        <div className="flex items-center bg-[#f1efea]">
                          <button onClick={() => updateQuantity(item.cartKey, item.quantity - 1)} className="px-3 py-1">−</button>
                          <span className="px-4 text-[#666]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartKey, item.quantity + 1)} className="px-3 py-1">+</button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-[#666]">Subtotal</p>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* COUPON INPUT */}
            <div className="flex flex-col gap-4 justify-between md:flex-row">
              <div className="flex gap-2 w-full sm:w-auto">
                <input type="text" placeholder="Coupon code" className="border border-[#f1efea] p-2 w-full" />
                <button className="bg-[#c19417] text-white px-4 py-2 text-[15px] font-medium uppercase">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* FEATURES */}
            <div className="overflow-x-auto">
              <div className="flex items-center justify-center text-center gap-4 min-w-[700px]">
                {[
                  { title: "Loved by Thousands", desc: "Join Thousands of Happy and Satisfied Customers!", icon: RiPokerHeartsFill },
                  { title: "Easy Returns", desc: "Enjoy Hassle-Free Returns and Exchanges – Shop Now!", icon: RiArrowLeftRightLine },
                  { title: "Order Now & Get Gift!", desc: "Order & Receive a Special Gift. Limited Time Only!", icon: RiGift2Fill },
                ].map((item, i) => (
                  <div key={i} className="bg-[#F3F4FC] text-purple-800 border-[#DEE3F2] p-4 min-w-[220px]">
                    <div className="text-2xl mb-3 text-[#4F5181] flex justify-center"><item.icon size={28} /></div>
                    <p className="font-medium text-[#4F5181]">{item.title}</p>
                    <p className="text-sm mt-2 text-[#4F5181]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full xl:w-[35%] space-y-8 xl:sticky xl:top-6 self-start">

            {/* FREE DELIVERY */}
            <div className="border border-dashed border-green-600 rounded-lg px-8 py-8 text-center">
              <div className="relative">
                <span className="absolute -top-2 -right-5 text-green-600"><RiBus2Line size={22} /></span>
                <div className="h-1.5 bg-green-200 w-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full rounded-full"></div>
                </div>
              </div>
              <p className="mt-4 font-medium text-[15px]">Congratulations! Your order is eligible for FREE Delivery.</p>
            </div>

            {/* CART TOTALS */}
            <div className="bg-[#f1efea] p-6 space-y-5 rounded-lg">
              <h3 className="font-semibold text-[20px]">Cart totals</h3>

              <div className="flex justify-between pb-3 border-b border-[#ddd]">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>

              {/* SHIPPING */}
              <div className="space-y-3 text-sm">
                <p className="font-medium">Shipping</p>
                <label className="flex justify-between items-center cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="ship" checked={shipping === "free"} onChange={() => setShipping("free")} className="accent-black" />
                    Free Shipping
                  </span>
                  <span className="font-medium">$0</span>
                </label>
                <label className="flex justify-between items-center cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="ship" checked={shipping === "local"} onChange={() => setShipping("local")} className="accent-black" />
                    Local Pickup
                  </span>
                  <span className="font-medium">$5</span>
                </label>
                <label className="flex justify-between items-center cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input type="radio" name="ship" checked={shipping === "flat"} onChange={() => setShipping("flat")} className="accent-black" />
                    Flat Rate
                  </span>
                  <span className="font-medium">$10</span>
                </label>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between pt-4 border-t border-[#ddd]">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-semibold text-lg">${total.toFixed(2)}</span>
              </div>

              {/* CHECKOUT BTN */}
              <Link
                to="/checkout"
                className="block w-full bg-[#c19417] text-white py-3 text-[16px] font-medium hover:bg-black transition text-center uppercase"
              >
                Proceed to Checkout
              </Link>

              <p className="text-center text-sm mt-2 font-medium">Guaranteed Safe And Secure Checkout</p>
              <img src="/payment.png" className="mx-auto mt-2" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}