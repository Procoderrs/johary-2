import React from "react";
import {
  RiFacebookFill,
  RiTwitterXFill,
  RiInstagramLine,
  RiPinterestLine,
  RiVisaLine,
  RiMastercardLine,
  RiPaypalLine,
  RiBankCardLine,
} from "@remixicon/react";

export default function Footer() {
  const footer = {
    storeInfo: {
      name: "Store Information",
      address:
        "60 29th Street San Francisco, 507-Union Trade Center, United States America - 94110",
      landline: "(+91)-0123-456-789",
      phone: "(+91) 9876-543-210",
      email: "demo@example.com",
    },

    sections: [
      {
        title: "Help",
        links: [
          { label: "Order Status", link: "/order-status" },
          { label: "Checkout", link: "/checkout" },
          { label: "My Account", link: "/my-account" },
          { label: "Locality", link: "/locality" },
          { label: "Privacy Policy", link: "/privacy-policy" },
          { label: "Contact Us", link: "/contact-us" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Order Status", link: "/order-status" },
          { label: "Terms And Conditions", link: "/terms-and-conditions" },
          { label: "Policy For Sellers", link: "/policy-for-sellers" },
          { label: "Policy For Buyers", link: "/policy-for-buyers" },
          { label: "Shipping & Refund", link: "/shipping-refund" },
          { label: "Wholesale Policy", link: "/wholesale-policy" },
        ],
      },
      {
        title: "Find Product",
        links: [
          { label: "Order Status", link: "/order-status" },
          { label: "Checkout", link: "/checkout" },
          { label: "License Policy", link: "/liscense-policy" },
          { label: "Affiliate", link: "/affiliate" },
          { label: "Locality", link: "/locality" },
          { label: "Order Tracking", link: "/order-tracking" },
        ],
      },
    ],

    socialLinks: [
      { icon: RiFacebookFill, link: "/" },
      { icon: RiTwitterXFill, link: "/" },
      { icon: RiInstagramLine, link: "/" },
      { icon: RiPinterestLine, link: "/" },
    ],

    paymentIcons: [RiVisaLine, RiMastercardLine, RiPaypalLine, RiBankCardLine],
  };

  return (
    <footer className="w-full bg-black text-[#f5f5f5] font-body pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 px-4">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[32%_22%_22%_30%] gap-10 pb-12 md:pb-16 lg:pb-20 border-b border-[#666666]">
        
        {/* Column 1 - Store Info */}
        <div>
          <h3 className="text-[18px] font-semibold mb-2 lg:mb-6">
            {footer.storeInfo.name}
          </h3>

          <p className="text-[15px] w-[250px] leading-5 text-[#b2b2b2] mb-2 lg:mb-4">
            {footer.storeInfo.address}
          </p>

          <p className="text-[15px] text-[#b2b2b2] mb-2 lg:mb-6">
            {footer.storeInfo.landline}
          </p>

          <p className="text-[15px] text-[#b2b2b2] mb-2 lg:mb-6">
            {footer.storeInfo.phone}
          </p>

          <a
            href={`mailto:${footer.storeInfo.email}`}
            className="text-[15px] text-[#b2b2b2] hover:text-[#c19417] transition duration-300"
          >
            {footer.storeInfo.email}
          </a>
        </div>

        {/* Dynamic Footer Columns */}
        {footer.sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-[16px] lg:text-lg font-semibold mb-2 lg:mb-6">
              {section.title}
            </h3>

            <ul className="space-y-3">
              {section.links.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.link}
                    className="text-[15px] text-[#b2b2b2] hover:text-[#c19417] transition duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="max-w-[1440px] mx-auto mt-8 md:mt-10 lg:mt-12 flex flex-col md:flex-row items-center justify-between gap-5 px-4 md:px-0">
        
        {/* Left - Social Icons */}
        <div className="flex items-center gap-4">
          {footer.socialLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                className="text-black bg-white p-3 rounded-full hover:text-[#c19417] transition duration-300"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Center - Copyright */}
        <p className="text-[15px] text-[#b2b2b2] text-center md:text-center">
          © 2026 Johary Demo - WordPress Theme by Avanam
        </p>

        {/* Right - Payment Icons */}
        <div className="flex items-center gap-4">
          <img src="/payment.png" alt="" />
        </div>
      </div>
    </footer>
  );
}