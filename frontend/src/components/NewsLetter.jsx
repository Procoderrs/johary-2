import React from "react";

export default function Newsletter() {
  return (
    <section className="w-full  py-20 px-4 md:px-10 lg:px-16 font-body text-center">
      {/* Heading */}
      <h2 className="text-[28px] md:text-[36px] font-bold text-[#111111] mb-4">
       Subscribe To Our Newsletter
      </h2>

      {/* Subheading */}
      <p className="text-[#666666] text-[16px] md:text-[18px] mb-8 max-w-2xl mx-auto">
        Subscribe to our latest newsletter to get news about special discounts.
      </p>

      {/* Email Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-6 py-4   border border-[#cccccc] text-[#111111] text-base focus:outline-none bg-[#f5f5f5] focus:border-[#c19417]"
        />
        <button className="px-8 py-4 bg-[#c19417] hover:bg-[#a67b12] text-white font-semibold  transition">
          Subscribe
        </button>
      </div>

      
    </section>
  );
}