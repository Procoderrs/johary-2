import React from 'react'
import { useLocation } from "react-router-dom";
import {
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiTimeLine,
} from "@remixicon/react";

export default function About() {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("contact-us")) return "contact-us";
    return "page";
  };

  return (
    <div>
      <div className="font-body mb-20">

        {/* ================= BREADCRUMB ================= */}
        <div className="relative w-full min-h-[160px] overflow-hidden">
          <img
            src="/breadcumb-bkg.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[15px]">
              Home / {getTitle()}
            </p>
            <h1 className="text-[28px] font-semibold uppercase">
              {getTitle()}
            </h1>
          </div>
        </div>

        {/* ================= MAIN CONTAINER ================= */}
        <div className="max-w-[1440px] mx-auto px-4">

          {/* ================= MAP + FORM ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-5 mt-16">

            {/* MAP */}
            <div className="lg:col-span-3 w-full h-[300px] md:h-[520px]">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=San%20Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

            {/* FORM */}
            <div className="lg:col-span-2 bg-[#f1efea] p-6 md:p-10 flex flex-col justify-center">

              <p className="text-[#666] text-[15px] mb-2">Get in touch</p>

              <h2 className="text-[28px] md:text-[32px] font-medium mb-6">
                Contact us
              </h2>

              <form className="space-y-4">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-[#ddd] outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-[#ddd] outline-none"
                />

                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-3 border border-[#ddd] outline-none"
                ></textarea>

                <button
                  type="submit"
                  className="bg-[#c19417] uppercase font-medium text-white px-6 py-3 hover:bg-black transition"
                >
                  Submit
                </button>

              </form>
            </div>
          </div>

          {/* ================= INFO BOXES ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-20">

            {/* BOX 1 */}
            <div className="bg-[#f5f3ed] px-6 py-9 flex gap-4 items-start">
              <div className="border border-[#c19417] rounded-full p-3">
                <RiMapPinLine className="text-[#c19417]" size={22} />
              </div>
              <div>
               {/*  <h4 className="mb-2 text-[#666] ">Location</h4> */}
                <p className="text-sm text-[#666]">
                  60 29th San Francisco,<br />
                  507 - Union Trade Center
                </p>
              </div>
            </div>

            {/* BOX 2 */}
            <div className="bg-[#f1efea] px-6 py-9 flex gap-4 items-start">
              <div className="border border-[#c19417] rounded-full p-3">
                <RiPhoneLine className="text-[#c19417]" size={22} />
              </div>
              <div>
                <h4 className=" mb-2 text-[#666]">Call us</h4>
                <p className="text-sm text-[#666]">
                  (+01) 987-654-3210
                </p>
              </div>
            </div>

            {/* BOX 3 */}
            <div className="bg-[#f5f3ed] px-6 py-9 flex gap-4 items-start">
              <div className="border border-[#c19417] rounded-full p-3">
                <RiMailLine className="text-[#c19417]" size={22} />
              </div>
              <div>
                <h4 className=" mb-2 text-[#666]">Mail us</h4>
                <p className="text-sm text-[#666]">
                  demo@example.com
                </p>
              </div>
            </div>

            {/* BOX 4 */}
            <div className="bg-[#f1efea] px-6 py-9 flex gap-4 items-start">
              <div className="border border-[#c19417] rounded-full p-3">
                <RiTimeLine className="text-[#c19417]" size={22} />
              </div>
              <div>
                <h4 className="mb-2 text-[#666]">Open time</h4>
                <p className="text-sm text-[#666]">
                  10:00AM – 6:00PM
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}