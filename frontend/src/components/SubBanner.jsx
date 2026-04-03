import React from "react";
import { Link } from "react-router-dom";
function SubBanner({ data }) {
  return (
    <section className="w-full py-16 px-3 md:px-4 lg:px-8 font-body">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden  group h-[150px] md:h-[220px] cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={item.img}
              alt={item.heading}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Overlay Text */}
            <div className="absolute top-[10%] flex max-w-[150px] md:max-w-[180px]  items-center px-3 z-10">
              <div className=" ">
                <p className="text-[12px] md:text-[14px] w-fit px-2 font-medium text-[#ffffff] tracking-[2px] uppercase bg-[#c19417] mb-2 ">
                  {item.off}
                </p>

                <h3 className="text-[17px] md:text-[20px] leading-[20px] font-medium text-black">
                  {item.heading}
                </h3>

                <div className=" mt-2 ">
                  <Link 
                    to={item.link}
                    className="inline-block text-sm mb-5 md:text-[15px] font-semibold underline pb-1 hover:text-[#c19417] hover:border-[#c19417] transition"
                  >
                    {item.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubBanner;