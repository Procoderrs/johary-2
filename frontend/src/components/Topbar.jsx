import React from "react";
import { Link } from "react-router-dom";

function Topbar({ data }) {
  const { phone, leftItems = [], menuItems = [] } = data;

  return (
    <div className="flex justify-between font-body text-[14px]  items-center  max-w-full mx-auto px-4 py-2  2xl:px-24 bg-[#222222] text-white">
      {/* Left Section */}
      <div className="flex md:flex-row flex-col mx-2 text-center justify-center items-center tracking-[0.7px] gap-1">
        <span className="">{phone}</span>

        {/* Left buttons */}
        <div className="flex  ">
          {leftItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="  underline  hover:text-[#c19417]    "
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section (menu items) */}
      <nav className="lg:flex gap-4 hidden ">
        {menuItems.map((menu, index) => (
          <Link
            key={index}
            to={menu.link}
            className="hover:text-blue-400 text-sm tracking-[0.7px] pr-5 border-[#666666] last:border-r-0 border-r"
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Topbar;