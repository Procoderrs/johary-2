import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileNavItem({
  item,
  categories,
  bestSellingProducts,
  categoryImages,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-3">

      {/* MAIN ITEM */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{item.label}</span>
        {item.icon && <item.icon />}
      </div>

      {/* ================= CATEGORIES ================= */}
     {open && item.label === "Categories" && (
  <div className="mt-3 pl-3 pr-2 space-y-4 max-h-[300px] overflow-y-auto">

    {categories.map((cat) => (
      <div key={cat.id} className="space-y-2">
        
        <p className="font-semibold text-[14px]">
          {cat.name}
        </p>

        <div className="space-y-1">
          {cat.children?.map((child) => (
            <Link
              key={child.id}
              to={`/shop/${child.slug}`}
              className="block text-[13px] text-gray-600 pl-2"
            >
              {child.name}
            </Link>
          ))}
        </div>

      </div>
    ))}

  </div>
)}

      {/* ================= PRODUCTS ================= */}
      {open && item.label === "Products" && (
  <div className="mt-3 overflow-x-auto">

    <div className="flex gap-4 min-w-max px-1">

      {bestSellingProducts.map((product) => (
        <div
          key={product.id}
          className="min-w-[120px] bg-white border p-2"
        >
          <img
            src={product.images?.main}
            className="w-full h-[100px] object-cover"
          />

          <p className="text-[12px] mt-2 line-clamp-2">
            {product.name}
          </p>

          <p className="font-semibold text-[13px]">
            ${product.price}
          </p>
        </div>
      ))}

    </div>

  </div>
)}

      {/* ================= TOP DEALS ================= */}
    {open && item.label === "Top Deals" && (
  <div className="mt-3 space-y-5">

    {/* LEFT BLOCK */}
    <div>
      <h4 className="text-sm font-semibold mb-2">Top Deals</h4>

      <div className="grid grid-cols-4 gap-3">
        {categoryImages.slice(0, 4).map((item) => (
          <div key={item.id} className="text-center">

            <div className="w-[60px] h-[60px] mx-auto rounded-full overflow-hidden border border-[#f5f3ed]">
              <img
                src={item.image}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-[11px] mt-1">
              {item.name}
            </p>

          </div>
        ))}
      </div>
    </div>

    {/* RIGHT BLOCK */}
    <div>
      <h4 className="text-sm font-semibold mb-2">Top Rated</h4>

      <div className="grid grid-cols-4 gap-3">
        {categoryImages.slice(4, 8).map((item) => (
          <div key={item.id} className="text-center">

            <div className="w-[60px] h-[60px] mx-auto rounded-full overflow-hidden border border-[#f5f3ed]">
              <img
                src={item.image}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-[11px] mt-1">
              {item.name}
            </p>

          </div>
        ))}
      </div>
    </div>

  </div>
)}

    </div>
  );
}