import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ data }) {
  const {
    logo,
    searchPlaceholder,
    searchIcon: SearchIcon,
    actionIcons = [],
    navItems = [],
  } = data;

  return (
    <>
      {/* Top Header Row */}
      <div className="flex items-center px-8 py-6 border-b border-[#e5e5e5] font-body">
        
        {/* Left - Search */}
        <div className="flex items-center overflow-hidden bg-[#f5f5f5] w-[320px]">
          <input
            type="text"
            className="p-3 outline-none w-full bg-transparent"
            placeholder={searchPlaceholder}
          />
          <button className="px-4">
            {SearchIcon && <SearchIcon size={25} />}
          </button>
        </div>

        {/* Logo */}
        <div className="ml-36">
          <img src={logo} alt="Johary Logo" className="h-8 object-contain" />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 ml-auto">
          {actionIcons.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <Link
                key={index}
                to={item.link}
                className="flex items-center gap-2  hover:text-pink-500 relative"
              >
                {/* Icon wrapper */}
                <div className="relative ">
                  <IconComponent size={29} />

                  {/* Badge */}
                  {item.badge !== undefined && (
                    <span className="absolute -top-2 -right-2 bg-[#c19417] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Extra text like cart price */}
                {item.extraText && (
                  <p className="text-sm font-medium  ml-1 flex flex-col"><span className='text-[#666666]'>{item.extraText}</span>
                  <span className='font-semibold'>My Cart</span></p>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      
{/* Bottom Nav Row */}
<div className="flex justify-center items-center gap-9 py-6 border-b font-body">
  {navItems.map((item, index) => {
    // if icon property exists, use it
    const DropdownIcon = item.icon;

    return (
      <Link
        key={index}
        to={item.link}
        className="relative text-sm font-medium uppercase hover:text-[#c19417]"
      >
        <div className="flex items-center text-[15px] font-medium gap-1">
          <span>{item.label}</span>

          {/* Badge first */}
          {item.badge && (
            <span
              className={`ml-1 text-[10px] px-2 py-0.5 rounded text-white font-semibold ${
                item.badge === "HOT" ? "bg-[#e62a65]" : "bg-[#199588]"
              }`}
            >
              {item.badge}
            </span>
          )}

          {/* Dropdown icon after badge */}
          {DropdownIcon && <DropdownIcon size={20} />}
        </div>
      </Link>
    );
  })}
</div>
    </>
  );
}