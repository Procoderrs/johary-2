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

  const accordionSections = [
    {
      id: 1,
      small: true,
      tag: "Pick your style",
      title: "Boxes and borders",
      image: "/accordion-banner-01.jpg",
      items: [
        {
          title: "Accordion 01",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
          title: "Accordion 02",
          content:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        },
        {
          title: "Accordion 03",
          content:
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
        },
      ],
    },
    {
      id: 2,
      reverse: true,
      tag: "Modern design",
      title: "Image left layout",
      image: "/accordion-banner-02.png",
      items: [
        { title: "Accordion 01", content: "Lorem ipsum dolor sit amet." },
        { title: "Accordion 02", content: "Lorem ipsum dolor sit amet." },
        { title: "Accordion 03", content: "Lorem ipsum dolor sit amet." },
      ],
    },
    {
      id: 3,
      reverse: false,
      tag: "Creative style",
      title: "Image right layout",
      image: "/accordion-banner-03.png",
      items: [
        { title: "Accordion 01", content: "Lorem ipsum dolor sit amet." },
        { title: "Accordion 02", content: "Lorem ipsum dolor sit amet." },
        { title: "Accordion 03", content: "Lorem ipsum dolor sit amet." },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="font-body">

      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          alt="Breadcrumb"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[28px] font-semibold text-[#111111]">
            {getTitle()}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      {/* ================= ACCORDION SECTIONS ================= */}
      <div className="py-20 px-6 space-y-24 max-w-[1200px] mx-auto">

        {accordionSections.map((section, secIndex) => (
          <div
            key={section.id}
            className={`flex gap-14 items-start ${
              section.reverse ? "flex-row-reverse" : ""
            }`}
          >

            {/* IMAGE */}
            <div className={`${section.small ? "w-[45%]" : "w-1/2"}`}>
              <img
                src={section.image}
                className={`w-full object-cover rounded-sm ${
                  section.small ? "h-[420px]" : "h-full"
                }`}
              />
            </div>

            {/* CONTENT */}
            <div className={`${section.small ? "w-[55%]" : "w-1/2"} flex flex-col`}>

              <h2 className="text-[#666666] text-sm">
                {section.tag}
              </h2>

              <h2 className="text-4xl font-medium mb-6">
                {section.title}
              </h2>

              {/* ACCORDION BOX */}
              <div className="border border-[#d5d8dc] divide-y">

                {section.items.map((item, index) => {
                  const globalIndex = `${secIndex}-${index}`;
                  const isOpen = activeIndex === globalIndex;

                  return (
                    <div key={index}>

                      {/* HEADER */}
                      <div
                        onClick={() => toggleAccordion(globalIndex)}
                        className="flex items-center justify-between p-4 cursor-pointer"
                      >

                        {/* NUMBER + TITLE */}
                        <h3 className="text-[14px]">
                          {String(index + 1).padStart(2, "0")} {item.title}
                        </h3>

                        {/* PLUS / MINUS */}
                        <span className="text-xl">
                          {isOpen ? "−" : "+"}
                        </span>

                      </div>

                      {/* CONTENT */}
                      {isOpen && (
                        <div className="p-4 text-sm text-gray-600 leading-relaxed">
                          {item.content}
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}