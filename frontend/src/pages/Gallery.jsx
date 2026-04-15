import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { blogsData } from "../data/blogs";

export default function Gallery() {

  const location = useLocation();

  const [selectedImg, setSelectedImg] = useState(null);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("gallery")) return "gallery";
    return "page";
  };

  const images = blogsData.map(item => item.image);

  return (
    <div className="font-body">

      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold uppercase">{getTitle()}</h1>
          <p className="text-sm text-gray-600 uppercase">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto md:py-16 py-5 mb-12 border-b border-[#d5d8dc]">

        {/* ================= SECTION 1 ================= */}
        <div className="text-center mb-4">
          <h2 className="text-[#666]">Magnific pop-ups</h2>
          <p className=" md:text-[32px] text-[28px] font-medium">Image pop-up view</p>
        </div>

        {/* 3 IMAGES */}
        <div className="grid grid-cols-1  md:grid-cols-3 px-4 2xl:px-12 2xl:gap-6 gap-4">
          {images.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setSelectedImg(img)}
              className="w-full cursor-pointer object-cover"
            />
          ))}
        </div>

        {/* ================= SECTION 2 ================= */}
        <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-3">
          {images.slice(0, 6).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setSelectedImg(img)}
              className="w-full cursor-pointer object-cover"
            />
          ))}
        </div>

        {/* ================= SECTION 3 ================= */}
        <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4 2xl:px-16 overflow-hidden">

          {/* LEFT CONTENT */}
          <div className='md:col-span-1'>
            <p className="text-[#666] text-[15px] mb-1">Gallery</p>
            <h2 className="md:text-[32px] text-[28px] font-medium mb-5">Gallery Grid Style</h2>
            <p className="text-[#666] mb-8 text-[15px] max-w-[300px] tracking-[0.2px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <button className="md:px-8 px-4 py-3 bg-[#c19417] hover:bg-black font-semibold uppercase text-white text-[15px]">View more</button>
          </div>

          {/* RIGHT IMAGES 2x2 */}
          <div className="grid md:col-span-2 md:grid-cols-2 grid-cols-1 gap-8">
            {images.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setSelectedImg(img)}
                className="w-full cursor-pointer object-cover"
              />
            ))}
          </div>

        </div>

        {/* ================= SECTION 4 ================= */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4">
          {images.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setSelectedImg(img)}
              className="w-full cursor-pointer object-cover"
            />
          ))}
        </div>

      </div>

      {/* ================= MODAL ================= */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img src={selectedImg} className="max-w-[90%] max-h-[90%]" alt="" />
        </div>
      )}

    </div>
  );
}