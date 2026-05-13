import React, { useState } from "react";
import { useLocation } from "react-router-dom";


export default function Accordion() {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("accordion")) return "Accordion";
    if (path.includes("tabs")) return "Tabs";
    if (path.includes("faqs")) return "FAQs";
    if (path.includes("gallery")) return "Gallery";
    if (path.includes("blog")) return "Blog";
    if (path.includes("portfolio")) return "Portfolio";
    if (path.includes("about")) return "About Us";
    if (path.includes("contact")) return "Contact Us";

    return "Page";
  };


  const section1Data = [
  {
    title: "Accordion 01",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Accordion 02",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "Accordion 03",
    content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
  },
];

const section2Data = [
  {
    title: "Accordion 01",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Many desktop publishing packages and web page editors now use Lorem Ipsum.",
  },
  {
    title: "Accordion 02",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "Accordion 03",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
];

const section3Data = [
  {
    title: "Accordion 01",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    title: "Accordion 02",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "Accordion 03",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
];
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold">
            {getTitle()}
          </h1>
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      <div className="py-20  space-y-24 max-w-[1440px] mx-auto">

        {/* ================= SECTION 1 ================= */}
        <div className="flex md:flex-row flex-col gap-12 items-start px-4">

          {/* IMAGE */}
          <div className=" md:w-[35%] w-full ">
            <img src="/accordion-banner-01.jpg" className="w-full h-[420px] object-cover" />
          </div>

          {/* CONTENT */}
          <div className="md:w-[65%] w-full">
            <p className="text-sm text-[#666] mb-2">Pick your style</p>
            <h2 className="md:text-4xl text-2xl font-medium mb-6">Boxes and borders</h2>

            {/* ACCORDION */}
            <div className="border border-[#d5d8dc]">

              {section1Data.map((item, index) => {
  const id = `s1-${index}`;
  const isOpen = activeIndex === id;

  return (
    <div key={index} className="border-t first:border-t-0 border-[#e5e5e5]">

      <div
        onClick={() => toggleAccordion(id)}
        className="flex justify-between p-4 cursor-pointer"
      >
        <h3 className={isOpen ? "text-[#c19417] text-xl font-medium" : "text-[#111]  text-xl font-medium"}>
          {String(index + 1).padStart(2, "0")} {item.title}
        </h3>

       
      </div>

      {isOpen && (
        <div className="p-4 border-t border-[#e5e5e5] text-sm leading-6 text-gray-600">
          {item.content}
        </div>
      )}

    </div>
  );
})}

            </div>
          </div>
        </div>

        {/* ================= SECTION 2 ================= */}
        <div className="flex gap-12 items-start flex-col-reverse md:flex-row-reverse bg-[#f1efea] md:p-10 p-4 rounded">

          {/* IMAGE */}
          <div className=" md:w-1/2 w-full">
            <img src="/accordion-banner-02.png" className="w-full h-full object-cover" />
          </div>

          {/* CONTENT */}
          <div className="md:w-1/2 w-full">
            <p className="text-sm text-[#666] mb-2 ">Fully adjustable</p>
            <h2 className="md:text-4xl text-2xl mb-6 font-medium">Accordion colors</h2>

            {/* ACCORDION */}
            <div className="bg-white p-4 rounded">

             {section2Data.map((item, index) => {
  const id = `s1-${index}`;
  const isOpen = activeIndex === id;

  return (
    <div key={index} className="">

      <div
        onClick={() => toggleAccordion(id)}
        className="flex justify-between p-4 cursor-pointer"
      >
        <h3 className={isOpen ? "text-[#c19417]  text-xl font-medium" : " text-[#111]  text-xl font-medium"}>
          {String(index + 1).padStart(2, "0")} {item.title}
        </h3>

        
      </div>

      {isOpen && (
        <div className="p-4 border-t border-[#e5e5e5] leading-6 text-sm text-gray-600">
          {item.content}
        </div>
      )}

    </div>
  );
})}

            </div>
          </div>
        </div>

        {/* ================= SECTION 3 ================= */}
        <div className="flex md:flex-row flex-col p-4 gap-12 items-start">

          {/* IMAGE */}
          <div className=" md:w-1/2 w-full" >
            <img src="/accordion-banner-03.png" className="w-full h-full object-cover" />
          </div>

          {/* CONTENT */}
          <div className="md:w-1/2 w-full">
            <p className="text-sm mb-2 text-[#666]">Fonts, colors & more</p>
            <h2 className="md:text-4xl text-2xl mb-6 font-medium">Typography styles</h2>

            {/* ACCORDION */}
            <div>

              {section3Data.map((item, index) => {
  const id = `s1-${index}`;
  const isOpen = activeIndex === id;

  return (
    <div key={index} className="">

      <div
        onClick={() => toggleAccordion(id)}
        className="flex justify-between p-4 cursor-pointer"
      >
        <h3 className={isOpen ? "text-[#c19417]  text-xl font-medium" : " text-[#111]  text-xl font-medium"}>
          {String(index + 1).padStart(2, "0")} {item.title}
        </h3>

       
      </div>

      {isOpen && (
        <div className="p-4 border-t border-[#e5e5e5] text-sm leading-6 text-gray-600">
          {item.content}
        </div>
      )}

    </div>
  );
})}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}