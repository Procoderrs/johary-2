import React, { useState } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import { categoriesData } from "../../data/categories";
import { productsData } from "../../data/product";

export default function Header({ data = {} }) {
  const [showSearch, setShowSearch] = useState(false);

  const {
    logo = "/logo.svg",
    searchPlaceholder = "Search products...",
    searchIcon: SearchIcon,
    actionIcons = [],
    navItems = [],
  } = data;

const menuCategories = categoriesData.filter((item) => item.showInMenu).slice(0, 6);
  const bestSellingProducts = productsData
    .filter((item) => item.highlight === "best-seller")
    .slice(0, 4);

  return (
    <>
      {/* ===================== TOP HEADER ===================== */}
      <div className="relative border-b border-[#e5e5e5] font-body">
        <div className="w-full max-w-[1440px] mx-auto px-4  py-6">
          <div className="grid grid-cols-3 items-center">
            
            {/* Left - Search */}
            <div className="hidden lg:flex items-center overflow-hidden bg-[#f5f5f5] w-[260px] lg:w-[360px]">
              <input
                type="text"
                className="p-3 outline-none w-full bg-transparent text-sm"
                placeholder={searchPlaceholder}
              />
              <button className="px-4 text-[#111111]">
                {SearchIcon ? <SearchIcon size={23} /> : null}
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-6 md:h-7.5 object-contain"
                />
              </Link>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center justify-end gap-4">
              {/* Search Icon mobile */}
              <button
                onClick={() => setShowSearch(true)}
                className="lg:hidden font-thin hover:text-[#c19417] transition duration-300"
              >
                {SearchIcon ? <SearchIcon size={27} /> : null}
              </button>

              {actionIcons.map((item, index) => {
                const IconComponent = item.icon;

                return (
                  <Link
                    key={index}
                    to={item.link || "/"}
                    className="flex items-center gap-2 hover:text-[#c19417] relative transition duration-300"
                  >
                    <div className="relative">
                      {IconComponent ? <IconComponent size={27} /> : null}

                      {item.badge !== undefined && (
                        <span className="absolute -top-2 -right-2 bg-[#c19417] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {item.extraText && (
                      <p className="hidden lg:flex text-sm font-medium ml-1 flex-col leading-tight">
                        <span className="text-[#666666]">{item.extraText}</span>
                        <span className="font-semibold text-[#111111]">
                          My Cart
                        </span>
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE SEARCH ===================== */}
      {showSearch && (
        <div className="lg:hidden w-full border-b border-[#e5e5e5] bg-white font-body px-4 md:px-8 py-4">
          <div className="flex items-center bg-[#f5f5f5] overflow-hidden mb-4">
            <input
              type="text"
              className="p-3 outline-none w-full bg-transparent text-sm"
              placeholder={searchPlaceholder}
              autoFocus
            />
            <button className="px-4 text-[#111111]">
              {SearchIcon ? <SearchIcon size={24} /> : null}
            </button>
          </div>

          <button
            onClick={() => setShowSearch(false)}
            className="text-sm text-[#666666] hover:text-[#c19417] transition"
          >
            Close
          </button>
        </div>
      )}

      {/* ===================== DESKTOP NAV ===================== */}
      <DesktopNav
        navItems={navItems}
        categories={menuCategories}
        bestSellingProducts={bestSellingProducts}
      />
    </>
  );
}