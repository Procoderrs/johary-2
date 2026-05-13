import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Tabs() {

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("tabs")) return "tabs";
    return "Page";
  };

  const tabData = [
    { title: "Our history", 
    content: "Donec finibus velit sit amet arcu suscipit convallis. Fusce vel urna sit amet nisi tempor iaculis ac vitae eros. Duis feugiat at aliquam felis porttitor sed non. Integer nunc nec sed a ante facilisis mattis proin lorem lectus metus et.",
    content_2:"Mauris eleifend vitae augue et suscipit. Nunc vel feugiat sem, eu gravida nunc. Donec maximus nibh augue, lupus a rhoncus odio aliquam ac. Fusce accumsan dapibus lacus ac pulvinar. Aenean pellentesque nisl id dui lupus." },

    { title: "Description", 
      content: "Tempor duis accumsan efficitur orci, id interdum ipsum. Morbi a ligula urna et dapibus amet sit porta quis, lacinia quis enim. Risus vestibulum dolor mi, commodo eget sit aliquam sed ullamcorper eget quam nullam porta sit non.",
      content_2:"Proin magna sapien varius eu tempor et, commodo eget risus lupus sed magna vel nunc vel bibendum. Fusce a ipsum a sed purus tempus porta quis ut lacus tellus et maecenas rhoncus, diam at accumsan dui lupus dolor." },

    { title: "Reviews", 
    content: "Lupus nam auctor facilisis urna ut blandit mauris quis nisl leo proin in orci, quis fringilla nulla. In tellus non ipsum sed metus rhoncus laoreet. Praesent sit quam. Praesent eget quam non mauris magna. In vel tempus ipsum sit.",
    content_2:"Duis accumsan efficitur orci, id interdum ipsum. Morbi ligula urna, dapibus sit amet porta quis, lacinia quis enim. Quis risus vitae ante dolor mi, non ante eget aliquam a, ullamcorper eget quam at nullam metus tempor ligula."
     },
  ];

  return (
    <div className="font-user pb-12">

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

      <div className="max-w-[1440px] mx-auto py-16  space-y-20">

        {/* ================= 1: IMAGE RIGHT | HORIZONTAL TABS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4">

{/* RIGHT IMAGE */}
          <img src="/tab-banner-01.png" className="w-full" alt="" />



          {/* LEFT CONTENT */}
          <div>


            <div className="mb-9">
              <p className="text-[#666] text-[15px] mb-3">Fully adaptable</p>
            <h2 className="md:text-[32px] text-[28px] font-medium">With horizontal style</h2>

            </div>

            {/* TABS */}
            <div className="flex md:flex-row  flex-col border-b border-[#d5d8dc]">
              {tabData.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 border text-left md:text-center border-[#d5d8dc] ${
                    activeTab === i
                      ? "border-[#d5d8dc]   md:font-bold text-[#c19417] cursor-pointer md:border-b-white"
                      : "md:border-transparent border- md:font-bold"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            <div className="border-b border-r border-l text-[#666] text-[15px] border-[#d5d8dc] p-6">
              <p className=" mb-6">{tabData[activeTab].content}</p>
              <p className=" ">{tabData[activeTab].content_2}</p>

            </div>

          </div>

          

        </div>


        {/* ================= 2: REVERSE ================= */}
        <div className=" bg-[#f1efea] py-10">

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4">
           

          {/* CONTENT */}
          <div>
         <div className="mb-9">
              <p className="text-[#666] text-[15px] mb-3">Multiple options</p>
            <h2 className="md:text-[32px] text-[28px] font-medium">Tab with background</h2>

            </div>
            <div className="flex md:flex-row  flex-col">
              {tabData.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3  text-left md:text-center border-[#d5d8dc] ${
                    activeTab === i
                      ? "  md:font-bold text-[#c19417] cursor-pointer bg-white md:border-b-white"
                      : "md:border-transparent border- md:font-bold bg-white md:bg-transparent"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

           <div className=" text-[15px] bg-white text-[#666]  p-6">
              <p className=" mb-6">{tabData[activeTab].content}</p>
              <p className=" ">{tabData[activeTab].content_2}</p>

            </div>

          </div>
{/* IMAGE */}
          <img src="/tab-banner-02.png" className="w-full" alt="" />
         </div>
        </div>


        {/* ================= 3: VERTICAL TABS ================= */}
        <div className="px-4">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">


          {/* IMAGE */}
          <img src="/tab-banner-01.png" className="w-full" alt="" />

          {/* CONTENT */}
         {/* CONTENT */}
<div className="flex flex-col w-full">

  {/* HEADING (ADD THIS) */}
  <div className="mb-9">
    <p className="text-[#666] text-[15px] mb-3">Fully adaptable</p>
    <h2 className="md:text-[32px] text-[28px] font-medium">With vertical style</h2>
  </div>

  <div className="flex flex-col md:flex-row ">
    
    {/* TABS */}
    <div className="flex flex-col ">
      {tabData.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(i)}
          className={`hover:cursor-pointer px-4 py-3 border text-left md:text-center ${
            activeTab === i
              ? "border-[#d5d8dc] md:font-semibold border text-[#c19417] md:border-r-white"
              : "md:font-semibold md:border-transparent border border-[#d5d8dc]"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>

    {/* CONTENT */}
    <div className="border text-[15px] border-[#d5d8dc] text-[#666] p-6">
      <p className="mb-6">{tabData[activeTab].content}</p>
      <p>{tabData[activeTab].content_2}</p>
    </div>

  </div>
</div>
</div>
        </div>


        {/* ================= 4: VERTICAL REVERSE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4">

          {/* CONTENT */}
         {/* CONTENT */}
<div className="flex flex-col w-full">

  {/* HEADING (ADD THIS) */}
  <div className="mb-9">
    <p className="text-[#666] text-[15px] mb-3">Multiple options</p>
    <h2 className="md:text-[32px] text-[28px] font-medium">Tab with background</h2>
  </div>

  <div className="flex flex-col md:flex-row">

    <div className="flex flex-col  bg-[#f1efea] md:bg-transparent">
      {tabData.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(i)}
          className={`hover:cursor-pointer text-left md:text-center  px-4 py-3 ${
            activeTab === i
              ? "bg-[#f1efea] md:font-semibold text-[#c19417]"
              : "md:font-semibold"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>

    <div className="text-[15px] text-[#666] bg-[#f1efea] p-6">
      <p className="mb-6">{tabData[activeTab].content}</p>
      <p>{tabData[activeTab].content_2}</p>
    </div>

  </div>
</div>

          {/* IMAGE */}
          <img src="/tab-banner-02.png" className="w-full" alt="" />

        </div>

      </div>
    </div>
  );
}