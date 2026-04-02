import React, { useRef, useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { RiArrowLeftSLine ,RiArrowRightSLine  } from '@remixicon/react';

export default function BlogSlider({ blogs }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();

    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      slider.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const cardWidth = container.offsetWidth / 3; // desktop pe 3 cards

    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-14 md:py-16 px-4 md:px-10 lg:px-16 font-body">
      <h2 className="text-[24px] md:text-[32px] text-center font-medium mb-8">Latest Blogs</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border bg-white shadow-md flex items-center justify-center transition ${
          !canScrollLeft
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#c19417] hover:text-white"
        }`}
      >
        <RiArrowLeftSLine size={28} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-6 px-2"
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="min-w-full sm:min-w-[48%] lg:min-w-[31.5%] flex-shrink-0 px-2 py-2"
          >
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border bg-white shadow-md flex items-center justify-center transition ${
          !canScrollRight
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#c19417] hover:text-white"
        }`}
      >
        <RiArrowRightSLine size={28} />
      </button>
    </section>
  );
}