import React, { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import CategoryCard from "./CategoryCard";

export default function CategorySection({ categories }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -260,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 260,
      behavior: "smooth",
    });
  };
 
  return (
    <section className="w-full  pt-24 font-body">
      {/* Container */}
      <div className="max-w-[1440px] mx-auto px-4 ">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] md:text-[32px] font-medium text-gray-900">
            Shop By Categories
          </h2>
        </div>

        {/* Slider Wrapper */}
       {/* Slider Wrapper */}
<div className="relative group overflow-hidden">
  {/* Left Button */}
  <button
    onClick={scrollLeft}
    className="absolute left-0 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300 hover:bg-[#c19417] hover:text-white"
  >
    <RiArrowLeftSLine size={24} />
  </button>

  {/* Right Button */}
  <button
    onClick={scrollRight}
    className="absolute right-0 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300 hover:bg-[#c19417] hover:text-white"
  >
    <RiArrowRightSLine size={24} />
  </button>

  {/* Scroll Row */}
  <div
    ref={scrollRef}
    className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 sm:gap-5 lg:gap-6"
  >
    {categories.map((category) => (
      <div
        key={category.id}
        className="flex-shrink-0 w-[calc((100%-20px)/2)] sm:w-[calc((100%-40px)/3)] md:w-[calc((100%-48px)/4)] lg:w-[calc((100%-120px)/6)]"
      >
        <CategoryCard category={category} />
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}