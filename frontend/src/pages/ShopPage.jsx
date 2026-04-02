import React, { useMemo, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/Productcard";
import { productsData } from "../data/product";

export default function ShopPage() {
  const [filters, setFilters] = useState({
    categories: [],
    highlights: [],
    carats: [],
    metals: [],
    stones: [],
    brands: [],
    ratings: [],
    maxPrice: 500,
  });

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      const matchHighlight =
        filters.highlights.length === 0 ||
        filters.highlights.includes(product.highlight);

      const matchCarat =
        filters.carats.length === 0 ||
        filters.carats.includes(product.carat);

      const matchMetal =
        filters.metals.length === 0 ||
        filters.metals.includes(product.metal);

      const matchStone =
        filters.stones.length === 0 ||
        filters.stones.includes(product.stone);

      const matchBrand =
        filters.brands.length === 0 ||
        filters.brands.includes(product.brand);

      const matchRating =
        filters.ratings.length === 0 ||
        filters.ratings.some((rating) => product.rating >= rating);

      const matchPrice = product.price <= filters.maxPrice;

      return (
        matchCategory &&
        matchHighlight &&
        matchCarat &&
        matchMetal &&
        matchStone &&
        matchBrand &&
        matchRating &&
        matchPrice
      );
    });
  }, [filters]);

  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-16">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[4px] text-[#c19417] mb-2">
          Our Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Shop Products
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Filters */}
        <div>
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-black">{filteredProducts.length}</span> products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-3xl py-20 text-center text-gray-500">
              No products found for selected filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}