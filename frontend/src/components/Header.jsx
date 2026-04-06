import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ data = {} }) {
  const [showSearch, setShowSearch] = useState(false);

  const {
    logo = "/logo.svg",
    searchPlaceholder = "Search products...",
    searchIcon: SearchIcon,
    actionIcons = [],
    navItems = [],
  } = data;

  return (
    <>
      {/* ===================== TOP HEADER ===================== */}
      <header className="border-b border-[#e5e5e5] font-body">
        <div className="max-w-full mx-auto px-4  2xl:px-24">
          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center py-6 gap-4">
            
            {/* Left - Search (Desktop only) */}
            <div className="hidden lg:flex items-center justify-self-start overflow-hidden bg-[#f5f5f5] w-[260px] xl:w-[320px]">
              <input
                type="text"
                className="p-3 outline-none w-full bg-transparent text-[#77777] text-sm"
                placeholder={searchPlaceholder}
              />
              <button className="px-4 text-[#111111]">
                {SearchIcon ? <SearchIcon size={24} /> : null}
              </button>
            </div>

            {/* Left placeholder on small screens to keep logo centered */}
            <div className="lg:hidden"></div>

            {/* Center - Logo */}
            <div className="flex justify-center">
              <Link to="/" className="inline-flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-6 object-contain"
                />
              </Link>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center justify-self-end gap-4">
              
              {/* Search Icon (Mobile / Tablet only) */}
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
                    {/* Icon */}
                    <div className="relative">
                      {IconComponent ? <IconComponent size={27} /> : null}

                      {/* Badge */}
                      {item.badge !== undefined && (
                        <span className="absolute -top-2 -right-2 bg-[#c19417] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Extra Text (Desktop only) */}
                    {item.extraText && (
                      <p className="hidden lg:flex text-sm font-medium ml-1 mr-3 flex-col leading-tight">
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
      </header>

      {/* ===================== SEARCH OVERLAY (before lg) ===================== */}
      {showSearch && (
        <div className="lg:hidden w-full border-b border-[#e5e5e5] bg-white font-body px-4 md:px-8 py-4 animate-fadeIn">
          
          {/* Search Box */}
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

          {/* Mobile / Tablet Nav */}
          <div className="flex flex-wrap gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link || "/"}
                onClick={() => setShowSearch(false)}
                className="text-sm font-medium uppercase hover:text-[#c19417] transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowSearch(false)}
            className="mt-4 text-sm text-[#666666] hover:text-[#c19417] transition"
          >
            Close
          </button>
        </div>
      )}

      {/* ===================== BOTTOM NAV ===================== */}
      <div className="hidden lg:block border-b border-[#e5e5e5] font-body">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="flex justify-center items-center gap-6 lg:gap-9 py-6">
            {navItems.map((item, index) => {
              const DropdownIcon = item.icon;

              return (
                <Link
                  key={index}
                  to={item.link || "/"}
                  className="relative text-sm font-medium uppercase hover:text-[#c19417] transition duration-300"
                >
                  <div className="flex items-center text-[14px] lg:text-[15px] font-medium gap-1">
                    <span>{item.label}</span>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`ml-1 text-[10px] px-2 py-0.5 rounded text-white font-semibold ${
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}