import React from "react";
import { Link } from "react-router-dom";
import { getCategories } from '../../api/category';
import { getAllProducts } from '../../api/product';
import { shop } from "../../data/shop";
import { useState, useRef, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';

export default function MegaMenu({
  bestSellingProducts = [],
  type = "categories",
  categoryImages = [],
  headerHeight = 0,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeProductTab, setActiveProductTab] = useState(null);

  
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

  // pehla tab default active
  


// ✅ yeh lagao — same queryKey isliye cache se aayega, API call nahi hogi!
const { data: categories = [] } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories().then(r => r.data?.data || []),
});

const { data: allProducts = [] } = useQuery({
  queryKey: ['all-products'],
  queryFn: () => getAllProducts({ limit: 20 }).then(r => r.data?.data || []),
});

useEffect(() => {
  if (categories.length > 0) {
    setActiveProductTab(String(categories[3]._id));
  }
}, [categories]);
const fetureProducts = allProducts.slice(0, 4);

  const badgeStyles = {
    NEW: "bg-green-100 text-green-700",
    SALE: "bg-orange-100 text-orange-700",
    POPULAR: "bg-amber-100 text-amber-800",
    HOT: "bg-pink-100 text-pink-700",
    FEATURED: "bg-rose-100 text-rose-700",
  };

  // tab ke hisaab se products filter
  const filteredByTab = allProducts
    .filter((p) => {
      const catId = String(p.category?._id || p.category || "");
      const parentId = String(p.category?.parentId?._id || "");
      const activeTab = activeProductTab || categories[0]?._id;
      return catId === String(activeTab) || parentId === String(activeTab);
    })
    .slice(2, 4);

  return (
    <div
      className="absolute top-full font-user left-0 right-0 flex justify-center w-full z-[999]"
      onMouseEnter={() => handleEnter(type === "products" ? "Products" : "Categories")}
      onMouseLeave={handleLeave}
    >
      <div className="px-6 w-full flex justify-center">
        <div className="max-w-[1200px] w-full mx-auto bg-white  shadow-xl overflow-hidden">

        {/* ================= PRODUCTS ================= */}



{/* ================= PRODUCTS ================= */}
{type === "products" && (
  <div className="p-6">

   
    {/* TABS */}
<div className="flex items-center justify-center gap-4 ">
  {categories.slice(2, 4).map((cat, i) => {
    const isActive = activeProductTab === cat._id || (!activeProductTab && i === 0);
    return (
      <>
        {i !== 0 && (
          <span key={`sep-${i}`} className="text-gray-300 mb-2 text-[20px]">|</span>
        )}
        <button
          key={cat._id}
          onClick={() => setActiveProductTab(cat._id)}
          className={`text-[22px] font-medium transition pb-2  ${
            isActive
              ? "border-[#c19417] text-[#c19417]"
              : "border-transparent text-black hover:text-[#c19417]"
          }`}
        >
          {cat.name}
        </button>
      </>
    );
  })}
</div>

    {/* PRODUCTS — tab filter same as TrendingProducts */}
    {(() => {
      const activeTab = activeProductTab || String(categories[0]?._id);
const filtered = allProducts.filter((item) => {
  const parentId = String(item.category?.parentId?._id || "");
  const catId = String(item.category?._id || "");
  return parentId === String(activeTab) || catId === String(activeTab);
}).slice(0, 4);

      return filtered.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {filtered.map((product) => (
            <Link key={product._id} to={`/product/${product.slug}`} className="group">
              <div className="overflow-hidden bg-[#f8f8f8] h-[300px] mb-3">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <p className=" text-gray-800 line-clamp-2  transition leading-snug mb-1">
                {product.name}
              </p>
              <div className="flex items-center gap-0.5 mb-1">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className={`text-[16px] ${star <= Math.round(product.rating || 0) ? "text-[#c19417]" : "text-gray-300"}`}>★</span>
                ))}
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {product.variants?.length > 0
                  ? (() => {
                      const prices = product.variants.map(v => Number(v.price)).filter(p => p > 0);
                      const min = Math.min(...prices);
                      const max = Math.max(...prices);
                      return min === max ? `$${min}` : `$${min} – $${max}`;
                    })()
                  : `$${product.price}`
                }
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm py-8">No products in this category</p>
      );
    })()}

  </div>
)}

          {/* ================= CATEGORIES ================= */}
          {type === "categories" && (
            <div className="flex">

              {/* LEFT — categories */}
              <div className="flex-1 p-8 grid grid-cols-3 gap-x-8 gap-y-8">
                {categories.map((cat) => (
                  <div key={cat._id}>
                    <Link
                      to={`/shop/${cat.slug}`}
                      className="text-[14px] font-bold uppercase tracking-wide text-gray-900 hover:text-[#c19417] block mb-3"
                    >
                      {cat.name}
                    </Link>
                    <div className="space-y-2">
                      {cat.children?.map((child) => (
                        <Link
                          key={child._id}
                          to={`/shop/${child.slug}`}
                          className="text-[13px] text-gray-500 hover:text-[#c19417] block leading-relaxed"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT — Best Selling */}
              <div className="flex-1 bg-[#f5f3ed] p-6 border-l border-[#e8e4da]">
                <h3 className="text-[16px] font-bold uppercase tracking-widest text-gray-900 mb-5 text-center">
                  Best Selling
                </h3>
                <div className="space-y-3">
                  {fetureProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product.slug}`}
                      className="flex gap-3 bg-white p-3 hover:shadow-md transition group"
                    >
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        className="w-[55px] h-[65px] object-cover flex-shrink-0"
                        alt={product.name}
                      />
                      <div className="min-w-0 flex flex-col justify-center">
                        <p className="text-[12px] text-gray-700 line-clamp-2 group-hover:text-[#c19417] transition leading-snug">
                          {product.name}
                        </p>
                        <p className="font-semibold text-[#c19417] text-[13px] mt-1">
                          {product.variants?.length > 0
                            ? (() => {
                                const prices = product.variants.map(v => Number(v.price)).filter(p => p > 0);
                                const min = Math.min(...prices);
                                const max = Math.max(...prices);
                                return min === max ? `$${min}` : `$${min} – $${max}`;
                              })()
                            : `$${product.price}`
                          }
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          )}

          
         {/* ================= TOPDEALS ================= */}
{type === "topdeals" && (
  <div className="grid grid-cols-2 gap-6 p-6">

    {/* LEFT — sub-categories (children) circles */}
    <div className="flex flex-col gap-5">
      <h3 className="text-[18px] font-semibold text-center">Shop By</h3>
      <div className="grid grid-cols-4 gap-x-5 gap-y-5">
        {/* Sab categories ke children flat karke dikhao */}
        {categories
          .flatMap(cat => cat.children || [])
          .slice(0, 8)
          .map((child) => (
            <Link
              key={child._id}
              to={`/shop/${child.slug}`}
              className="group cursor-pointer flex flex-col gap-x-5 gap-y-8 items-center text-center"
            >
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-[#f5f3ed] bg-white flex items-center justify-center transition-colors duration-300 group-hover:border-[#c19417]">
                <img
                  src={child.image || "/placeholder.jpg"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  alt={child.name}
                />
              </div>
              <p className=" mt-2 text-black  transition">
                {child.name}
              </p>
            </Link>
          ))}
      </div>
    </div>

    {/* RIGHT — products */}
    <div className="border-l bg-[#f5f3ed] ">
      <div className="p-6">

     
      <h3 className="text-[18px] font-semibold mb-4 text-center">Top Rated</h3>
      <div className="space-y-4">
        {fetureProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product.slug}`}
            className="flex gap-4 bg-white p-3 hover:shadow-md transition"
          >
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              className="w-[60px] h-[70px] object-cover flex-shrink-0"
              alt={product.name}
            />
            <div className="min-w-0">
              <p className=" line-clamp-2">{product.name}</p>
              <p className="font-semibold text-[#c19417] mt-1">
                {product.variants?.length > 0
                  ? (() => {
                      const prices = product.variants.map(v => Number(v.price)).filter(p => p > 0);
                      const min = Math.min(...prices);
                      const max = Math.max(...prices);
                      return min === max ? `$${min}` : `$${min} – $${max}`;
                    })()
                  : `$${product.price}`
                }
              </p>
            </div>
          </Link>
        ))}
      </div>
       </div>
    </div>

  </div>
)}

          {/* ================= SHOP ================= */}
          {type === "shop" && (
            <div className="grid grid-cols-4 gap-6 p-6">

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
                <img
                  src="/shop-banner-2.jpg"
                  className="w-full object-cover"
                  alt="shop"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-6">
                  <p className="text-white bg-yellow-500 inline-block px-3 py-1 text-[14px] font-medium uppercase w-fit">
                    Up to 30% off
                  </p>
                  <h2 className="text-[22px] font-medium text-black mt-3">
                    Finger Ring For Women
                  </h2>
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
