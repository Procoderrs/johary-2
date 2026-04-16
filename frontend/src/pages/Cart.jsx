import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { productsData } from "../data/product";
export default function Cart() {
   const location = useLocation();
   const getTitle = () => {
    const path = location.pathname;
    if (path.includes("cart")) return "Cart";
    return "Page";
  };
const product = productsData[0]; // sirf demo ke liye first product
 const quantity_2 = 1; 
const subtotal = product.price * quantity_2;
const [quantity, setQuantity] = useState(0);
const increaseQty = () => {
  setQuantity((prev) => prev + 1);
};

const decreaseQty = () => {
  setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
};
  return (
    <div>
       <div className="font-body">

      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
          <h1 className="text-[28px] uppercase font-semibold">{getTitle()}</h1>
          
        </div>
      </div>


      <div className="max-w-[1440px] mx-auto px-4 py-16">

  {/* ================= MAIN FLEX ================= */}
  <div className="flex flex-col lg:flex-row gap-8">

    {/* ================= LEFT (70%) ================= */}
    <div className="w-full lg:w-[70%] space-y-6">

      {/* COUPON NOTICE */}
      <div className="bg-[#e6f7e6] text-[#2a7a25] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p>Use GET20OFF coupon code to get 20% off on minimum order above $100</p>
        <button className="uppercase border border-[#2a7a25] px-4 py-2 text-sm">
          Apply Coupon
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full  text-left ">
          <thead className="border-b  border-[#f1efea]">
            <tr>
              <th className="p-3 font-thin">Product</th>
              <th className="p-3 font-thin">Price</th>
              <th className="p-3 font-thin">Quantity</th>
              <th className="p-3 font-thin">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#f1efea]">
  <td className="p-3 flex items-center gap-4">
    <img
      src={product.images?.main}
      alt={product.name}
      className="w-[70px] h-[80px] object-cover"
    />
    <span>{product.name}</span>
  </td>

  <td className="p-3">${product.price}</td>

  <td className="p-3">
  <div className="flex items-center bg-[#f1efea] w-fit">

    {/* MINUS */}
    <button
      onClick={decreaseQty}
      className="px-3 py-1 text-lg"
    >
      -
    </button>

    {/* VALUE */}
    <span className="px-4">{quantity}</span>

    {/* PLUS */}
    <button
      onClick={increaseQty}
      className="px-3 py-1 text-lg"
    >
      +
    </button>

  </div>
</td>

  <td className="p-3">${subtotal}</td>
</tr>
          </tbody>
        </table>
      </div>

      {/* COUPON INPUT */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Coupon code"
            className="border p-2 w-full sm:w-[200px]"
          />
          <button className="bg-[#c19417] text-white px-4 py-2">
            Apply
          </button>
        </div>

        <button className="underline text-sm">
          Update Cart
        </button>
      </div>

      {/* FEATURES SCROLL */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-[700px]">

          {[
            {
              title: "Join Thousands of Happy and Satisfied Customers!",
              icon: "❤️",
            },
            {
              title: "Easy Returns",
              desc: "Enjoy Hassle-Free Returns and Exchanges – Shop Now!",
              icon: "🔁",
            },
            {
              title: "Order Now & Get Gift!",
              desc: "Order & Receive a Special Gift. Limited Time Only!",
              icon: "🎁",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-purple-100 text-purple-800 p-6 min-w-[220px]"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <p className="font-medium">{item.title}</p>
              {item.desc && <p className="text-sm mt-2">{item.desc}</p>}
            </div>
          ))}

        </div>
      </div>

    </div>

    {/* ================= RIGHT (30%) ================= */}
    <div className="w-full lg:w-[30%] space-y-6">

      {/* DELIVERY BOX */}
      <div className="border border-green-600 p-4">
        <div className="flex justify-between items-center">
          <div className="h-2 bg-green-500 w-full mr-2"></div>
          <span className="text-green-600">🚌</span>
        </div>
        <p className="mt-3 text-sm">
          Congratulations! Your order is eligible for FREE Delivery.
        </p>
      </div>

      {/* CART TOTALS */}
      <div className="bg-[#f1efea] p-5 space-y-4">

        <h3 className="font-medium">Cart Totals</h3>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <hr />

        {/* SHIPPING */}
        <div>
          <p className="mb-2">Shipping</p>

          <div className="space-y-2 text-sm">
            <label className="flex justify-between">
              <span>
                <input type="radio" name="ship" defaultChecked /> Free Shipping
              </span>
              <span>$0</span>
            </label>

            <label className="flex justify-between">
              <span>
                <input type="radio" name="ship" /> Local Pickup
              </span>
              <span>$5</span>
            </label>

            <label className="flex justify-between">
              <span>
                <input type="radio" name="ship" /> Flat Rate
              </span>
              <span>$10</span>
            </label>
          </div>

          <p className="text-sm mt-2">Shipping to Gujrat</p>
        </div>

        <hr />

        {/* TOTAL */}
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>$20</span>
        </div>

        <button className="w-full bg-[#c19417] text-white py-3">
          Proceed to Checkout
        </button>

        <p className="text-center text-sm mt-2">
          Guaranteed Safe And Secure Checkout
        </p>

        <img src="/payment.png" className="mx-auto mt-2" />

      </div>

    </div>

  </div>

  {/* ================= FEEDBACK SLIDER ================= */}
  <div className="mt-20 overflow-x-auto">

    <div className="flex gap-6 min-w-[900px]">

      {[1,2,3,4,5,6].map((i) => (
        <div
          key={i}
          className="border border-[#f1efea] rounded-lg p-6 min-w-[280px]"
        >
          <div className="text-[#c19417] mb-3">★★★★★</div>

          <h4 className="font-medium mb-2">
            Amazing Product Quality
          </h4>

          <p className="text-[#666] text-sm mb-4">
            Lorem Ipsum is simply dummy text of the printing industry.
          </p>

          <div className="flex items-center gap-3">
            <img
              src="/user.jpg"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-black text-sm">John Doe</p>
              <p className="text-[#666] text-xs">Founder</p>
            </div>
          </div>
        </div>
      ))}

    </div>

  </div>

</div>
      </div>
    </div>
  )
}



 /* 
  
 
 */