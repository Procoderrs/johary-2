import React from "react";
import { Link } from "react-router-dom";

export default function MegaMenu({
  categories = [],
  bestSellingProducts = [],
}) {
  return (
    <div className="absolute top-full -left-96 z-50 hidden group-hover:grid w-[1200px] max-w-[calc(100vw-40px)] bg-white border border-[#e5e5e5] shadow-xl grid-cols-[1fr_1fr] gap-5 overflow-hidden">
      
      {/* LEFT SIDE - Categories */}
      <div className="grid grid-cols-3 px-6 py-8 gap-y-4 min-w-0 pr-2">
        {categories.map((category) => (
          <div key={category.id} className="min-w-0">
            <Link
              to={`/shop/${category.slug}`}
              className="block text-[18px] font-semibold text-[#111111] mb-4 hover:text-[#c19417] transition duration-300 break-words"
            >
              {category.name}
            </Link>

            <div className="space-y-2">
              {category.children?.map((child) => (
                <Link
                  key={child.id}
                  to={`/shop/${child.slug}`}
                  className="block text-[15px] text-[#666666] hover:text-[#c19417] transition duration-300 break-words"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - Best Selling */}
      <div className="min-w-0 border-l border-[#e5e5e5] bg-[#f5f3ed] p-9">
        <h3 className="text-[20px] text-center font-semibold text-[#111111] mb-6">
          Best Selling
        </h3>

        <div className="space-y-4">
          {bestSellingProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="flex items-center gap-4 p-3 group/product min-w-0 bg-white hover:shadow-sm transition duration-300"
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
              <div className="min-w-0">
                <h4 className="text-[15px] text-[#111111] leading-[1.5] mb-1 group-hover/product:text-[#c19417] transition duration-300 break-words">
                  {product.name}
                </h4>

                <p className="text-[18px] font-semibold text-[#111111]">
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