import React from "react";
import { Link } from "react-router-dom";

export default function Delicate({ data }) {
  return (
    <section className="w-full py-24 px-4 max-w-[1440px] mx-auto font-body overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-4 items-center">
        
        {/* Left Text Column */}
        <div className="flex flex-col justify-center h-full max-w-[500px]">
          <h2 className="text-[22px] lg:text-[24px] text-center font-medium md:text-left lg:leading-[42px] leading-[30px] text-[#111111] mb-2 max-w-[320px]">
            {data.heading}
          </h2>

          <p className="text-[#666666] text-[14px] lg:text-[15px] tracking-[0.5px] lg:leading-[25px] text-center md:text-left mb-4">
            {data.description}
          </p>

          <Link
            to={data.link}
            className="inline-flex items-center justify-center w-fit px-8 py-3.5 hover:bg-black text-white font-medium tracking-wide bg-[#c19417] transition duration-300"
          >
            {data.label}
          </Link>
        </div>

        {/* Middle Image */}
        <div className="relative overflow-hidden group min-w-0">
          <img
            src={data.img1}
            alt="Jewelry Banner 1"
            className="w-full h-[420px] md:h-[300px] lg:h-full object-cover transition-transform duration-700"
          />
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden group min-w-0">
          <img
            src={data.img2}
            alt="Jewelry Banner 2"
            className="w-full h-[420px] md:h-[300px] lg:h-full object-cover transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}