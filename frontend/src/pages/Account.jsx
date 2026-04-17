import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

export default function Account() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("account")) return "Account";
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
      <div className="max-w-[1440px] mx-auto px-4 py-16 mb-20 border-b border-[#f1efea]">

        <div className="flex flex-col md:flex-row gap-10">

          {/* ================= LOGIN ================= */}
          <div className="w-full md:w-1/2 space-y-6 ]">
            <h2 className="text-3xl font-semibold">Login</h2>
<div className="border border-[#f1efea] rounded-lg p-6">


            {/* Username */}
            <div>
              <label className="text-[15px] text-[#666] mb-3 block">
                Username or email address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-[15px] text-[#666] mb-3 block">
                Password <span className="text-red-500">*</span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 pr-10 bg-white outline-none text-sm"
              />

              {/* EYE ICON */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-[#666]"
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </span>
            </div>

            {/* BUTTON + REMEMBER */}
            <div className="flex items-center  mb-5 gap-5">
              

              <button className="bg-[#c19417] text-white px-6 py-2 uppercase text-[15px] font-semibold hover:bg-black transition-all duration-300">
                Login
              </button>
              <label className="flex items-center text-[#666] gap-2 text-sm">
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            {/* FORGOT PASSWORD */}
            <p className="text-[#c19417] text-[15px] cursor-pointer">
              Lost your password?
            </p>
          </div>
</div>
          {/* ================= REGISTER ================= */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">Register</h2>
<div className="border border-[#f1efea] p-6 rounded-lg">

            {/* Username */}
            <div>
              <label className="text-[15px] text-[#666] mb-3 block">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-[#666] mb-3 block">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#666] mb-3 block">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* TEXT */}
            <p className="text-[15px] mb-4 text-[#666] leading-relaxed">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and
              for other purposes described in our{" "}
              <span className="text-[#c19417] cursor-pointer">
                privacy policy
              </span>.
            </p>

            {/* BUTTON */}
            <button className="bg-[#c19417] text-white font-medium px-6 py-3 uppercase text-sm hover:bg-black transition-all duration-300">
              Register
            </button>
          </div>
</div>

        </div>
      </div>
    </div>
  );
}