import React, { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import CategoryCard from "./CategoryCard";

export default function CategorySection({ categories }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -220,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 220,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-4">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl text-center md:text-4xl font-semibold text-gray-900">
          Explore Our Collection
        </h2>
      </div>

      {/* Slider Wrapper */}
      <div className="relative group">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300 hover:bg-[#c19417] hover:text-white"
        >
          <RiArrowLeftSLine size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300 hover:bg-[#c19417] hover:text-white"
        >
          <RiArrowRightSLine size={24} />
        </button>

        {/* Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[150px] sm:min-w-[170px] md:min-w-[180px] lg:min-w-[190px] flex-shrink-0"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}