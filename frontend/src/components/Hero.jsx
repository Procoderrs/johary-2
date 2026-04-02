import React, { useState, useEffect } from "react";

export default function Hero({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="relative w-full h-[80vh] font-body overflow-hidden">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Full screen Image */}
          <img
            src={item.img}
            alt={item.heading}
            className="w-full h-full object-cover"
          />

          {/* Text overlay */}
          <div className="absolute top-0 left-0 h-full flex items-center px-6 md:px-16">
            <div className="max-w-md">
              <h1
  className={`text-[44px] leading-tight font-medium text-white mb-2 transform transition-all duration-700 ${
    index === currentIndex
      ? "scale-100 opacity-100"
      : "scale-90 opacity-0"
  }`}
>
  {item.heading}
</h1>
<p
  className={`text-[12px] tracking-[1.3505px] leading-snug text-white transition-opacity duration-700 delay-300 ${
    index === currentIndex ? "opacity-100" : "opacity-0"
  }`}
>
  {item.description}
</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5  top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-5 rounded-full hover:bg-opacity-70 transition z-20"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition z-20"
      >
        ›
      </button>
    </div>
  );
}