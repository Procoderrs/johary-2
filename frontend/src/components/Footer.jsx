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
        "60 29th Street San Francisco, 507-Union Trade Center, United States",
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
    <footer className="w-full bg-black text-[#f5f5f5] font-body py-14 md:py-16 px-4">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1 - Store Info */}
        <div>
          <h3 className="text-[18px] font-semibold mb-2">
            {footer.storeInfo.name}
          </h3>

          <p className="text-[13px] leading-5 text-[#b2b2b2] mb-2">
            {footer.storeInfo.address}
          </p>

          <p className="text-[13px] text-[#b2b2b2] mb-2">
            {footer.storeInfo.landline}
          </p>

          <p className="text-[13px] text-[#b2b2b2] mb-2">
            {footer.storeInfo.phone}
          </p>

          <a
            href={`mailto:${footer.storeInfo.email}`}
            className="text-[13px] text-[#b2b2b2] hover:text-[#c19417] transition duration-300"
          >
            {footer.storeInfo.email}
          </a>
        </div>

        {/* Dynamic Footer Columns */}
        {footer.sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-[16px] font-semibold mb-2">
              {section.title}
            </h3>

            <ul className="space-y-1">
              {section.links.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.link}
                    className="text-[13px] text-[#b2b2b2] hover:text-[#c19417] transition duration-300"
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
      <div className="max-w-[1440px] mx-auto border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-5 px-4 md:px-0">
        
        {/* Left - Social Icons */}
        <div className="flex items-center gap-4">
          {footer.socialLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                className="text-[#b2b2b2] hover:text-[#c19417] transition duration-300"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Center - Copyright */}
        <p className="text-[13px] text-[#b2b2b2] text-center md:text-center">
          © 2026 Johary Demo - WordPress Theme by Avanam
        </p>

        {/* Right - Payment Icons */}
        <div className="flex items-center gap-4">
          {footer.paymentIcons.map((Icon, index) => (
            <span
              key={index}
              className="text-[#b2b2b2] hover:text-[#c19417] transition duration-300"
            >
              <Icon size={26} />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}