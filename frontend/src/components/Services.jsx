import React from "react";

export default function Services({ data }) {
  return (
    <section className="w-full font-body py-14 md:py-16 px-4  max-w-[1440px] mx-auto border-b border-[#e5e5e5]">
      
      {/* Desktop Grid / Mobile Scroll */}
      <div className="flex lg:grid lg:grid-cols-4 gap-20 overflow-x-auto lg:overflow-visible scroll-smooth scrollbar-hide">
        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group flex-shrink-0 lg:flex-shrink-1 min-w-[260px] sm:min-w-[280px] lg:min-w-0 flex flex-col items-center text-center  py-8 transition duration-300"
              style={{
                height: 'clamp(220px, 20vw, 320px)' // smooth step height
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16  text-gray-800 flex items-center justify-center  transition duration-300">
                <Icon
                  size={50}
                  className="hover:text-[#c19417] transition duration-300"
                />
              </div>

              {/* Heading */}
              <h3 className=" text-lg  text-[#111111] ">
                {item.heading}
              </h3>

              {/* Description */}
              <p className="text-[#666666] text-[px] leading-7 max-w-[250px]">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}