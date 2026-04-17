import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import { productsData } from "../data/product";
import { categoriesData } from "../data/categories";

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

export default function ShopPage() {
  const location = useLocation();
  const { categorySlug } = useParams();

  const [filters, setFilters] = useState(defaultFilters);
  const [view, setView] = useState("grid"); // 👈 important

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("shop")) return "Shop";
    return "Page";
  };

  useEffect(() => {
    if (categorySlug) {
      const categorySlugs = categoriesData.map((cat) => cat.slug);
      const subCategorySlugs = categoriesData.flatMap((cat) =>
        cat.children?.map((child) => child.slug) || []
      );

      if (categorySlugs.includes(categorySlug)) {
        setFilters((prev) => ({
          ...prev,
          categories: [categorySlug],
          subCategories: [],
        }));
      } else if (subCategorySlugs.includes(categorySlug)) {
        setFilters((prev) => ({
          ...prev,
          categories: [],
          subCategories: [categorySlug],
        }));
      }
    }
  }, [categorySlug]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      return (
        (filters.categories.length === 0 ||
          filters.categories.includes(product.category)) &&
        (filters.subCategories.length === 0 ||
          filters.subCategories.includes(product.subCategory)) &&
        (filters.highlights.length === 0 ||
          filters.highlights.includes(product.highlight)) &&
        (filters.carats.length === 0 ||
          filters.carats.includes(product.carat)) &&
        (filters.metals.length === 0 ||
          filters.metals.includes(product.metal)) &&
        (filters.stones.length === 0 ||
          filters.stones.includes(product.stone)) &&
        (filters.brands.length === 0 ||
          filters.brands.includes(product.brand)) &&
        (filters.ratings.length === 0 ||
          filters.ratings.some((r) => product.rating >= r)) &&
        product.price <= filters.maxPrice
      );
    });
  }, [filters]);

  return (
    <section className="w-full font-body">
      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold">{getTitle()}</h1>
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

          {/* FILTER */}
          <ProductFilters filters={filters} setFilters={setFilters} />

          {/* PRODUCTS */}
          <div>
            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-black">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              {/* VIEW TOGGLE */}
              <div className="flex items-center gap-3">
                {/* GRID */}
                <button onClick={() => setView("grid")}>
                  <div className={`flex flex-col gap-[3px] ${view === "grid" ? "opacity-100" : "opacity-40"}`}>
                    <span className="w-5 h-[2px] bg-black"></span>
                    <span className="w-5 h-[2px] bg-black"></span>
                    <span className="w-5 h-[2px] bg-black"></span>
                  </div>
                </button>

                {/* LIST */}
                <button onClick={() => setView("list")}>
                  <div className={`flex gap-[3px] ${view === "list" ? "opacity-100" : "opacity-40"}`}>
                    <span className="w-[2px] h-5 bg-black"></span>
                    <span className="w-[2px] h-5 bg-black"></span>
                    <span className="w-[2px] h-5 bg-black"></span>
                  </div>
                </button>
              </div>
            </div>

            {/* PRODUCTS GRID / LIST */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    view={view} // 👈 important
                  />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 rounded-3xl py-20 text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}