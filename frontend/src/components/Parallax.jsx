import React from "react";
import { Link } from "react-router-dom";

export default function Parallax({ data }) {
  return (
    <section
      className=" font-body relative  w-full min-h-[500px] md:min-h-[500px]  bg-cover  bg-top md:bg-fixed flex items-center"
      style={{ backgroundImage: `url(${data.img})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content */}
      <div className="relative  z-10 w-full px-4 md:px-10 lg:px-16">
        <div className="w-full flex justify-end">
          {/* Right side block */}
          <div className="max-w-125 ml-auto text-left">
            

            <h2 className="text-3xl max-w-100  md:text-5xl lg:text-[45px] leading-tight font-medium text-white mb-5">
              {data.heading}
            </h2>

            <p className="text-white/90 text-[16px] md:text-lg leading-7 mb-10">
              {data.description}
            </p>

            <Link
              to={data.link}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium tracking-wide hover:bg-[#c19417] hover:text-white transition duration-300"
            >
              {data.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}