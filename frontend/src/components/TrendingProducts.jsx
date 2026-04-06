import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function TrendingProducts({
  products,
  limit,
  title = "Trending Products",
  showTabs = true,
  filterTrending = true,
}) {
  const [activeTab, setActiveTab] = useState("bracelets");
  const [showButtons, setShowButtons] = useState(false);
  const scrollRef = useRef(null);

  const tabs = ["bracelets", "rings", "pendant"];

  const filteredProducts = showTabs
    ? products
        .filter((item) => item.category === activeTab && item.isTrending)
        .slice(0, limit || products.length)
    : products
        .filter((item) => (filterTrending ? item.isTrending : true))
        .slice(0, limit || products.length);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-16 px-4 max-w-[1440px] mx-auto font-body">
      {/* Top Heading + Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-8 md:mb-10">
        <div className="text-left">
          {/* <p className="text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] text-[#c19417] mb-2">
            {subtitle}
          </p> */}
          <h2 className="text-2xl sm:text-[26px] md:text-4xl font-medium text-gray-900">
            {title}
          </h2>
        </div>

        {/* Tabs only if showTabs = true */}
        {showTabs && (
          <div className="flex flex-wrap  lg:justify-start gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 text-[14px] sm:text-[15px] font-medium capitalize transition duration-300 border ${
                  activeTab === tab
                    ? "bg-[#c19417] text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Slider */}
      <div
        className="relative group"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Left Button - desktop only */}
        <button
          onClick={scrollLeft}
          className={`hidden md:flex absolute left-0 lg:-left-5 top-[26%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#c19417] text-white shadow-lg items-center justify-center transition-all duration-300 ${
            showButtons
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible -translate-x-3"
          }`}
        >
          <RiArrowLeftSLine size={26} />
        </button>

        {/* Right Button - desktop only */}
        <button
          onClick={scrollRight}
          className={`hidden md:flex absolute right-0 lg:-right-5 top-[26%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#c19417] text-white shadow-lg items-center justify-center transition-all duration-300 ${
            showButtons
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-3"
          }`}
        >
          <RiArrowRightSLine size={26} />
        </button>

        {/* Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[48%] min-h-[45%] sm:min-w-[48%] md:min-w-[240px] lg:min-w-[220px] md:min-h-[400px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}