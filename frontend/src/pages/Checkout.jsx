import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { RiBus2Line,RiCheckLine   } from "@remixicon/react";
import { productsData } from "../data/product";


export default function Checkout() {
  const location = useLocation();
  const [showAddress, setShowAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const product = productsData[0];

  const subtotal = 120;
  const total = 135;

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("checkout")) return "checkout";
    return "Page";
  };

  return (
    <div className="font-body">
      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px]">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
          <h1 className="text-[28px] uppercase font-semibold">
            {getTitle()}
          </h1>
        </div>
      </div>
{/* ================= MAIN ================= */}
      <div className="max-w-[1440px] mx-auto px-4 py-16  mb-20 md:mb-10 border-b border-[#f1efea]">
        <div className="flex flex-col xl:flex-row gap-10 items-start">

          {/* ================= LEFT ================= */}
          <div className="w-full xl:w-[60%] space-y-8 xl:sticky xl:top-6 self-start">
            <div className="border border-[#f1efea] p-6 space-y-5 bg-white">
              <h2 className="text-[22px] font-semibold">Billing details</h2>

              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" required />
                <Input label="Last name" />
              </div>

              <Input label="Phone" required full />
              <Input label="Email" required full />
              <Input label="Country / Region" required full />
              <Input label="Address" required full />

              <div className="grid grid-cols-2 gap-4">
                <Input label="State / Country" required />
                <Input label="Postcode / ZIP" required />
              </div>

             
            </div>
             <div className="space-y-2 text-lg pt-2">
                <label className="flex items-center mb-5 text-[#666] gap-2">
                  <input type="checkbox" />
                  Create an account
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Ship to a different address
                </label>
              </div>

              <div>
                <label className="text-sm text-[#666] block mb-1">
                  Order notes (optional)
                </label>
                <textarea className="w-full border border-[#f1efea] p-3 bg-white" />
              </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full xl:w-[40%]  space-y-6">

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

            <div className="border border-[#f1efea] bg-[#fafafa] p-6 space-y-4">
              <h3 className="text-lg font-semibold border-b pb-3 border-[#f1efea]">Your Order</h3>

              <div className="flex items-center gap-4 border-b border-[#f1efea]  pb-4">
                <div className="relative">
                  <img
        src={product.images?.main}
        alt={product.name}
        className="md:w-[70px] md:h-[80px] w-[50px] h-[50px] object-cover"
      />

      <div className="absolute -top-0 right-2  ">
       <p className="bg-white w-5 h-5 text-center text-sm  border border-[#f1efea] rounded-full ">1</p>
      </div>
                </div>
                <div className="flex-1">
                  <p className="">{product.name}</p>
                  
                </div>
                <p className="font-medium">${subtotal}</p>
              </div>
{/* ================= shipping ================= */}
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

<div className="border-y py-4 border-[#f1efea] ">


              <div className="flex justify-between pb-5 font-semibold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <div className="bg-[#f1efea] md:p-6 p-2">
                <p className="text-sm md:text-base">
                 <span className="text-[#666]">Have a promo code? .</span>
                <span className="text-[#c19417] ">Click here to enter your code.</span>
                </p> 

              </div>
              </div>
{/* ================= bank transfer ================= */}
                <div className="space-y-3 pb-5 text-sm tracking-wide">

      

      <label className="flex justify-between items-center cursor-pointer">
        <span className="flex font-semibold items-center text-[15px] tracking-[0.5px] gap-2">
<input 
  type="radio" 
  name="payment" 
  className="accent-black bg-white"
  onChange={() => setPaymentMethod("bank")}
/>          Direct bank transfer
        </span>
        
      </label>
      {paymentMethod === "bank" && (
  <div className=" text-[#666] leading-[28px] mt-2">
    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
  </div>
)}

      <label className="flex justify-between items-center cursor-pointer">
        <span className="flex items-center font-semibold text-[15px] tracking-[0.5px] gap-2">
          <input 
  type="radio" 
  name="payment" 
  className="accent-black bg-white"
  onChange={() => setPaymentMethod("check")}
/>
          Check payments
        </span>
        
      </label>

      {paymentMethod === "check" && (
  <div className=" text-[#666] mt-2 leading-[28px]">
    Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
  </div>
)}

      <label className="flex justify-between items-center cursor-pointer">
        <span className="flex items-center font-semibold text-[15px] tracking-[0.5px] gap-2">
<input 
  type="radio" 
  name="payment" 
  className="accent-black bg-white"
  onChange={() => setPaymentMethod("cod")}
/>        Cash on delivery
        </span>
        
      </label>

    
{paymentMethod === "cod" && (
  <div className=" text-[#666] mt-2">
    Pay with cash upon delivery.
  </div>
)}

    </div>


              <p className="text-[15px] leading-[28px] text-[#666]">
                <span>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our </span> <span className="text-[#c19417]">privacy policy.</span>
              </p>

              <button className="w-full bg-[#c19417] text-white py-3 hover:bg-black transition">
                Place Order
              </button>

              <p className="text-center text-sm mt-2 font-medium">
    Guaranteed Safe And Secure Checkout
  </p>

  <img src="/payment.png" className="mx-auto mt-2" />

            </div>
            <div className="flex items-center justify-center"><img src="/trust_badge_new.png" alt="" /></div>
{/*    img */}
            <div className="bg-[#F3F4FC] border rounded-lg border-[#DEE3F2] p-6 space-y-4">

  <div>
    <h3 className="text-[18px] font-semibold text-[#4F5181]">
      Buy with Confidence
    </h3>
    <p className="text-sm text-[#4F5181] mt-1">
      Join Over 20,000+ Satisfied Customers Worldwide
    </p>
  </div>

  <div className="space-y-3  lg:mt-7 text-sm ">

    <div className="flex items-center gap-2 text-[#4F5181]   rounded">
      <span className="text-[#4F5181] rounded-full border border-[#4F5181]"><RiCheckLine size={15}  /></span>
      Secure Payments, Guaranteed Privacy
    </div>

    <div className="flex items-center gap-2 text-[#4F5181]   rounded">
      <span className="text-[#4F5181] rounded-full border border-[#4F5181]"><RiCheckLine size={15}  /></span>
      Hassle-Free Returns and Refunds
    </div>

    <div className="flex items-center gap-2  text-[#4F5181]   rounded">
      <span className="text-[#4F5181] rounded-full border border-[#4F5181]"><RiCheckLine  size={15}  /></span>
      Fast and Reliable Shipping
    </div>

  </div>

          </div>




          <div className="mt-10 overflow-x-auto scrollbar-hide  md:pb-20 pb-10">
    <div className="flex gap-6 min-w-[500px]  ">

      {[1,2,3,4].map((i) => (
        <div
          key={i}
          className="border border-[#f1efea] rounded-lg p-6 md:min-w-[730px] min-w-[286px] lg:min-w-[980px] "
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
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */
const Input = ({ label, required, full }) => {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-sm text-[#666] mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full bg-white border border-[#f1efea] p-3 outline-none text-sm"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};



/* 
jb direct bank transfer py clk kru to uska dropdown open ho jy jis mein yeh text h 
Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
jb check payment sk radio btn py clk kru to uska  drop down kuch yeh ho 
Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
jb cash on delivery py clk kru to uska drop down yeh ho  
Pay with cash upon delivery.


*/