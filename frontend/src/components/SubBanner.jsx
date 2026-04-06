import React from "react";
import { Link } from "react-router-dom";

function SubBanner({ data }) {
  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto font-body">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden group h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] xl:h-[280px] cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={item.img}
              alt={item.heading}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Overlay Text */}
            <div className="absolute top-[10%] left-4 sm:left-6 md:left-8 lg:left-10 flex flex-col max-w-[150px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] z-10">
              <p className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-white tracking-[2px] uppercase bg-[#c19417] px-2 mb-2 w-fit">
                {item.off}
              </p>

              <h3 className="text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium leading-tight text-black">
                {item.heading}
              </h3>

              <div className="mt-2">
                <Link
                  to={item.link}
                  className="inline-block text-sm sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold underline pb-1 hover:text-[#c19417] hover:border-[#c19417] transition"
                >
                  {item.label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubBanner;