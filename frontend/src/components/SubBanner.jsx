import React from "react";
import { Link } from "react-router-dom";

function SubBanner({ data }) {
  return (
    <section className="w-full pt-24 px-4  max-w-[1440px] mx-auto font-body">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden w-auto group h-[150px] sm:h-[180px] md:h-[150px] lg:h-[200px] xl:h-[235px] cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={item.img}
              alt={item.heading}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Overlay Text */}
            <div className="absolute top-[7%] left-4 sm:left-6  flex flex-col max-w-[150px] sm:max-w-[160px] md:max-w-[140px] lg:max-w-[150px] z-10">
              <p className="text-[12px]  font-medium text-white  uppercase bg-[#c19417] px-1 mb-2 lg:mb-5 w-fit">
                {item.off}
              </p>

              <h3 className="text-[17px] mb-12 md:mb-4 sm:text-[18px] md:text-[18px] font-medium leading-tight lg:leading-[25px] text-black">
                {item.heading}
              </h3>

              <div className="">
                <Link
                  to={item.link}
                  className="inline-block text-sm sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold underline hover:no-underline pb-1  transition"
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