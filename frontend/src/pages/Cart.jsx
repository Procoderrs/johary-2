import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { productsData } from "../data/product";
import { RiCloseLine,RiPokerHeartsFill,RiArrowLeftRightLine ,RiGift2Fill,RiBus2Line} from "@remixicon/react";

export default function Cart() {
   const location = useLocation();
   const getTitle = () => {
    const path = location.pathname;
    if (path.includes("cart")) return "Cart";
    return "Page";
  };
  const [showAddress, setShowAddress] = useState(false);
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
      <div className="relative w-full min-h-[160px] ">
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


      <div className="max-w-[1440px] mx-auto px-4 md:py-16 py-4">

  {/* ================= MAIN FLEX ================= */}
  <div className="flex flex-col  xl:flex-row gap-8">

    {/* ================= LEFT (70%) ================= */}
<div className="w-full xl:w-[65%] space-y-8 xl:sticky lg:top-6 self-start">
  <h2 className="md:text-4xl text-3xl font-medium">Cart Summary</h2>
      {/* COUPON NOTICE */}
      <div className="bg-[#e6f7e6] text-[#2a7a25] p-4 flex flex-col text-center md:text-left md:flex-row md:justify-between items-center gap-3">
        <p className="tracking-[0.1px] max-w-[550px]">Use GET20OFF coupon code to get 20% off on minimum order above $100</p>
        <button className="uppercase transition font-semibold hover:bg-[#2a7a25] hover:text-white xl:w-[200px] border border-[#2a7a25] px-4 py-2 md:px-2 md:py-3 text-[15px]">
          Apply Coupon
        </button>
      </div>

      {/* TABLE */}
      <div className="hidden md:block  overflow-x-auto">
        <table className="w-full  text-left ">
          <thead className="border-b border-[#f1efea]">
  <tr>
    <th className="w-[40px]"></th> {/* cross column */}
    <th className="p-3 font-medium text-lg">Product</th>
    <th className="p-3 font-medium text-lg">Price</th>
    <th className="p-3 font-medium text-lg">Quantity</th>
    <th className="p-3 font-medium text-lg">Subtotal</th>
  </tr>
</thead>

          <tbody>
          <tr className="border-b border-[#f1efea]">

  {/* CROSS ICON */}
  <td className="p-3 text-center">
    <button className="text-red-700 hover:bg-red-800 rounded-full hover:text-white transition">
      <RiCloseLine size={20} />
    </button>
  </td>

  {/* PRODUCT */}
  <td className="p-3">
    <div className="flex items-center gap-4">
      <img
        src={product.images?.main}
        alt={product.name}
        className="w-[70px] h-[80px] object-cover"
      />
      <span>{product.name}</span>
    </div>
  </td>

  {/* PRICE */}
  <td className="p-3 font-medium text-lg">
    ${product.price}
  </td>

  {/* QUANTITY */}
  <td className="p-3">
    <div className="flex items-center bg-[#f1efea] w-fit">
      <button onClick={decreaseQty} className="px-3 py-1 text-lg">-</button>
      <span className="px-4 text-[#666]">{quantity}</span>
      <button onClick={increaseQty} className="px-3 py-1 text-lg">+</button>
    </div>
  </td>

  {/* SUBTOTAL */}
  <td className="p-3 font-medium text-lg">
    ${subtotal}
  </td>

</tr>
          </tbody>
        </table>
      </div>
{/* ================= MOBILE CART ================= */}
<div className="md:hidden space-y-4">

  {/* SINGLE PRODUCT CARD */}
  <div className="border-b border-[#f1efea] pb-4 space-y-4">

    {/* ROW 1: CROSS + IMAGE */}
    <div className="flex items-center gap-16 border-b border-[#f1efea] pb-3">
      <button className="text-red-700">
        <RiCloseLine size={20} />
      </button>
      <img
        src={product.images?.main}
        alt={product.name}
        className="w-[70px] h-[80px] object-cover"
      />

      
    </div>

    {/* ROW 2: PRODUCT NAME */}
    <div className="border-b border-[#f1efea] flex items-center justify-between  gap-12 pb-3">
      <p className="text-sm text-[#666]">Product</p>
      <p className="md:font-medium">{product.name}</p>
    </div>

    {/* ROW 3: PRICE */}
    <div className="border-b flex items-center justify-between border-[#f1efea] gap-12 pb-3">
      <p className="text-sm text-[#666]">Price</p>
      <p className="md:font-medium">${product.price}</p>
    </div>

    {/* ROW 4: QUANTITY */}
    <div className="border-b border-[#f1efea] flex items-center justify-between pb-3">
      <p className="text-sm text-[#666]">Quantity</p>

      <div className="flex items-center bg-[#f1efea] w-fit mt-2">
        <button onClick={decreaseQty} className="px-3 py-1 text-lg">-</button>
        <span className="px-4 text-[#666]">{quantity}</span>
        <button onClick={increaseQty} className="px-3 py-1 text-lg">+</button>
      </div>
    </div>

    {/* ROW 5: SUBTOTAL */}
    <div className="flex items-center justify-between">
      <p className="text-sm text-[#666]">Subtotal</p>
      <p className="font-medium">${subtotal}</p>
    </div>

  </div>

</div>
      {/* COUPON INPUT */}
      <div className="flex flex-col  gap-4 justify-between  md:flex-row   ">
        <div className="flex gap-2 w-full   sm:w-auto">
          <input
            type="text"
            placeholder="Coupon code"
            className="border border-[#f1efea] p-2 w-full "
          />
          <button className="bg-[#c19417] w-full text-[15px] font-medium uppercase text-white px-4 py-2">
            Apply  <span>Coupan</span>
          </button>
        </div>

        <button className="underline uppercase  text-[15px] font-semibold">
          Update Cart
        </button>
      </div>

      {/* FEATURES SCROLL */}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center text-center gap-4 min-w-[700px]">

          {[
            {
              title: "Loved by Thousands",
              desc:"Join Thousands of Happy and Satisfied Customers!",
              icon: RiPokerHeartsFill,
            },
            {
              title: "Easy Returns",
              desc: "Enjoy Hassle-Free Returns and Exchanges – Shop Now!",
              icon: RiArrowLeftRightLine,
            },
            {
              title: "Order Now & Get Gift!",
              desc: "Order & Receive a Special Gift. Limited Time Only!",
              icon: RiGift2Fill,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F3F4FC]  text-purple-800 border-[#DEE3F2] p-4 min-w-[220px] "
            >
<div className="text-2xl mb-3 text-[#4F5181] flex justify-center "><item.icon size={28} /></div>  
            <p className="font-medium text-[#4F5181]">{item.title}</p>
              {item.desc && <p className="text-sm mt-2 text-[#4F5181]">{item.desc}</p>}
            </div>
          ))}

        </div>
      </div>

    </div>

    {/* ================= RIGHT (30%) ================= */}
<div className="w-full xl:w-[65%] space-y-8 xl:sticky lg:top-6 self-start">
      {/* DELIVERY BOX */}
    <div className="border border-dashed border-green-600 rounded-lg px-8 py-8 text-center">

  {/* TOP BAR */}
  <div className="relative">

    {/* BUS ICON (RIGHT SIDE - FULL visible) */}
    <span className="absolute -top-2 -right-5 text-green-600">
      <RiBus2Line size={22} />
    </span>

    {/* PROGRESS BAR */}
    <div className="h-1.5 bg-green-200 w-full  overflow-hidden">
      <div className="h-full bg-green-500 w-[100%] rounded-full"></div>
    </div>

  </div>

  {/* TEXT */}
  <p className="mt-4 font-medium text-[15px] ">
    Congratulations! Your order is eligible for FREE Delivery.
  </p>

</div>
          {/* ================= billing info ================= */}
     <div className="bg-[#f1efea] p-6 space-y-5 rounded-lg">

  <h3 className="font-semibold text-[20px]">Cart totals</h3>

  {/* SUBTOTAL */}
  <div className="flex justify-between pb-3 border-b border-[#ddd]">
    <span className="font-medium">Subtotal</span>
    <span className="font-semibold">${subtotal}</span>
  </div>

  {/* SHIPPING */}
  <div className="pt-2">
    <p className="mb-3 font-medium">Shipping</p>

    <div className="space-y-3 text-sm tracking-wide">

      <label className="flex justify-between items-center cursor-pointer">
        <span className="flex items-center text-[15px] tracking-[0.5px] gap-2">
          <input type="radio" name="ship" defaultChecked className="accent-black bg-white"/>
          Free Shipping
        </span>
        <span className="font-medium">$0</span>
      </label>

      <label className="flex justify-between items-center cursor-pointer">
        <span className="flex items-center text-[15px] tracking-[0.5px] gap-2">
          <input type="radio" name="ship" className="accent-black bg-white"/>
          Local Pickup
        </span>
        <span className="font-medium">$5</span>
      </label>

      <label className="flex justify-between items-center cursor-pointer">
        <span className="flex items-center text-[15px] tracking-[0.5px] gap-2">
          <input type="radio" name="ship" className="accent-black bg-white"/>
          Flat Rate
        </span>
        <span className="font-medium">$10</span>
      </label>

    </div>

    <p className="text-[15px] mt-6">
      <span>Shipping to </span>
      <span className="font-medium">Gujrat</span>
    </p>

    {/* CHANGE ADDRESS */}
    <p
      onClick={() => setShowAddress(!showAddress)}
      className="text-right underline text-[15px] cursor-pointer hover:text-[#c19417] transition"
    >
      Change address
    </p>

    {/* ADDRESS FORM (ANIMATED) */}
    <div
      className={`transition-all duration-500 overflow-hidden ${
        showAddress ? "max-h-[500px] mt-5" : "max-h-0"
      }`}
    >
      <div className="space-y-4">

        {/* COUNTRY */}
        <div>
          <label className="text-sm font-medium text-[#666] block mb-1">
            Country / Region
          </label>
          <input
            type="text"
            placeholder="Enter country"
            className="w-full p-3 bg-white outline-none text-sm placeholder:text-[#666]"
          />
        </div>

        {/* STATE */}
        <div>
          <label className="text-sm tracking-[0.5px] font-medium text-[#666] block mb-1">
            State / Country <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter state"
            className="w-full p-3 bg-white outline-none text-sm placeholder:text-[#666]"
          />
        </div>

        {/* CITY */}
        <div>
          <label className="text-sm text-[#666] tracking-[0.5px] font-medium block mb-1">
            City<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter city"
            className="w-full p-3 bg-white outline-none text-sm placeholder:text-[#666]"
          />
        </div>

        {/* ZIP */}
        <div>
          <label className="text-sm text-[#666] tracking-[0.5px] font-medium block mb-1">
            Postcode / ZIP <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter postcode"
            className="w-full p-3 bg-white outline-none b text-sm placeholder:text-[#666]"
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
  <button className="bg-[#c19417] text-white py-3 px-6 uppercase text-sm font-medium hover:bg-black transition-all duration-300">
    Update
  </button>
</div>

      </div>
    </div>

  </div>

  {/* TOTAL */}
  <div className="flex justify-between pt-4 border-t border-[#ddd]">
    <span className="font-semibold text-lg">Total</span>
    <span className="font-semibold text-lg">$190</span>
  </div>

  {/* BUTTON */}
  <button className="w-full bg-[#c19417] text-white py-3 text-[16px] font-medium hover:bg-black transition">
    Proceed to Checkout
  </button>

  <p className="text-center text-sm mt-2 font-medium">
    Guaranteed Safe And Secure Checkout
  </p>

  <img src="/payment.png" className="mx-auto mt-2" />

</div>
    </div>

  </div>

  {/* ================= FEEDBACK SLIDER ================= */}
<div className="mt-20 overflow-x-auto scrollbar-hide border-b md:pb-20 pb-10 border-[#f1efea]">
    <div className="flex gap-6 min-w-[900px]">

      {[1,2,3,4].map((i) => (
        <div
          key={i}
          className="border border-[#f1efea] rounded-lg p-6 md:min-w-[350px] min-w-[286px] lg:min-w-[480px]"
        >
          <div className="text-[#c19417] mb-3">★★★★★</div>

          <h4 className="font-medium text-lg tracking-wide mb-2">
            Best Online Fashion Site
          </h4>

          <p className="text-[#666] text-sm leading-[28px] mb-4">
            "Lorem Ipsum is simply dummy text of the printing industry.
            Lorem Ipsum is simply dummy text of the printing industry.
            Lorem Ipsum is simply dummy text of the printing industry."
          </p>

          <div className="flex items-center gap-3">
            <img
              src="/testi_4.jpg"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-black font-medium text-[18px]">Tarzen Key</p>
              <p className="text-[#666] text-[15px]">Founder</p>
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



 