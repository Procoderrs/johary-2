import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishListContext";
import { RiCloseLine } from "@remixicon/react";

export default function WishlistPopup({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
          <h3 className="text-white font-medium text-base">
            Wishlist ({wishlist.length})
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition"
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        {/* LIST */}
        <div className="overflow-y-auto flex-1">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🤍</p>
              <p className="text-gray-500 text-sm">No items in wishlist yet</p>
            </div>
          ) : (
            wishlist.map((product, index) => {

              // price calculate
              const hasVariants = product.variants?.length > 0;
              const prices = hasVariants
                ? product.variants.map(v => Number(v.price)).filter(p => p > 0)
                : [];
              const minPrice = prices.length > 0 ? Math.min(...prices) : product.price;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : product.price;

              return (
                <div
                  key={product._id}
                  className={`flex items-center gap-4 px-6 py-5 ${
                    index !== wishlist.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-gray-400 hover:text-gray-700 transition flex-shrink-0"
                  >
                    <RiCloseLine size={18} />
                  </button>

                  {/* IMAGE */}
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-50 border border-gray-100">
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
                      onClick={onClose}
                      className="text-[#c19417] font-semibold text-sm hover:underline line-clamp-2 leading-snug"
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
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <p className="text-xs text-gray-500">
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="bg-[#c19417] hover:bg-black text-white text-xs px-6 py-2.5 font-medium tracking-wider uppercase transition"
                    >
                      {hasVariants ? "Select Options" : "Add to Cart"}
                    </Link>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            to="/wishlist"
            onClick={onClose}
            className="text-xs text-[#c19417] font-semibold uppercase tracking-wider hover:underline"
          >
            Open Wishlist Page
          </Link>
          <button
            onClick={onClose}
            className="text-xs text-gray-500 font-semibold uppercase tracking-wider hover:text-black transition"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}