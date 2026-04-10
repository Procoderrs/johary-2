import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileNavItem({ item, categories }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-3">

      {/* Main Item */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{item.label}</span>
        {item.icon && <item.icon />}
      </div>

      {/* Dropdown */}
      {open && item.label === "Categories" && (
        <div className="mt-2 pl-4 space-y-3">

          {categories.map((cat) => (
            <div key={cat.id}>
              <p className="font-semibold">{cat.name}</p>

              {cat.children?.map((child) => (
                <Link
                  key={child.id}
                  to={`/shop/${child.slug}`}
                  className="block text-sm text-gray-600 ml-2"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}