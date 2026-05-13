import React, { useState ,useContext,useRef,useEffect} from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MobileNavItem from "./MobileNavItem";
import { categoriesData } from "../../data/categories";
import { productsData } from "../../data/product";
import { RiUser3Line, RiShoppingBagLine } from "@remixicon/react";

export default function Header({ data = {} }) {
const {actionIcons=[]}=data;
const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();
const userMenuRef = useRef(null);

const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
useEffect(() => {
  const handleOutsideClick = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setShowUserMenu(false);
    }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, []);
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


    const categoryImages = [
  {
    id: 1,
    name: "Diamond Ring",
    image: "/cat-1-2.jpg",
  },
  {
    id: 2,
    name: "Hoops Earring",
    image: "/cat-2-1.jpg",
  },
  {
    id: 3,
    name: "Stud Earring",
    image: "/cat-3-1.jpg",
  },
  {
    id: 4,
    name: "Antique Bangla",
    image: "/cat-4-1.jpg",
  },
  {
    id: 5,
    name: "Drops Earring",
    image: "/cat-5-1.jpg",
  },
  {
    id: 6,
    name: "Gold Rings",
    image: "/cat-6-1.jpg",
  },
  {
    id: 7,
    name: "Pendant",
    image: "/cat-7-1.jpg",
  },
  {
    id: 8,
    name: "Rose Gold Rings",
    image: "/cat-8-1.jpg",
  },
];

const elementsDropdown = [
  { label: "Accordion", link: "/accordion" },
  { label: "Icon Box", link: "/icon-box" },
  { label: "Portfolio", link: "/portfolio" },
  { label: "FAQs", link: "/faqs", badge: "ASK" },
  { label: "Gallery", link: "/gallery" },
  { label: "Tabs", link: "/tabs", badge: "NEW", icon: true },
  { label: "Blog", link: "/blog" },
  { label: "About Us ", link: "/about-us" },
  { label: "Contact Us", link: "/contact-us" },
  
];

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="border-b font-user border-[#e5e5e5]">
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
   
{/* RIGHT - ICONS */}
<div className="flex justify-end items-center gap-5">
  
  {/* USER DROPDOWN */}
  <div className="relative" ref={userMenuRef}>
    <button
      onClick={() => setShowUserMenu(!showUserMenu)}
      className="relative flex items-center gap-2"
    >
      <RiUser3Line size={24} />
    </button>

    {showUserMenu && (
      <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50">
        {user ? (
          <>
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
            </div>
            <button
              onClick={() => { navigate("/account"); setShowUserMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              My Account
            </button>
            <button
              onClick={() => { navigate("/my-orders"); setShowUserMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              My Orders
            </button>
            <button
              onClick={() => { logout(); setShowUserMenu(false); navigate("/dashboard"); }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { navigate("/account"); setShowUserMenu(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Login / Register
            </button>
          </>
        )}
      </div>
    )}
  </div>

  {/* BAAKI ICONS — heart, cart */}
  {actionIcons.map((item) => (
    item.onClick ? (
      <button
        key={item.type}
        onClick={item.onClick}
        className="relative flex items-center gap-2"
      >
        <div className="relative">
          <item.icon size={24} />
          {item.badge > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#c19417] text-white text-[10px] flex items-center justify-center font-medium">
              {item.badge}
            </span>
          )}
        </div>
        {item.extraText && (
          <div className="hidden xl:flex flex-col leading-tight">
            <span className="text-xs text-gray-400">My Cart</span>
            <span className="text-sm font-semibold text-gray-900">{item.extraText}</span>
          </div>
        )}
      </button>
    ) : (
      <Link key={item.type} to={item.link} className="relative flex items-center gap-2">
        <div className="relative">
          <item.icon size={24} />
          {item.badge > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#c19417] text-white text-[10px] flex items-center justify-center font-medium">
              {item.badge}
            </span>
          )}
        </div>
        {item.extraText && (
          <div className="hidden xl:flex flex-col leading-tight">
            <span className="text-xs text-gray-400">My Cart</span>
            <span className="text-sm font-semibold text-gray-900">{item.extraText}</span>
          </div>
        )}
      </Link>
    )
  ))}

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

     <div className="flex items-center gap-3">
  <button onClick={() => setShowSearch(true)}>
    {SearchIcon && <SearchIcon size={22} />}
  </button>

  {actionIcons.map((item) => (
    <Link key={item.type} to={item.link} className="relative">
      <item.icon size={22} />
      {item.badge > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#c19417] text-white text-[9px] flex items-center justify-center font-medium">
          {item.badge}
        </span>
      )}
    </Link>
  ))}
</div>

    </div>
  </div>

</div>
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      {showSearch && (
        <div className="lg:hidden p-4 border-b font-user">
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
          className="fixed font-user inset-0 bg-black/40 z-[200]"
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
    bestSellingProducts={bestSellingProducts}
    categoryImages={categoryImages}
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
        categoryImages={categoryImages}
        elementsDropdown={elementsDropdown}
      />
    </>
  );
}