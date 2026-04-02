import React from "react";
import { Link } from "react-router-dom";

function Topbar({ data }) {
  const { phone, leftItems = [], menuItems = [] } = data;

  return (
    <div className="flex justify-between font-body text-sm  items-center p-3 bg-[#222222] text-white">
      {/* Left Section */}
      <div className="flex items-center gap-1">
        <span className="">{phone}</span>

        {/* Left buttons */}
        <div className="flex tracking-[0.7px] ">
          {leftItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="  underline hover:text-[#c19417]   rounded "
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section (menu items) */}
      <nav className="flex gap-4">
        {menuItems.map((menu, index) => (
          <Link
            key={index}
            to={menu.link}
            className="hover:text-blue-400 pr-5 border-[#666666] last:border-r-0 border-r"
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Topbar;