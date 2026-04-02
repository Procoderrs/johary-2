import React from "react";

export default function Services({ data }) {
  return (
    <section className="w-full py-14 md:py-16 px-4 md:px-10 lg:px-16 font-body">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group flex flex-col items-center text-center px-6 py-8    transition duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-[#f8f8f8] flex items-center justify-center mb-5 transition duration-300">
                <Icon
                  size={50}
                  className=" hover:text-[#c19417] transition duration-300"
                />
              </div>

              {/* Heading */}
              <h3 className="text-[18px] font-medium text-[#111111] mb-3">
                {item.heading}
              </h3>

              {/* Description */}
              <p className="text-[#666666] text-[15px] leading-7 max-w-[250px]">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}