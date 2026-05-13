import React from "react";
import { Link } from "react-router-dom";
import TrendingProducts from "../TrendingProducts";
import { productsData } from "../../data/product";
import { shop } from "../../data/shop";
import { useState,useRef ,useEffect} from "react";

export default function MegaMenu({
  
  categories = [],
  bestSellingProducts = [],
  type = "categories",
  categoryImages=[],
  headerHeight=0,
}){
  const [openMenu, setOpenMenu] = useState(null);
  const timeoutRef = useRef(null);

  const handleEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

const badgeStyles = {
  NEW: "bg-green-100 text-green-700",
  SALE: "bg-orange-100 text-orange-700",
  POPULAR: "bg-amber-100 text-amber-800",
  HOT: "bg-pink-100 text-pink-700",
  FEATURED: "bg-rose-100 text-rose-700",
};

  return (
   <div
  className="absolute top-full font-user left-0 right-0 flex justify-center w-full z-[999]"
  onMouseEnter={() => handleEnter(type === "products" ? "Products" : "Categories")}
  onMouseLeave={handleLeave}
>
      
      {/* OUTER SPACING */}
      <div className="px-6 w-full flex justify-center">
        
        {/* CENTER CONTAINER */}
        <div className="max-w-[1200px] w-full mx-auto bg-white border border-[#e5e5e5] shadow-xl overflow-hidden">

          {/* ================= PRODUCTS ================= */}
          {type === "products" && (
            <div className="p-6 text-2xl" >
              <TrendingProducts
                products={productsData}
                limit={6}
                showTabs={true}
                hideHeading={true}
                tabsList={["bracelets", "rings"]}
                simpleTabs={true}
                spacing="pt-0"
                fullWidth={true}
              />
            </div>
          )}

          {/* ================= CATEGORIES ================= */}
          {type === "categories" && (
            <div className="grid grid-cols-2 gap-6">

              {/* LEFT */}
              <div className="grid grid-cols-3 gap-6 p-6">
                {categories.map((category) => (
                  <div key={category.id}>
                    <p className="text-[18px] font-semibold mb-3 hover:text-[#c19417]">
                      {category.name}
                    </p>

                    <div className="space-y-2">
                      {category.children?.map((child) => (
                        <p
                          key={child.id}
                          className="text-[14px] text-gray-600 hover:text-[#c19417]"
                        >
                          {child.name}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT */}
              <div className="border-l bg-[#f5f3ed] p-6">
                <h3 className="text-[18px] font-semibold mb-4 text-center">
                  Best Selling
                </h3>

                <div className="space-y-4">
                  {bestSellingProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 bg-white p-3">
                      <img
                        src={product.images?.main}
                        className="w-[60px] h-[70px] object-cover"
                      />
                      <div>
                        <p className="text-[14px]">{product.name}</p>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= TOPDEALS ================= */}
          {type === "topdeals" && (

            
     
  <div className="grid grid-cols-2 gap-6 p-6">
        
    {/* LEFT - IMAGES */}
   <div className="flex flex-col gap-5">

  {/* TITLE */}
  <h3 className="text-[18px] font-semibold text-center">
    Top Deals
  </h3>

  {/* GRID */}
  <div className="grid grid-cols-4 gap-x-5 gap-y-5">
    {categoryImages.map((item) => (
      <div
        key={item.id}
        className="group cursor-pointer flex flex-col items-center text-center"
      >
        {/* IMAGE */}
        <div className="w-[130px] h-[130px] rounded-full overflow-hidden border-4 border-[#f5f3ed] bg-white flex items-center justify-center transition-colors duration-300 group-hover:border-[#c19417]">
          
          <img
            src={item.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* TEXT */}
        <p className="text-[13px] mt-2 text-black transition-colors duration-300 group-hover:text-[#c19417]">
          {item.name}
        </p>

      </div>
    ))}
  </div>

</div>
    {/* RIGHT - TOP DEALS (reuse bestSellingProducts or custom) */}
    <div className="border-l bg-[#f5f3ed] p-6">
                <h3 className="text-[18px] font-semibold mb-4 text-center">
                  Top Rated
                </h3>

                <div className="space-y-4">
                  {bestSellingProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 bg-white p-3">
                      <img
                        src={product.images?.main}
                        className="w-[60px] h-[70px] object-cover"
                      />
                      <div>
                        <p className="text-[14px]">{product.name}</p>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

  </div>
  
)}


{/* ================= SHOP ================= */}
{type === "shop" && (
  <div className="grid grid-cols-4 gap-6 p-6">

    {/* 3 COLUMNS */}
    {shop.map((col, i) => (
      <div key={i}>
        <h3 className="text-[16px] font-semibold mb-4">
          {col.heading}
        </h3>

        <div className="space-y-2">
          {col.items.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex items-center gap-2 text-[14px] text-[#666] hover:text-[#c19417]"
            >
              {item.label}

              {/* BADGE */}
              {item.badge && (
  <span
    className={`text-[10px] px-2 py-[2px] rounded font-medium ${
      badgeStyles[item.badge] || "bg-gray-100 text-gray-600"
    }`}
  >
    {item.badge}
  </span>
)}
            </Link>
          ))}
        </div>
      </div>
    ))}

    {/* IMAGE COLUMN */}
    <div className="relative flex">
  
  {/* IMAGE */}
  <img
    src="/shop-banner-2.jpg"
    className="w-full object-cover"
    alt="shop"
  />

  {/* OVERLAY CONTENT */}
  <div className="absolute inset-0 flex flex-col justify-center px-6">
    
    {/* OFF TEXT */}
    <p className="text-white bg-yellow-500 inline-block px-3 py-1 text-[14px] font-medium uppercase w-fit">
      Up to 30% off
    </p>

    {/* HEADING */}
    <h2 className="text-[22px] font-medium text-black mt-3">
      Finger Ring For Women
    </h2>

    {/* BUTTON */}
    <button className="mt-4 text-[15px] font-medium text-black underline w-fit">
      Shop Now
    </button>

  </div>

</div>

  </div>
)}
        </div>
      </div>
    </div>
  );
}