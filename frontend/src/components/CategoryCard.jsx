import React from "react";

export default function CategoryCard({ category }) {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-full transition duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-[160x] h-[160px] object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="pt-4 text-center">
        <h3 className="text-[17px] font-medium text-gray-900">
          {category.name}
        </h3>
      </div>
    </div>
  );
}