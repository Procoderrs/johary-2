import React from "react";
import { Link } from "react-router-dom";

export default function Parallax({ data }) {
  return (
    <section
      className="font-body relative w-full min-h-[350px] sm:min-h-[420px] md:min-h-[500px] bg-cover bg-top md:bg-fixed flex items-center"
      style={{ backgroundImage: `url(${data.img})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="w-full flex justify-end">
          {/* Right side block */}
          <div className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[420px] lg:max-w-[500px] text-right mt-6 sm:mt-8 md:mt-10 ml-auto">
            <h2 className="text-[16px] sm:text-[28px] md:text-[38px] lg:text-[45px] leading-tight font-medium text-white mb-3 sm:mb-4 md:mb-5">
              {data.heading}
            </h2>

            <p className="text-white/90 text-[11px] sm:text-[14px] md:text-[16px] lg:text-lg leading-5 sm:leading-6 md:leading-7 mb-6 sm:mb-8 md:mb-10">
              {data.description}
            </p>

            <Link
              to={data.link}
              className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white text-black text-[11px] sm:text-sm font-medium tracking-wide hover:bg-[#c19417] hover:text-white transition duration-300"
            >
              {data.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}