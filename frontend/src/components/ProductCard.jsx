import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiHeartLine,
  RiEyeLine,
  RiStarFill,
  RiStarHalfFill,
  RiStarLine,
} from "@remixicon/react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<RiStarFill key={i} size={16} className="text-[#c19417]" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <RiStarHalfFill key={i} size={16} className="text-[#c19417]" />
        );
      } else {
        stars.push(<RiStarLine key={i} size={16} className="text-[#c19417]" />);
      }
    }

    return stars;
  };

  return (
    <div className="group w-full font-body">
      {/* Image Box */}
      <div
        className="relative overflow-hidden bg-[#f8f8f8] "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Right Icons */}
        <div className="absolute sm:top-4 top-2 sm:right-4 right-3 z-20 flex flex-col gap-2">
          <button
            onClick={(e) => e.preventDefault()}
            className="sm:w-10 sm:h-10 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition duration-300"
          >
            <RiHeartLine size={14} />
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="sm:w-10 sm:h-10 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition duration-300"
          >
            <RiEyeLine size={18} className=""  />
          </button>
        </div>

        <Link to={`/product/${product.slug}`}>
          {/* FIXED IMAGE WRAPPER */}
          <div className="relative h-[120px] sm:h-[220px] lg:h-[230px] xl:h-[300px] w-full overflow-hidden ">
            <img
              src={product.images.main}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover  transition-all duration-700 ${
                isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
              }`}
            />

            <img
              src={product.images.hover}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          </div>

          {/* Button */}
        {/* Desktop Button - lg and up */}
<div className="hidden lg:block absolute bottom-0 left-0 w-full px-4 pb-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 z-20">
  <button
    onClick={(e) => e.preventDefault()}
    className="w-full bg-[#c19417] text-white py-3 text-sm font-medium tracking-wide hover:bg-black transition duration-300"
  >
    Select Options
  </button>
</div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="pt-5 ">

 <Link to={`/product/${product.slug}`}>
          <h3 className="sm:text-[17px] text-sm text-gray-900 leading-snug mb-2 hover:text-[#c19417] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-start items-center gap-1 mb-2">
          {renderStars(product.rating)}
        </div>

       

        <div className="flex items-center justify-start gap-2">
          <span className="text-[18px] font-semibold text-black">
            ${product.price}
          </span>
        </div>
<div className="  lg:hidden bottom-0 left-0 w-full   mt-1 z-20">
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full bg-[#c19417] text-white py-3  text-sm font-medium tracking-wide hover:bg-black transition duration-300"
            >
              Select Options
            </button>
          </div>

      </div>
    </div>
  );
}