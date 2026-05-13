import React from "react";
import { useLocation , Link } from "react-router-dom";
import {  RiFolderLine,RiNotification3Line ,RiFlagLine,RiChat2Line, RiMoonLine, } from "@remixicon/react";

export default function Icon() {
  const location = useLocation();

const data=[
  {icon: RiFolderLine, heading:'Global SEO research',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean diam dolor, accum.'},
  {icon: RiNotification3Line, heading:'Social media integration',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean diam dolor, accum.'},
  {icon: RiFlagLine , heading:'Launching the application',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean diam dolor, accum.'},


]


const cards = [
  {
    icon: RiChat2Line,
    title: "Targeted accounts",
    desc: "Nullam eu neque cras ut erat nunc ac dui vel mi sed morbi eu elit.",
  },
  {
    icon: RiMoonLine,
    title: "Future customers",
    desc: "Nullam eu neque cras ut erat nunc ac dui vel mi sed morbi eu elit.",
  },
  {
    icon: RiFlagLine,
    title: "Personal connections",
    desc: "Nullam eu neque cras ut erat nunc ac dui vel mi sed morbi eu elit.",
  },
];


  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("icon")) return "Icon";

    return "Page"; // fallback (important)
  };



  return (
  <div className="font-user">

    {/* ================= BREADCRUMB ================= */}
    <div className="relative w-full min-h-[160px] overflow-hidden">
      <img
        src="/breadcumb-bkg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-[24px] md:text-[28px] font-semibold">
          {getTitle()}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Home / {getTitle()}
        </p>
      </div>
    </div>

    {/* ================= MAIN SECTION ================= */}
    <div className="py-8 md:py-12 lg:py-16 max-w-[1440px] border-b border-gray-200 mx-auto px-4">

      <div className="flex flex-col md:flex-row gap-10 lg:gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="w-full lg:w-[50%]">
          <img
            src="/Icon-box-banner.png"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-6 w-full text-center lg:w-[50%]">

          <p className="text-[13px] md:text-[14px] text-[#666]">
            Multiple icons
          </p>

          <h2 className="text-2xl md:text-3xl font-medium">
            Icons boxes
          </h2>

          {/* ICON LIST */}
          <div className="flex flex-col gap-8 md:gap-12 mt-4">

            {data.map((item, index) => {
              const IconComp = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center"
                >

                  {/* ICON */}
                  <div className="w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center justify-center bg-[#c19417] rounded-full transition-colors duration-300 hover:bg-black shrink-0">

                    <IconComp size={30} className="text-white" />

                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-[16px] md:text-[20px] font-medium">
                      {item.heading}
                    </h3>

                    <p className="text-[13px] md:text-[15px] text-gray-600 mt-1 leading-[22px] md:leading-[24px] max-w-[460px]">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* ================= CARDS SECTION ================= */}
      <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">

        {cards.map((item, index) => {
          const IconComp = item.icon;

          return (
            <div
              key={index}
              className="bg-white shadow-xl  lg:px-6 py-2 lg:py-8   md:py-4 rounded-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >

              {/* ICON */}
              <div className="w-[70px] h-[70px] md:w-[85px] md:h-[85px] flex items-center justify-center rounded-full mb-5 transition-colors duration-300">

                <IconComp
                  size={50}
                  className="text-[#c19417] hover:text-black transition-colors"
                />

              </div>

              {/* TITLE */}
              <h3 className=" text-lg lg:text-2xl font-medium mb-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[13px] md:text-[14px] text-gray-600 leading-[22px] md:leading-[26px] mb-6 px-1 md:px-2">
                {item.desc}
              </p>

              {/* LINK */}
              <Link
                to="#"
                className="text-[13px] font-medium underline text-black hover:text-[#c19417] transition-colors"
              >
                VIEW MORE
              </Link>

            </div>
          );
        })}

      </div>

    </div>
  </div>
);
}