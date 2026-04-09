import React from "react";
import { Link } from "react-router-dom";

export default function Parallax({ data }) {
  return (
    <section
      className=" font-body relative w-full min-h-[350px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[500px] xl:min-h-[500px] overflow-hidden bg-cover 2xl:bg-fixed bg-top  flex items-center"
      style={{ backgroundImage: `url(${data.img})` }}
    >
      {/* Overlay */}
     {/*  <div className="absolute inset-0 bg-black/10"></div> */}

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16">
        <div className="w-full flex justify-end items-center">
          
          {/* Text Block */}
          <div className="w-full max-w-[180px] sm:max-w-[260px] md:max-w-[360px] lg:max-w-[430px] xl:max-w-[430px]  mr-[2%] sm:mr-[4%] md:mr-[-20px] lg:mr-[20px] lg:mt-[40px] xl:mr-[12%] 2xl:mr-[10%]">
            
            <h2 className="text-[20px] sm:text-[28px] md:text-[38px] lg:text-[38px] lg:leading-[55px] font-medium text-white mb-3 sm:mb-4 md:mb-3">
              {data.heading}
            </h2>

            <p className="text-white/90 text-[11px] sm:text-[14px] lg:text-[15px]  leading-5 sm:leading-6 md:leading-7 mb-6 sm:mb-8 md:mb-10">
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