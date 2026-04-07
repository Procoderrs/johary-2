import React from "react";
import { Link } from "react-router-dom";

export default function MegaMenu({ categories = [] }) {
  return (
    <div className="absolute top-full z-50 hidden min-w-[700px] -translate-x-1/2 bg-white border border-[#e5e5e5] shadow-xl px-10 py-8 group-hover:grid grid-cols-4 gap-8">
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
  );
}