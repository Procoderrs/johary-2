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
    <section className="w-full px-4 md:px-10 lg:px-8 py-16 font-body">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {banners.map((item, index) => (
          <div key={index} className="group">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src={item.img}
                alt={item.heading}
                className="w-full h-[280px] md:h-[320px] lg:h-[360px] object-top object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <div className="pt-6 ">
              <p className="text-sm md:text-[13px] font-medium uppercase tracking-[3px] text-[#111111] ">
                {item.discount}
              </p>

              <h2 className="text-[24px] md:text-[28px] leading-9 lg:text-[32px] font-medium text-[#111111]  max-w-[90%] ">
                {item.heading}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}