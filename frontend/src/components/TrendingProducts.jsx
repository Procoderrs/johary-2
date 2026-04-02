import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function TrendingProducts({ products, limit }) {
  const [activeTab, setActiveTab] = useState("bracelets");
  const [showButtons, setShowButtons] = useState(false);
  const scrollRef = useRef(null);

  const tabs = ["bracelets", "rings", "pendant"];

  const filteredProducts = products
    .filter((item) => item.category === activeTab && item.isTrending)
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
    <section className="w-full py-16 px-4 md:px-10 lg:px-8 font-body">
      {/* Top Heading + Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <p className="text-sm uppercase tracking-[4px] text-[#c19417] mb-2">
            New Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Trending Products
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5  text-[15px] font-medium capitalize transition duration-300 border ${
                activeTab === tab
                  ? "bg-[#c19417] text-white "
                  : "bg-white text-gray-700 border-gray-300 hover:bg-black hover:text-white hover:border-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product Slider */}
      <div
        className="relative group"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className={`absolute left-0 md:-left-5  top-[26%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#c19417] text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
            showButtons
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible -translate-x-3"
          }`}
        >
          <RiArrowLeftSLine size={26} />
        </button>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className={`absolute right-0 md:-right-5 top-[26%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#c19417] text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
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
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] md:min-h-[400px] "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}