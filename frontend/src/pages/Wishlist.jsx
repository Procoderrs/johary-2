import { Link } from "react-router-dom";
import { RiCloseLine } from "@remixicon/react";
import { useWishlist } from "../context/WishListContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="font-user">

      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[220px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:text-[#c19417]">Home</Link>
            {" / "}
            <span>Wishlist</span>
          </p>
          <h1 className="text-4xl font-medium text-gray-900">Wishlist</h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className=" mx-auto px-4 py-16">

        {wishlist.length === 0 ? (
          <div className="text-center py-24 border border-gray-100 rounded-xl">
            <p className="text-5xl mb-4">🤍</p>
            <h3 className="text-2xl font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 text-sm mb-6">Save items you love to your wishlist</p>
            <Link
              to="/shop"
              className="bg-[#c19417] text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-black transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (

          <div className="border border-gray-100">
            {wishlist.map((product, index) => {

              const hasVariants = product.variants?.length > 0;
              const prices = hasVariants
                ? product.variants.map(v => Number(v.price)).filter(p => p > 0)
                : [];
              const minPrice = prices.length > 0 ? Math.min(...prices) : product.price;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : product.price;

              return (
                <div
                  key={product._id}
                  className={`flex items-center gap-5 px-6 py-5 ${
                    index % 2 === 1 ? "bg-[#f1efea]" : "bg-white"
                  } ${index !== wishlist.length - 1 ? "border-b border-gray-100" : ""}`}
                >

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-gray-400 hover:text-gray-700 transition flex-shrink-0"
                  >
                    <RiCloseLine size={20} />
                  </button>

                  {/* IMAGE */}
                  <div className="w-20 h-20 flex-shrink-0 bg-white border border-gray-100">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-[#c19417] font-semibold text-[15px] hover:underline line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-700 mt-1">
                      ${minPrice}{minPrice !== maxPrice && ` – $${maxPrice}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(product.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric"
                      })}
                    </p>
                  </div>

                  {/* STOCK + BTN */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <p className="text-sm text-gray-500">
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="bg-[#c19417] hover:bg-black text-white text-xs px-8 py-3 font-medium tracking-widest uppercase transition"
                    >
                      {hasVariants ? "Select Options" : "Add to Cart"}
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        )}
      </div>

    </div>
  );
}