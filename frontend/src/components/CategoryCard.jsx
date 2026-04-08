import React from "react";

export default function CategoryCard({ category }) {
  return (
    <div className="group cursor-pointer flex flex-col items-center text-center">
      <div className="overflow-hidden rounded-full transition duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-[135px] h-[135px] object-cover group-hover:scale-105 transition duration-500 mx-auto"
        />
      </div>

      <div className="pt-4 w-full">
        <h3 className="text-[17px] font-medium text-gray-900 text-center">
          {category.name}
        </h3>
      </div>
    </div>
  );
}