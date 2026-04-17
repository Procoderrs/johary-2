import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiHeartLine,
  RiEyeLine,
  RiStarFill,
  RiStarHalfFill,
  RiStarLine,
} from "@remixicon/react";

export default function ProductCard({ product, view }) {
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
    <div
      className={
        view === "list"
          ? "flex gap-6 border border-[#f1efea] rounded-xl p-4 items-center"
          : "group w-full font-body border border-[#f1efea] rounded-xl p-3"
      }
    >
      {/* ================= IMAGE ================= */}
      <div
        className={
          view === "list"
            ? "w-[160px] h-[160px] min-w-[160px] bg-[#f8f8f8] overflow-hidden"
            : "relative overflow-hidden bg-[#f8f8f8]"
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ICONS (only grid) */}
        {view !== "list" && (
          <div className="absolute sm:top-4 top-2 sm:right-4 right-3 z-20 flex flex-col gap-2">
            <button
              onClick={(e) => e.preventDefault()}
              className="sm:w-10 sm:h-10 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <RiHeartLine size={14} />
            </button>

            <button
              onClick={(e) => e.preventDefault()}
              className="sm:w-10 sm:h-10 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <RiEyeLine size={18} />
            </button>
          </div>
        )}

        <Link to={`/product/${product.slug}`}>
          {/* 🔥 FIXED IMAGE (no absolute in list view) */}
          {view === "list" ? (
            <img
              src={product.images.main}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative h-[120px] sm:h-[220px] lg:h-[230px] xl:h-[300px] w-full overflow-hidden">
              <img
                src={product.images.main}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />

              <img
                src={product.images.hover}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          )}

          {/* GRID BUTTON */}
          {view !== "list" && (
            <div className="hidden lg:block absolute bottom-0 left-0 w-full px-4 pb-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 z-20">
              <button
                onClick={(e) => e.preventDefault()}
                className="w-full bg-[#c19417] text-white py-3 text-sm hover:bg-black transition"
              >
                Select Options
              </button>
            </div>
          )}
        </Link>
      </div>

      {/* ================= CONTENT ================= */}
      <div className={view === "list" ? "flex-1 space-y-2" : "pt-5"}>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-[16px] text-gray-900 hover:text-[#c19417] transition">
            {product.name}
          </h3>
        </Link>

        {/* STARS */}
        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
        </div>

        {/* PRICE */}
        <p className="text-[18px] font-semibold text-black">
          ${product.price}
        </p>

        {/* DESCRIPTION (LIST ONLY) */}
        {view === "list" && (
          <p className="text-sm text-[#666] line-clamp-2">
            {product.description ||
              "Premium quality product with elegant design."}
          </p>
        )}

        {/* BUTTON */}
        <div className={view === "list" ? "" : "lg:hidden mt-2"}>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-fit px-12 bg-[#c19417] text-white py-3 text-sm hover:bg-black transition"
          >
            Select Options
          </button>
        </div>
      </div>
    </div>
  );
}