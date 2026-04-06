import React from "react";
import { Link } from "react-router-dom";

export default function Delicate({ data }) {
  return (
    <section className="w-full py-16 px-4  max-w-[1440px] mx-auto font-body">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center">
        
        {/* Left Text Column */}
        <div className="flex flex-col items-center justify-center h-full">
          {/* <p className="text-sm uppercase tracking-[4px] text-[#c19417] mb-4">
            Elegant Jewelry
          </p> */}

          <h2 className="text-[22px] text-center lg:text-[32px] md:text-left lg:leading-[42px] leading-[30px] text-[#111111] mb-2 max-w-[420px]">
            {data.heading}
          </h2>

          <p className="text-[#666666] text-[14px] text-center md:text-left leading- max-w-[420px] mb-4">
            {data.description}
          </p>

          <Link
            to={data.link}
            className="inline-flex items-center justify-center w-fit px-4 py-3.5  hover:bg-black text-white text-sm  tracking-wide bg-[#c19417] transition duration-300"
          >
            {data.label}
          </Link>
        </div>

        {/* Middle Image */}
        <div className="relative overflow-hidden rounded-[24px] group">
          <img
            src={data.img1}
            alt="Jewelry Banner 1"
            className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-700 "
          />
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden rounded-[24px] group">
          <img
            src={data.img2}
            alt="Jewelry Banner 2"
            className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-700 "
          />
        </div>
      </div>
    </section>
  );
}