import React from "react";
import { NavLink } from "react-router-dom";
import MegaMenu from "./MegaMenu";

export default function DesktopNav({
  navItems = [],
  categories = [],
  bestSellingProducts = [],
}) {
  return (
    <div className="sticky top-0 hidden lg:flex justify-center items-center gap-6 lg:gap-12 py-4.5 border-b border-[#e5e5e5] font-body z-[100] bg-white shadow-xl">
      {navItems.map((item, index) => {
        const DropdownIcon = item.icon;

        return (
          <div key={index} className="relative group">
            <NavLink
              to={item.link || "/"}
              className={({ isActive }) =>
                `relative text-sm font-medium uppercase transition duration-300 ${
                  isActive ? "text-[#c19417]" : "hover:text-[#c19417]"
                }`
              }
            >
              <div className="flex items-center text-[14px] lg:text-[15px] font-medium gap-1">
                <span>{item.label}</span>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={`ml-1 text-[9px] px-2 py-0.5 rounded text-white font-semibold ${
                      item.badge === "HOT"
                        ? "bg-[#e62a65]"
                        : "bg-[#199588]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Dropdown Icon */}
                {DropdownIcon ? <DropdownIcon size={18} /> : null}
              </div>
            </NavLink>

            {/* Mega Menu only for Categories */}
            {item.label === "Categories" && (
              <MegaMenu
                categories={categories}
                bestSellingProducts={bestSellingProducts}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}