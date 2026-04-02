import React from "react";
import { Link } from "react-router-dom";

export default function Header({ data = {} }) {
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
      <div className="flex items-center px-4 md:px-8 py-6 border-b border-[#e5e5e5] font-body gap-4">
        
        {/* Left - Search */}
        <div className="hidden md:flex items-center overflow-hidden bg-[#f5f5f5] w-[260px] lg:w-[320px]">
          <input
            type="text"
            className="p-3 outline-none w-full bg-transparent text-sm"
            placeholder={searchPlaceholder}
          />
          <button className="px-4 text-[#111111]">
            {SearchIcon ? <SearchIcon size={24} /> : null}
          </button>
        </div>

        {/* Logo */}
        <div className="mx-auto lg:mx-0 lg:ml-24 xl:ml-36">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-8 md:h-9 object-contain"
            />
          </Link>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 ml-auto">
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

                {/* Extra text like cart */}
                {item.extraText && (
                  <p className="hidden md:flex text-sm font-medium ml-1 flex-col leading-tight">
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

      {/* ===================== BOTTOM NAV ===================== */}
      <div className="hidden md:flex justify-center items-center gap-6 lg:gap-9 py-6 border-b border-[#e5e5e5] font-body">
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
    </>
  );
}