import React, { useState } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNavItem from "./MobileNavItem";
import { categoriesData } from "../../data/categories";
import { productsData } from "../../data/product";
import { RiUser3Line, RiShoppingBagLine } from "@remixicon/react";

export default function Header({ data = {} }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    logo = "/logo.svg",
    searchPlaceholder = "Search products...",
    searchIcon: SearchIcon,
    navItems = [],
  } = data;

  const menuCategories = categoriesData
    .filter((item) => item.showInMenu)
    .slice(0, 6);

  const bestSellingProducts = productsData
    .filter((item) => item.highlight === "best-seller")
    .slice(0, 4);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto px-4 py-4">

  {/* ================= DESKTOP HEADER ================= */}
  <div className="hidden lg:grid grid-cols-3 items-center gap-4">

    {/* LEFT - SEARCH */}
    <div className="flex items-center bg-[#f5f5f5] overflow-hidden">
      <input
        type="text"
        placeholder={searchPlaceholder}
        className="p-3 w-full bg-transparent outline-none text-sm"
      />
      <button className="px-4">
        {SearchIcon && <SearchIcon size={20} />}
      </button>
    </div>

    {/* CENTER - LOGO */}
    <div className="flex justify-center">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-7" />
      </Link>
    </div>

    {/* RIGHT - ICONS */}
    <div className="flex justify-end items-center gap-4">

      <Link to="/account">
        <RiUser3Line size={24} />
      </Link>

      <Link to="/cart">
        <RiShoppingBagLine size={24} />
      </Link>

    </div>
  </div>

  {/* ================= MOBILE HEADER ================= */}
  <div className="flex items-center justify-between lg:hidden">

    {/* Burger */}
    <button
      onClick={() => setShowMenu(true)}
      className="text-2xl"
    >
      ☰
    </button>

    {/* Logo */}
    <Link to="/">
      <img src={logo} alt="Logo" className="h-6" />
    </Link>

    {/* Icons */}
    <div className="flex items-center gap-3">

      <button onClick={() => setShowSearch(true)}>
        {SearchIcon && <SearchIcon size={22} />}
      </button>

      <Link to="/account">
        <RiUser3Line size={22} />
      </Link>

      <Link to="/cart">
        <RiShoppingBagLine size={22} />
      </Link>

    </div>
  </div>

</div>
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      {showSearch && (
        <div className="lg:hidden p-4 border-b">
          <input
            type="text"
            autoFocus
            placeholder={searchPlaceholder}
            className="w-full p-3 bg-gray-100 outline-none"
          />
          <button onClick={() => setShowSearch(false)}>Close</button>
        </div>
      )}

      {/* ================= MOBILE DRAWER ================= */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-[200]"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="w-[280px] h-full bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowMenu(false)}>✕</button>

            {navItems.map((item, index) => (
              <MobileNavItem
                key={index}
                item={item}
                categories={menuCategories}
              />
            ))}
          </div>
        </div>
      )}

      {/* ================= DESKTOP NAV ================= */}
      <DesktopNav
        navItems={navItems}
        categories={menuCategories}
        bestSellingProducts={bestSellingProducts}
      />
    </>
  );
}