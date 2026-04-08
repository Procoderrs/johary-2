import React from "react";
import { Link } from "react-router-dom";

export default function MegaMenu({
  categories = [],
  bestSellingProducts = [],
}) {
  return (
    <div className="absolute top-full left-1/2 z-50 hidden min-w-[950px] -translate-x-1/2 bg-white border border-[#e5e5e5] shadow-xl px-10 py-8 group-hover:grid grid-cols-5 gap-10">
      
      {/* LEFT SIDE - Categories */}
      <div className="col-span-3 grid grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id}>
            {/* Parent Category */}
            <Link
              to={`/shop/${category.slug}`}
              className="block text-[15px] font-semibold text-[#111111] mb-4 hover:text-[#c19417] transition duration-300"
            >
              {category.name}
            </Link>

            {/* Child Categories */}
            <div className="space-y-2">
              {category.children?.map((child) => (
                <Link
                  key={child.id}
                  to={`/shop/${child.slug}`}
                  className="block text-[13px] text-[#666666] hover:text-[#c19417] transition duration-300"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - Best Selling */}
      <div className="col-span-2 border-l border-[#e5e5e5] pl-8">
        <h3 className="text-[15px] font-semibold text-[#111111] mb-5">
          Best Selling
        </h3>

        <div className="space-y-4">
          {bestSellingProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="flex items-center gap-4 group/product"
            >
              {/* Image */}
              <div className="w-[70px] h-[80px] bg-[#f8f8f8] overflow-hidden shrink-0">
                <img
                  src={product.images?.main}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover/product:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div>
                <h4 className="text-[13px] text-[#111111] leading-[1.5] mb-1 group-hover/product:text-[#c19417] transition duration-300">
                  {product.name}
                </h4>

                <p className="text-[14px] font-semibold text-[#111111]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}