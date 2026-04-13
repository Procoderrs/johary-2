import React, { useRef, useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import MegaMenu from "./MegaMenu";

export default function DesktopNav({
  navItems = [],
  categories = [],
  bestSellingProducts = [],
  categoryImages = [],
  elementsDropdown = [],
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const timeoutRef = useRef(null);
  const headerRef = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(0);

useEffect(() => {
  if (headerRef.current) {
    setHeaderHeight(headerRef.current.offsetHeight);
  }
}, []);

  const handleEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  return (
    <div className="sticky top-0 hidden lg:flex justify-center items-center gap-6 lg:gap-12 py-4.5 border-b border-[#e5e5e5] font-body z-[100] bg-white shadow-xl">
      {navItems.map((item, index) => {
        const DropdownIcon = item.icon;

        return (
          <div
            key={index}
            className=" group"
            onMouseEnter={() => handleEnter(item.label)}
            onMouseLeave={handleLeave}
          >
            {/* NAV ITEM */}
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

                {DropdownIcon ? <DropdownIcon size={18} /> : null}
              </div>
            </NavLink>

            {/* ================= CATEGORIES MEGA MENU ================= */}
            {item.label === "Categories" &&
              openMenu === "Categories" && (
                <div
                  onMouseEnter={() => handleEnter("Categories")}  
                  onMouseLeave={handleLeave} className=" left-0  w-full z-[999]"
                >
                  <MegaMenu
                    categories={categories}
                    bestSellingProducts={bestSellingProducts}
                    type="categories" 
                    headerHeight={headerHeight}
                  />
                </div>
              )}

            {/* ================= PRODUCTS MEGA MENU ================= */}
            {item.label === "Products" &&
              openMenu === "Products" && (
                <div
                  onMouseEnter={() => handleEnter("Products")} ref={headerRef}
                  onMouseLeave={handleLeave} className="left-0   w-full z-[999]"
                >
                  <MegaMenu type="products"
                   headerHeight={headerHeight} />
                </div>
              )}
            {/* ================= top deals  MEGA MENU ================= */}

               {item.label === "Top Deals" &&
              openMenu === "Top Deals" && (
    <div
      onMouseEnter={() => handleEnter("Top Deals")}
      onMouseLeave={handleLeave}
      className="left-0 w-full z-[999]"
    >
      <MegaMenu
        type="topdeals"
        categoryImages={categoryImages}
        bestSellingProducts={bestSellingProducts}
      />
    </div>
              )}

              {/* ================= ELEMENTS DROPDOWN ================= */}
{item.label === "Elements" &&
  openMenu === "Elements" && (
    <div
      onMouseEnter={() => handleEnter("Elements")}
      onMouseLeave={handleLeave}
      className="absolute top-14 right-15  border border-gray-50   w-[350px] bg-white shadow-lg z-[999]"
    >
      <div className="py-2">

        {elementsDropdown.map((el, i) => (
          <NavLink
            key={i}
            to={el.link}
            className="flex items-center ml-2 px-4 py-1 mt-2 hover:text-[#c19417] text-[#666666] text-[14px] "
          >
            <span>{el.label}</span>

            {/* RIGHT SIDE (badge / icon) */}
            <div className="flex  ml-2 gap-2">

              {/* ASK badge */}
              {el.badge === "ASK" && (
                <span className="text-[10px] px-2 py-[2px] bg-[#199588] text-white rounded">
                  ASK
                </span>
              )}

              {/* NEW badge */}
              {el.badge === "NEW" && (
                <span className="text-[10px] px-2 py-[2px] bg-[#e62a65] text-white rounded">
                  NEW
                </span>
              )}

              {/* small icon for Tabs */}
              {el.icon && (
                <span className="w-2 h-2 bg-[#c19417] rounded-full"></span>
              )}

            </div>

          </NavLink>
        ))}

      </div>
    </div>
)}
          </div>
        );
      })}
    </div>
  );
}