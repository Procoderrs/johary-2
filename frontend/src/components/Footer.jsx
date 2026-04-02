import React from "react";

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
        title: "Quick Links",
        links: [
          { label: "Order Status", link: "/order-status" },
          { label: "Terms And Conditions", link: "/terms-and-conditions" },
          { label: "Policy For Sellers", link: "/policy-for-sellers" },
          { label: "Policy For Buyers", link: "/policy-for-buyers" },
          { label: "Shipping & Refund", link: "/shipping-refund" },
          { label: "Wholesale Policy", link: "/wholesale-policy" },
        ],
      },
    ],
  };

  return (
    <footer className="w-full bg-black text-[#f5f5f5] px-4 md:px-10 lg:px-16 py-14 md:py-16 font-body">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1 - Store Info */}
        <div>
          <h3 className="text-[20px] font-semibold mb-5">
            {footer.storeInfo.name}
          </h3>

          <p className="text-[15px] leading-7 text-[#d1d1d1] mb-4">
            {footer.storeInfo.address}
          </p>

          <p className="text-[15px] text-[#d1d1d1] mb-2">
            {footer.storeInfo.landline}
          </p>

          <p className="text-[15px] text-[#d1d1d1] mb-2">
            {footer.storeInfo.phone}
          </p>

          <a
            href={`mailto:${footer.storeInfo.email}`}
            className="text-[15px] text-[#d1d1d1] hover:text-[#c19417] transition duration-300"
          >
            {footer.storeInfo.email}
          </a>
        </div>

        {/* Dynamic Footer Columns */}
        {footer.sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-[20px] font-semibold mb-5">
              {section.title}
            </h3>

            <ul className="space-y-3">
              {section.links.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.link}
                    className="text-[15px] text-[#d1d1d1] hover:text-[#c19417] transition duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}