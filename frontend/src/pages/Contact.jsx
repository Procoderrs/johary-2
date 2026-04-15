import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  RiTaskLine,
  RiChat3Line,
  RiUser3Line,
} from "@remixicon/react";

export default function Contact() {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("contact-us")) return "contact-us";
    return "page";
  };

  // ================= TABS =================
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Our Mission",
      content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
    },
    {
      title: "Our Vision",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    },
    {
      title: "Our Values",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

  // ================= ACCORDION =================
  const [openIndex, setOpenIndex] = useState(null);

  const accordions = [
    {
      title: "Business's vision",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      title: "Our mission",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      title: "Our support",
      content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
    },
  ];

  // ================= CARDS =================
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
          <p className="text-sm text-gray-600 uppercase">
            Home / {getTitle()}
          </p>
          <h1 className="text-[28px] font-semibold uppercase">
            {getTitle()}
          </h1>
        </div>
      </div>

      {/* ================= SECTION 1: TABS ================= */}
      <div className=" mx-auto px-4 py-16">

        {/* Tabs */}
        <div className="flex md:flex-row flex-col border-b md:items-center w-full md:justify-center border-[#666] ">
          {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 border text-left md:text-center border-[#666] ${
                    activeTab === i
                      ? "border-[#666]   md:font-bold text-[#c19417] cursor-pointer md:border-b-white"
                      : "md:border-transparent text-[#666] border- md:font-bold"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
        </div>

        {/* Content */}
        <div className="text-[#666] border-[#666]  p-6  border-x border-b text-[15px]">
          {tabs[activeTab].content}
        </div>
      </div>

      {/* ================= SECTION 2: IMAGES ================= */}
      <div className=" mx-auto px-4 py-16 grid grid-cols-1 items-stretch md:grid-cols-2 gap-6">

        {/* LEFT IMAGE */}
        <img src="/about-banner-01.jpg" className="w-full h-full object-cover" alt="" />

        {/* RIGHT GRID */}
        <div className="grid grid-rows-2 gap-6">

          {/* TOP */}
          <img src="/about-banner-02.jpg" className="w-full h-full object-cover" alt="" />

          {/* BOTTOM 2 IMAGES */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <img src="/about-banner-03.jpg" className="w-full object-cover" alt="" />
            <img src="/about-banner-04.jpg" className="w-full object-cover" alt="" />
          </div>

        </div>
      </div>

      {/* ================= SECTION 3: ACCORDION ================= */}
      <div className="bg-[#f1efea] mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT ACCORDION */}
        <div className="space-y-4">

          <div className="mb-9 ">
            <h2 className=" max-w-[400px] md:text-[32px] text-[28px] leading-8 lg:leading-[44px] font-medium mb-6">Inspiration, innovation and opportunities</h2>
            <p className="text-[#666] max-w-[550px] text-[15px]">Many Desktop Publishing Packages And Web Page Editors Now Use Lorem Ipsum As Their Default Model Text.</p>
          </div>
          {accordions.map((item, i) => (
            <div key={i} className="">

              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                className="w-full text-left px-5 text-lg py-4  bg-white font-medium flex justify-between"
              >
                {item.title}
                <span>{openIndex === i ? "-" : "+"}</span>
              </button>

              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 py-4" : "max-h-0"
                }`}
              >
                <p className="text-[#666] text-sm">
                  {item.content}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT IMAGE */}
        <img src="/about-banner-05.png" className="w-full object-cover" alt="" />

      </div>

      {/* ================= SECTION 4: CARDS ================= */}
      <div className="py-20 mx-auto px-4 ">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {cards.map((item, index) => {
            const IconComp = item.icon;

            return (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg flex flex-col items-center text-center py-8 hover:shadow-2xl transition"
              >

                <div className="w-[80px] h-[80px] flex items-center justify-center mb-5">
                  <IconComp size={50} className="text-[#c19417]" />
                </div>

                <h3 className="text-2xl font-medium mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 max-w-[390px] px-4">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}