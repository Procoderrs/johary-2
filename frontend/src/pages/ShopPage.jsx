import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { categorySlug } = useParams();
  const [filters, setFilters] = useState(defaultFilters);

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
  } else {
    setFilters((prev) => ({
      ...prev,
      categories: [],
      subCategories: [],
    }));
  }
}, [categorySlug]);
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      const matchSubCategory =
        filters.subCategories.length === 0 ||
        filters.subCategories.includes(product.subCategory);

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
        matchSubCategory &&
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
    <section className="w-full">
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          alt="Breadcrumb"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[28px] font-semibold text-[#111111] max-w-3xl leading-tight capitalize">
            {categorySlug ? categorySlug.replaceAll("-", " ") : "Shop"}
          </h1>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[4px] text-[#c19417] mb-2">
            Our Collection
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 capitalize">
            {categorySlug
              ? `${categorySlug.replaceAll("-", " ")} Collection`
              : "Shop Products"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          <div>
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-black">
                  {filteredProducts.length}
                </span>{" "}
                products
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
      </div>
    </section>
  );
}