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
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] font-body overflow-hidden">
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

          <div className="absolute top-0 left-0 h-full flex items-center px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="max-w-[130px] sm:max-w-[270px] md:max-w-[320px]">
              <h1
                className={`text-[14px] sm:text-[28px] md:text-[39px] md:leading-11  text-white mb-2 transform transition-all duration-700 ${
                  index === currentIndex
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-0"
                }`}
              >
                {item.heading}
              </h1>

              <p
                className={`text-[9px]  tracking-[1px] sm:tracking-[1.3505px] leading-snug text-white transition-opacity duration-700 delay-300 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.description}
              </p>

              {/* CTA Button */}
              {item.label && item.link && (
                <a
                  href={item.link}
                  className={`inline-block mt-4 md:mt-6 px-4 py-2 md:px-6 md:py-3 bg-white  text-[10px] sm:text-[12px] md:text-[14px] font-medium   transition-all duration-700 delay-500 ${
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
        className={`hidden md:flex absolute right-0 md:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-6 md:h-6 rounded-full bg-white  shadow-lg items-center justify-center transition-all duration-300 ${
          showButtons
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-3"
        }`}
      >
        <RiArrowRightSLine size={26} />
      </button>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className={`hidden md:flex absolute left-0 md:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-6 md:h-6 rounded-full  bg-white shadow-lg items-center justify-center transition-all duration-300 ${
          showButtons
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible -translate-x-3"
        }`}
      >
        <RiArrowLeftSLine size={26} />
      </button>
    </div>
  );
}