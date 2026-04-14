import React from 'react'
import { useLocation } from "react-router-dom";
import {  RiTaskLine,RiChat3Line ,RiFlagLine,RiUser3Line, RiMoonLine, } from "@remixicon/react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Faqs() {

  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("faqs")) return "FAQs";
    return "Page";
  }

  const [activeIndex, setActiveIndex] = useState(null);
const cards = [
  {
    icon: RiTaskLine,
    title: "Submit a task",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: RiChat3Line,
    title: "Send message",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: RiUser3Line,
    title: "Trusted experience",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
];

const faqs = [
  {
    title: "Global search engine optimization",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    content_2:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
  {
    title: "Complete Social Media Integration",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    content_2:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  },
  {
    title: "End-to-end encryption for messages",
   content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
   content_2:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  },
];
  return (
    <div className="font-body">

      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold">{getTitle()}</h1>
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="py-16 md:py-20 max-w-[1440px] mx-auto px-4">

        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">

  {/* LEFT */}
  <div className="flex-1 flex flex-col gap-5">

    <p className="text-lg text-[#666]">FAQs</p>

    <h2 className="text-2xl md:text-3xl font-medium">
      Frequently Asked Question
    </h2>

    <p className="text-[#666] text-[15px] leading-[24px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
    </p>

    <img
      src="/faq-banner.jpg"
      alt=""
      className="w-full object-cover"
    />
  </div>

  {/* RIGHT */}
  <div className="flex-1 flex flex-col gap-6">

    {[
      "How can you help?",
      "What is a return policy?",
      "What payment methods do you accept?",
      "Do you sell gift cards?",
    ].map((title, index) => (
      <div key={index} className="space-y-2 pb-4">

        <h3 className="text-xl font-medium">
          {title}
        </h3>

        <p className="text-[#666] text-[14px] leading-[24px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>

      </div>
    ))}

  </div>
</div>


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
              <p className="text-[13px] md:text-[15px] text-gray-600 leading-[22px] md:leading-[26px] mb-6 px-1 md:px-2">
                {item.desc}
              </p>

              {/* LINK */}
              

            </div>
          );
        })}

      </div>

      <div className="mt-20 max-w-[900px] mx-auto">

  {/* TOP HEADING */}
  <div className="text-center mb-10">
    <p className="text-sm mb-3 text-[#666]">Pick one of 3 FAQ styles</p>
    <h2 className="text-2xl md:text-3xl font-medium">
      Display FAQ accordions
    </h2>
  </div>

  {/* ACCORDION */}
  <div className="flex flex-col gap-1 ">

    {faqs.map((item, index) => {
      const isOpen = activeIndex === index;

      return (
        <div
          key={index}
          className=" overflow-hidden border border-b border-[#d5d8dc] "
        >

          {/* HEADER */}
          <div
            onClick={() =>
              setActiveIndex(isOpen ? null : index)
            }
            className="flex items-center  justify-between px-5 py-4 cursor-pointer bg-white hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-medium">
              {item.title}
            </h3>

            {/* PLUS / MINUS */}
            <span className="text-3xl font-bold">
              {isOpen ? "-" : "+"}
            </span>
          </div>

          {/* CONTENT */}
          <div
            className={`
              transition-all duration-500 ease-in-out overflow-hidden
              ${isOpen ? "max-h-[200px] opacity-100 py-4 px-5  " : "max-h-0 opacity-0"}
              
              ${index === 2 ? "origin-bottom" : "origin-top"}
            `}
          >
            <p className="text-[15px] mb-2 text-[#666] leading-[24px]">
              {item.content}
            </p>
            <p className="text-[15px] mb-2 text-[#666] leading-[24px]">
              {item.content_2}
            </p>
          </div>

        </div>
      );
    })}

  </div>
</div>

      </div>
    </div>
  )
}


/* border-b border-[#d5d8dc] */