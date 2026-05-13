import React from "react";

const defaultFilters = {
  category: [],
  metalType: [],
  stoneType: [],
  brand: [],
  minPrice: 0,
  maxPrice: 2000,
  rating: null,
};

export default function ProductFilters({
  activeFilters,
  setActiveFilters,
  filters,
  categories,
}) {
  const handleCheckbox = (key, value) => {
    setActiveFilters((prev) => {
      const already = prev[key].includes(value);
      return {
        ...prev,
        [key]: already
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const FilterGroup = ({ title, filterKey, items }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="border border-gray-200 rounded-2xl p-5">
        <h3 className="text-[16px] md:text-xl font-semibold text-black mb-4">{title}</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <label key={item._id} className="flex items-center gap-3 cursor-pointer text-[15px] text-[#666]">
              <input
                type="checkbox"
                checked={activeFilters[filterKey]?.includes(item._id) || false}
                onChange={() => handleCheckbox(filterKey, item._id)}
                className="w-4 h-4 accent-black"
              />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Categories flat list
  const allCategories = [];
  categories.forEach((cat) => {
    allCategories.push(cat);
    cat.children?.forEach((child) => allCategories.push(child));
  });

  return (
    <div className="space-y-5">

      {/* CATEGORIES */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <h3 className="text-[16px] md:text-xl font-semibold text-black mb-4">Filter by Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat._id}>
              <label className="flex items-center gap-3 cursor-pointer text-[15px] font-medium text-gray-800">
                <input
                  type="checkbox"
                  checked={activeFilters.category.includes(cat._id)}
                  onChange={() => handleCheckbox("category", cat._id)}
                  className="w-4 h-4 accent-black"
                />
                {cat.name}
              </label>
              {/* Sub categories */}
              {cat.children?.length > 0 && (
                <div className="ml-6 mt-2 space-y-2">
                  {cat.children.map((child) => (
                    <label key={child._id} className="flex items-center gap-3 cursor-pointer text-[14px] text-[#666]">
                      <input
                        type="checkbox"
                        checked={activeFilters.category.includes(child._id)}
                        onChange={() => handleCheckbox("category", child._id)}
                        className="w-4 h-4 accent-black"
                      />
                      {child.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* METAL TYPE */}
      <FilterGroup title="Choice of Metal" filterKey="metalType" items={filters.metal} />

      {/* STONE TYPE */}
      <FilterGroup title="Choice of Stone" filterKey="stoneType" items={filters.stoneType} />

      {/* BRAND */}
      <FilterGroup title="Brands" filterKey="brand" items={filters.brand} />

      {/* RATING */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <h3 className="text-[16px] md:text-xl font-semibold text-black mb-4">Filter by Rating</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer text-[15px] text-[#666]">
              <input
                type="radio"
                name="rating"
                checked={activeFilters.rating === r}
                onChange={() => setActiveFilters(prev => ({ ...prev, rating: r }))}
                className="w-4 h-4 accent-black"
              />
              <span>{"★".repeat(r)}{"☆".repeat(5 - r)} & above</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <h3 className="text-[16px] md:text-xl font-semibold text-black mb-4">Filter by Price</h3>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={activeFilters.maxPrice}
          onChange={(e) => setActiveFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-black"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>$0</span>
          <span className="font-medium text-black">${activeFilters.maxPrice}</span>
        </div>
      </div>

      {/* CLEAR */}
      <button
        onClick={() => setActiveFilters(defaultFilters)}
        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-[#c19417] transition"
      >
        Clear Filters
      </button>

    </div>
  );
}