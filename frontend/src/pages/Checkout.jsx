import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiBus2Line, RiCheckLine } from "@remixicon/react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/order";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [shipping, setShipping] = useState("free");

  const shippingCost = shipping === "flat" ? 10 : shipping === "local" ? 5 : 0;
  const total = cartTotal + shippingCost;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    state: "",
    zipCode: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.firstName || !form.phone || !form.email || !form.address) {
      alert("Please fill required fields!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant,
        })),
        shippingAddress: {
          fullName: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.state,
          country: form.country,
          zipCode: form.zipCode,
        },
        paymentMethod,
        shippingCost,
        notes: form.notes,
      };

const res = await createOrder(orderData);

      if (paymentMethod === "stripe" && res.data.sessionUrl) {
        // Stripe checkout pe redirect
        window.location.href = res.data.sessionUrl;
      } else {
        // COD
        navigate(`/order-success?orderId=${res.data.orderId}`);
      }

    } catch (err) {
      console.log(err);
      alert("Order failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body">
      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Home / Checkout</p>
          <h1 className="text-[28px] uppercase font-semibold">Checkout</h1>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-[1440px] mx-auto px-4 py-16 mb-10 border-b border-[#f1efea]">
        <div className="flex flex-col xl:flex-row gap-10 items-start">

          {/* LEFT — BILLING */}
          <div className="w-full xl:w-[60%] space-y-8">
            <div className="border border-[#f1efea] p-6 space-y-5 bg-white">
              <h2 className="text-[22px] font-semibold">Billing details</h2>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
                <InputField label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
              </div>

              <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} required full />
              <InputField label="Email" name="email" value={form.email} onChange={handleChange} required full />
              <InputField label="Country / Region" name="country" value={form.country} onChange={handleChange} required full />
              <InputField label="Address" name="address" value={form.address} onChange={handleChange} required full />

              <div className="grid grid-cols-2 gap-4">
                <InputField label="State / County" name="state" value={form.state} onChange={handleChange} required />
                <InputField label="Postcode / ZIP" name="zipCode" value={form.zipCode} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#666] block mb-1">Order notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border border-[#f1efea] p-3 bg-white"
                rows={3}
              />
            </div>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="w-full xl:w-[40%] space-y-6">

            {/* FREE SHIPPING BANNER */}
            <div className="border border-dashed border-green-600 rounded-lg px-6 py-6 text-center">
              <div className="relative">
                <span className="absolute -top-2 -right-4 text-green-600">
                  <RiBus2Line size={22} />
                </span>
                <div className="h-1.5 bg-green-200 w-full">
                  <div className="h-full bg-green-500 w-full"></div>
                </div>
              </div>
              <p className="mt-3 font-medium text-[15px]">
                Congratulations! Free Delivery Available
              </p>
            </div>

            {/* ORDER ITEMS */}
            <div className="border border-[#f1efea] bg-[#fafafa] p-6 space-y-4">
              <h3 className="text-lg font-semibold border-b pb-3 border-[#f1efea]">
                Your Order ({cartCount} items)
              </h3>

              {/* CART ITEMS */}
              <div className="space-y-4 border-b border-[#f1efea] pb-4">
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-400">No items in cart</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartKey} className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          className="w-[60px] h-[70px] object-cover"
                        />
                        <div className="absolute -top-1 -right-1">
                          <p className="bg-[#c19417] text-white w-5 h-5 text-center text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        {item.selectedVariant && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {Object.entries(item.selectedVariant.combination || {})
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              {/* SHIPPING */}
              <div className="space-y-3 text-sm tracking-wide border-b border-[#f1efea] pb-4">
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
              <div className="border-b py-4 border-[#f1efea]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Shipping</span>
                    <span className="font-medium">${shippingCost}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="space-y-3 pb-4 text-sm">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input type="radio" name="payment" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="accent-black" />
                  Pay with Card (Stripe)
                </label>
                {paymentMethod === "stripe" && (
                  <div className="text-[#666] text-xs leading-6 bg-gray-50 p-3">
                    You will be redirected to Stripe secure payment page.
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-black" />
                  Cash on Delivery
                </label>
                {paymentMethod === "cod" && (
                  <div className="text-[#666] text-xs leading-6 bg-gray-50 p-3">
                    Pay with cash upon delivery.
                  </div>
                )}
              </div>

              {/* PLACE ORDER */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
                className="w-full bg-[#c19417] text-white py-3 hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed font-medium uppercase tracking-wider"
              >
                {loading ? "Processing..." : paymentMethod === "stripe" ? "Pay with Stripe" : "Place Order"}
              </button>

              <p className="text-center text-sm mt-2 font-medium">
                Guaranteed Safe And Secure Checkout
              </p>
              <img src="/payment.png" className="mx-auto mt-2" />
            </div>

            {/* TRUST BADGE */}
            <div className="flex items-center justify-center">
              <img src="/trust_badge_new.png" alt="" />
            </div>

            {/* BUY WITH CONFIDENCE */}
            <div className="bg-[#F3F4FC] border rounded-lg border-[#DEE3F2] p-6 space-y-4">
              <div>
                <h3 className="text-[18px] font-semibold text-[#4F5181]">Buy with Confidence</h3>
                <p className="text-sm text-[#4F5181] mt-1">Join Over 20,000+ Satisfied Customers Worldwide</p>
              </div>
              <div className="space-y-3 text-sm">
                {["Secure Payments, Guaranteed Privacy", "Hassle-Free Returns and Refunds", "Fast and Reliable Shipping"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#4F5181]">
                    <span className="rounded-full border border-[#4F5181]"><RiCheckLine size={15} /></span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
const InputField = ({ label, name, value, onChange, required, full }) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="text-sm text-[#666] mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-white border border-[#f1efea] p-3 outline-none text-sm"
      placeholder={`Enter ${label}`}
    />
  </div>
);