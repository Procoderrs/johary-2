import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { RiCheckLine, RiCloseLine } from "@remixicon/react";
import { blogsData } from "../data/blogs"; // adjust path if needed

export default function Portfolio() {
  const location = useLocation();
  const [selectedImg, setSelectedImg] = useState(null);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("portfolio")) return "Portfolio";
    return "Page";
  };

  const images = blogsData.slice(0, 6); // take 6 images

  return (
    <div className="font-body">

      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold">{getTitle()}</h1>
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="py-20 max-w-[1440px] mx-auto px-4 space-y-16">

        {/* YOUR EXISTING SECTION (UNCHANGED STYLE) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">

          {/* LEFT */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">

            <p className="text-sm text-[#666]">Our work</p>

            <h2 className="text-2xl md:text-3xl font-medium">
              Manage Everything in Your Hand
            </h2>

            <p className="text-[#666] text-[15px] leading-[25px] lg:max-w-[520px]">
             There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form have suffered alteration in some form. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {[
                "Campaigns Per Day",
                "Digital Marketing",
                "Marketing Agency",
                "Style Templates",
                "24*7 Hour Support",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <RiCheckLine
                    size={20}
                    className="bg-[#c19417] text-white hover:bg-black rounded-full p-1 shrink-0"
                  />
                  <span className="text-[#666]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/portfolio-banner.png"
              className="w-full w-[500px] lg:max-w-[650px]"
              alt=""
            />
          </div>
        </div>

        {/* ================= IMAGE GRID (NEW) ================= */}
        <div className="text-center">
          <p className="text-[#666]">Our Look-out</p>
          <h3 className="text-3xl text-[#111] font-medium mb-8">
            Best of our work
          </h3>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {images.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImg(item.image)}
                className="cursor-pointer overflow-hidden  shadow-md hover:shadow-xl transition group"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-[240px] object-cover  transition duration-300"
                />
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX / MODAL ================= */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <RiCloseLine size={30} />
            </button>

            <img
              src={selectedImg}
              className="w-full max-h-[85vh] object-contain rounded-lg"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}