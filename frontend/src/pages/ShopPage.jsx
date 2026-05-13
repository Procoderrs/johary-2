import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/product";
import { getFilters } from "../api/filter";
import { getCategories } from "../api/category";

export default function ShopPage() {
  const { categorySlug } = useParams();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("newest");

  // Active filters
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    metalType: [],
    stoneType: [],
    brand: [],
    minPrice: 0,
    maxPrice: 2000,
    rating: null,
  });

  // Load filters aur categories
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const [filtersRes, catsRes] = await Promise.all([
          getFilters(),
          getCategories(),
        ]);
        setFilters(filtersRes.data.data || {});
        setCategories(catsRes.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    loadMeta();
  }, []);

  // Category slug se auto filter
  useEffect(() => {
    if (categorySlug && categories.length > 0) {
      // Parent category dhundho
      const parent = categories.find(c => c.slug === categorySlug);
      if (parent) {
        setActiveFilters(prev => ({ ...prev, category: [parent._id] }));
        return;
      }

      // Sub category dhundho
      for (const cat of categories) {
        const child = cat.children?.find(c => c.slug === categorySlug);
        if (child) {
          setActiveFilters(prev => ({ ...prev, category: [child._id] }));
          return;
        }
      }
    }
  }, [categorySlug, categories]);

  // Products load karo
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        sort,
        maxPrice: activeFilters.maxPrice,
      };

      if (activeFilters.category.length > 0)
        params.category = activeFilters.category.join(",");
      if (activeFilters.metalType.length > 0)
        params.metalType = activeFilters.metalType.join(",");
      if (activeFilters.stoneType.length > 0)
        params.stoneType = activeFilters.stoneType.join(",");
      if (activeFilters.brand.length > 0)
        params.brand = activeFilters.brand.join(",");
      if (activeFilters.rating)
        params.rating = activeFilters.rating;
      if (activeFilters.minPrice > 0)
        params.minPrice = activeFilters.minPrice;

      const res = await getAllProducts(params);
      setProducts(res.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [activeFilters, sort]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section className="w-full font-user">
      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold">Shop</h1>
          <p className="text-sm text-gray-600">Home / Shop</p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

          {/* FILTERS */}
          <ProductFilters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            filters={filters}
            categories={categories}
          />

          {/* PRODUCTS */}
          <div>
            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-black">{products.length}</span> products
              </p>

              <div className="flex items-center gap-4">
                {/* SORT */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                {/* VIEW TOGGLE */}
                <div className="flex items-center gap-2">
                  <button onClick={() => setView("grid")} className={view === "grid" ? "opacity-100" : "opacity-40"}>
                    <div className="flex flex-col gap-[3px]">
                      <span className="w-5 h-[2px] bg-black block"></span>
                      <span className="w-5 h-[2px] bg-black block"></span>
                      <span className="w-5 h-[2px] bg-black block"></span>
                    </div>
                  </button>
                  <button onClick={() => setView("list")} className={view === "list" ? "opacity-100" : "opacity-40"}>
                    <div className="flex gap-[3px]">
                      <span className="w-[2px] h-5 bg-black block"></span>
                      <span className="w-[2px] h-5 bg-black block"></span>
                      <span className="w-[2px] h-5 bg-black block"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading products...</div>
            ) : products.length > 0 ? (
              <div className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                  : "flex flex-col gap-6"
              }>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} view={view} />
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