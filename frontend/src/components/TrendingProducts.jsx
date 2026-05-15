import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function TrendingProducts({
  products,
  limit,
  title = "Trending Products",
  showTabs = true,
  filterTrending = true,
  spacing = "pt-24",
  hideHeading = false,
  tabsList,
  simpleTabs = false,
  fullWidth = false,
}) {
  const [activeTab, setActiveTab] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const[categories,setCategories]=useState([])
  const scrollRef = useRef(null);

  const tabs = tabsList || [];

  useEffect(() => {
  if (tabsList?.length > 0) {
    setActiveTab(tabsList[0]?.id || tabsList[0]);
  }
}, [tabsList]); // 

  const filteredProducts = showTabs
    ? products
        .filter((item) => {
          const parentId = String(item.category?.parentId?._id || "");
          const catId = String(item.category?._id || "");

          return (parentId === activeTab || catId === activeTab) && item.isTrending;
        })
        .slice(0, limit || products.length)
    : products
        .filter((item) => (filterTrending ? item.isTrending : true))
        .slice(0, limit || products.length);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className={`w-full ${spacing} font-user px-4 ${fullWidth ? "" : "max-w-[1440px] mx-auto"} font-user overflow-hidden`}>

      {/* Heading + Tabs */}
      <div className={`flex flex-col md:flex-row lg:items-center gap-2 mb-6 ${hideHeading ? "md:justify-center" : "md:justify-between"}`}>

        {!hideHeading && (
          <h2 className="text-2xl sm:text-[26px] md:text-[32px] font-medium text-gray-900">
            {title}
          </h2>
        )}

        {showTabs && (
          <div className="flex flex-wrap lg:justify-start gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id || tab}
                onClick={() => setActiveTab(tab.id || tab)}
                className={`px-4 sm:px-8 py-2.5 text-[14px] sm:text-[15px] font-medium capitalize transition duration-300 ${
                  simpleTabs
                    ? activeTab === (tab.id || tab)
                      ? "text-[#c19417]"
                      : "text-black hover:text-[#c19417]"
                    : activeTab === (tab.id || tab)
                      ? "bg-[#c19417] text-white"
                      : "text-black border-gray-300 hover:bg-[#c19417] hover:text-white bg-[#f5f5f5]"
                }`}
              >
                {tab.name || tab}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Slider */}
      <div
        className="relative group overflow-hidden"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <button
          onClick={scrollLeft}
          className={`hidden md:flex absolute left-2 top-[26%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#c19417] text-white shadow-lg items-center justify-center transition-all duration-300 ${
            showButtons ? "opacity-100 visible translate-x-0" : "opacity-0 invisible -translate-x-3"
          }`}
        >
          <RiArrowLeftSLine size={26} />
        </button>

        <button
          onClick={scrollRight}
          className={`hidden md:flex absolute right-2 top-[26%] -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#c19417] text-white shadow-lg items-center justify-center transition-all duration-300 ${
            showButtons ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-3"
          }`}
        >
          <RiArrowRightSLine size={26} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="max-w-[140px] sm:min-w-[48%] md:min-w-[240px] lg:min-w-[320px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}