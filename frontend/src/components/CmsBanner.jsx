import React from "react";

export default function CmsBanner({ data }) {
  const banners = [
    {
      img: data.img_1,
      discount: data.discount_1 || "20% SALE EVENT THIS WEEKEND",
      heading: data.heading_1 || "Best Charms Embracing The Essence Of Classic Style",
    },
    {
      img: data.img_2,
      discount: data.discount_2 || "30% SALE EVENT THIS WEEKEND",
      heading: data.heading_2 || "Radiant Adornments Adding Glamour To Your Ensemble",
    },
  ];

  return (
    <section className="w-full font-body py-16 px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {banners.map((item, index) => (
          <div key={index} className="group">
            {/* Image */}
            <div
              className="overflow-hidden w-full"
              style={{ height: 'clamp(280px, 22vw, 400px)' }} // smooth responsive height
            >
              <img
                src={item.img}
                alt={item.heading}
                className="w-full h-full object-top object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <div className="pt-6 px-2 md:px-0">
              <p className="text-[11px] sm:text-[12px] md:text-[13px] text-center md:text-center lg:text-left font-medium uppercase tracking-[0.3px] text-[#111111]">
                {item.discount}
              </p>

              <h2 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[32px] leading-5 md:leading-7 lg:leading-9 text-center md:text-center lg:text-left mt-3 font-medium text-[#111111]">
                {item.heading}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}