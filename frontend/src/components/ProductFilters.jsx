import React from "react";
import { filterOptions } from "../data/filteroptions";

const defaultFilters = {
  categories: [],
  subCategories: [],
  highlights: [],
  carats: [],
  metals: [],
  stones: [],
  brands: [],
  ratings: [],
  maxPrice: 500,
};

export default function ProductFilters({ filters, setFilters }) {
  const handleCheckbox = (key, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[key].includes(value);

      return {
        ...prev,
        [key]: alreadySelected
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value],
      };
    });
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: Number(e.target.value),
    }));
  };

  const FilterGroup = ({ title, keyName, options }) => (
    <div className="border border-gray-200 rounded-2xl p-5">
      <h3 className="text-[16px] font-semibold text-black mb-4">{title}</h3>

      <div className="space-y-3">
        {options.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 cursor-pointer text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={filters[keyName].includes(item.value)}
              onChange={() => handleCheckbox(keyName, item.value)}
              className="w-4 h-4 accent-black"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <FilterGroup
        title="Filter by Categories"
        keyName="categories"
        options={filterOptions.categories}
      />
<FilterGroup
  title="Filter by Sub Categories"
  keyName="subCategories"
  options={filterOptions.subCategories}
/>
      <FilterGroup
        title="Highlights"
        keyName="highlights"
        options={filterOptions.highlights}
      />

      <FilterGroup
        title="Filter by Carat"
        keyName="carats"
        options={filterOptions.carats}
      />

      <FilterGroup
        title="Choice of Metal"
        keyName="metals"
        options={filterOptions.metals}
      />

      <FilterGroup
        title="Choice of Stone"
        keyName="stones"
        options={filterOptions.stones}
      />

      <FilterGroup
        title="Brands"
        keyName="brands"
        options={filterOptions.brands}
      />

      <FilterGroup
        title="Rating"
        keyName="ratings"
        options={filterOptions.ratings}
      />

      {/* Price */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <h3 className="text-[16px] font-semibold text-black mb-4">
          Filter by Price
        </h3>

        <input
          type="range"
          min="100"
          max="500"
          step="10"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />

        <div className="mt-3 text-sm text-gray-600">
          Max Price:{" "}
          <span className="font-medium text-black">${filters.maxPrice}</span>
        </div>
      </div>

      {/* Clear Button */}
      <button
        onClick={() => setFilters(defaultFilters)}
        className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-[#c19417] transition duration-300"
      >
        Clear Filters
      </button>
    </div>
  );
}