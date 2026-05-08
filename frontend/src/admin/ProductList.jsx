import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/product";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    console.log(res);
    setProducts(res.data.data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
  <div className="min-h-screen bg-bg py-10">

    <div className="max-w-7xl mx-auto px-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-12">

        <div>
          <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
            Jewelry Admin
          </p>

          <h1
            className="text-4xl text-dark-text font-heading"
            
          >
            Product Collection
          </h1>

          <p className="text-text-light text-sm mt-2">
            Manage your luxury jewellery inventory
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-primary-gold-accent hover:hover-bg text-white px-6 py-3 rounded-full transition-all shadow-sm"
        >
          + Add Product
        </button>

      </div>

      {/* LIST */}
      {products.length > 0 ? (
        <div className="space-y-6">

          {products.map((p) => (
            <div
              key={p._id}
              className="group bg-white border border-border-1 rounded-4xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >

              <div className="flex flex-col lg:flex-row gap-6">

                {/* IMAGE */}
                <div className="relative w-full lg:w-70 h-65 overflow-hidden rounded-[28px] bg-[#F3F1EC] shrink-0">

                  <img
                    src={p.images?.[0] || "https://via.placeholder.com/300"}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {p.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-discount text-xs px-4 py-1.5 rounded-full shadow-sm border border-red-100">
                      {p.discount}% OFF
                    </div>
                  )}

                </div>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col justify-between">

                  {/* TOP */}
                  <div>

                    {/* CATEGORY + VARIANTS */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">

                      <span className="bg-bg-4 text-text-3 text-xs px-4 py-1.5 rounded-full">
                        {p.category?.name || "No Category"}
                      </span>

                      <span className="bg-bg-5 text-gray-500 text-xs px-4 py-1.5 rounded-full border border-gray-200">
                        {p.variants?.length || 0} Variants
                      </span>

                    </div>

                    {/* NAME */}
                    <h2
                      className="text-3xl text-dark-text leading-tight font-heading"
                      
                    >
                      {p.name}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-text-4 text-sm leading-7 mt-4 max-w-3xl">
                      {p.description}
                    </p>

                  </div>

                  {/* BOTTOM */}
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mt-8">

                    {/* PRICE */}
                    <div>

                      <p className="text-xs uppercase tracking-[3px] text-text-5 mb-1">
                        Product Price
                      </p>

                      <div className="flex items-center gap-3">

                        <span className="text-3xl font-semibold text-primary-gold-accent">
                          ${p.basePrice || p.price || "—"}
                        </span>

                        {p.discount > 0 && (
                          <span className="text-sm text-gray-400 line-through">
                            $
                            {Math.round(
                              (p.basePrice || p.price) +
                              ((p.basePrice || p.price) * p.discount) / 100
                            )}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          navigate(`/admin/products/edit/${p.slug}`)
                        }
                        className="px-5 py-2.5 rounded-full border border-border-3 text-text-3 hover:bg-primary-gold-accent hover:text-white transition-all"
                      >
                        Edit Product
                      </button>

                      <button
                        onClick={() => handleDelete(p.slug)}
                        className="px-5 py-2.5 rounded-full border border-red-100 text-red-400 hover:bg-red-50 transition-all"
                      >
                        Delete
                      </button>

    
                    <span className="bg-bg-5 text-gray-500 text-xs px-4 py-1.5 rounded-full border border-gray-200">
                        {p.stock} stock
                      </span>


                    </div>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="bg-white border border-border-1 rounded-4xl py-24 text-center shadow-sm">

          <div className="text-6xl mb-5">
            💍
          </div>

          <h3
            className="text-3xl text-dark-text font-heading"
            
          >
            No Products Found
          </h3>

          <p className="text-text-6 text-sm mt-3">
            Start building your luxury jewellery collection.
          </p>

        </div>
      )}

    </div>
  </div>
);
}