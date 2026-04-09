import React, { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function Hero({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div
      className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] 2xl:h-[70vh] 3xl:h-[45vh] font-body overflow-hidden"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
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
          <div className="absolute top-0 left-0 h-full flex items-center px-4 sm:px-6 md:px-10 lg:pl-[10%] xl:pl-[17%] 2xl:pl-[25%]">
            <div className="max-w-[150px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[240px]">
              <h1
                className={`text-[14px] sm:text-lg md:text-[28px] md:leading-9 text-white mb-5 transform transition-all duration-700 ${
                  index === currentIndex
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-0"
                }`}
              >
                {item.heading}
              </h1>

              <p
                className={`text-[9px] tracking-[1px] sm:tracking-[1.3505px] leading-snug text-white transition-opacity duration-700 delay-300 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.description}
              </p>

              {/* CTA Button */}
              {item.label && item.link && (
                <a
                  href={item.link}
                  className={`inline-block mt-4 md:mt-8 px-4 py-2 md:px-5 md:py-2 bg-white text-[10px] font-medium transition-all duration-700 delay-500 ${
                    index === currentIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  {item.label}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Dots Navigation - show before md */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 md:hidden">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className={`hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white shadow-lg items-center justify-center transition-all duration-500 ${
          showButtons
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <RiArrowRightSLine size={26} />
      </button>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className={`hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white shadow-lg items-center justify-center transition-all duration-500 ${
          showButtons
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        <RiArrowLeftSLine size={26} />
      </button>
    </div>
  );
}