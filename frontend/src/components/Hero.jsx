import React, { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function Hero({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
  className="relative w-full max-w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[83vh]   2xl:h-[75vh] 3xl:h-[55vh] font-body overflow-hidden"
>
  {/* Hero Content */}
  {data.map((item, index) => (
    <div
      key={index}
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <img
        src={item.img}
        alt={item.heading}
        className="w-full h-full object-cover"
      />

      {/* Text Container */}
      <div className="absolute top-0 left-0 h-full flex items-center px-4 sm:px-6 md:px-10 lg:pl-[25%] xl:pl-[15%] 2xl:pl-[35%] 3x">
        <div className="max-w-[320px]">
          <h1
            className={`text-[14px] sm:text-[28px] md:text-[39px] md:leading-11 text-white mb-2 transform transition-all duration-700 ${
              index === currentIndex ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {item.heading}
          </h1>

          <p
            className={`text-[9px] sm:text-[12px] tracking-[1px] sm:tracking-[1.3505px] leading-snug text-white transition-opacity duration-700 delay-300 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.description}
          </p>

          {item.label && item.link && (
            <a
              href={item.link}
              className={`inline-block mt-4 md:mt-6 px-4 py-2 md:px-6 md:py-3 bg-white text-[10px] sm:text-[12px] md:text-[14px] font-medium transition-all duration-700 delay-500 ${
                index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {item.label}
            </a>
          )}
        </div>
      </div>
    </div>
  ))}

  {/* Buttons and Dots */}
  {/* ...same as before */}
</div>
  );
} 