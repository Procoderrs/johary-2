import React, { useRef, useState, useEffect } from "react";

export default function Signed({ data }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const profiles = data.name.map((item, index) => ({
    name: item,
    designation: data.designation[index],
    description: data.description,
    icon: data.icon,
  }));

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const slideWidth = scrollRef.current.offsetWidth;
    const currentIndex = Math.round(scrollLeft / slideWidth);
    setActiveIndex(currentIndex);
  };

  const scrollToSlide = (index) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      left: index * scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full bg-[#f5f3ed] font-body">
      {/* Testimonial Area */}
      <div className="py-12 px-4 border-b border-[#e5e5e5]">
        <div className="max-w-5xl mx-auto">
          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {profiles.map((profile, index) => {
              const Icon = profile.icon;

              return (
                <div
                  key={index}
                  className="min-w-full snap-center flex flex-col items-center text-center px-4 md:px-12"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <Icon size={52} className="text-[#c19417]" />
                  </div>

                  {/* Description */}
                  <p className="text-[15px] md:text-[15px] lg:text-[20px] tracking-[0.3px] leading-6 lg:leading-[35px] text-[#111111] max-w-[450px] md:max-w-[570px] lg:max-w-3xl mb-6">
                    {profile.description}
                  </p>

                  {/* Name */}
                  <h3 className="text-[14px] md:text-[20px] font-semibold tracking-[0.3px] text-[#111111] ">
                    {profile.name}
                  </h3>

                  {/* Designation */}
                  <p className="text-[15px] tracking-[0.3px] text-[#111111]">
                    {profile.designation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {profiles.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#c19417] scale-110"
                    : "bg-[#111111] hover:bg-[#c19417]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Logos Area - Horizontal Scroll */}
      <div className="py-16   lg:px-6">
        <div className=" mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-10 md:gap-14 w-max min-w-full">
            {data.logos?.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[120px] md:min-w-[50px] opacity-80 hover:opacity-100 transition duration-300"
              >
                <img
                  src={logo}
                  alt={`brand-logo-${index + 1}`}
                  className="max-h-[20px] md:max-h-[50px] object-contain transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}