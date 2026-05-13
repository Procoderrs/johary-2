import { createPortal } from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiCloseLine, RiStarFill, RiStarHalfFill, RiStarLine } from "@remixicon/react";
import { useCart } from "../context/CartContext";

export default function QuickViewModal({ product, onClose }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedCombination, setSelectedCombination] = useState({});

  const { addToCart ,setIsCartOpen} = useCart();

  if (!product) return null;

  // Variant keys (e.g. "color", "size", "metal")
  const variantKeys = product.variants?.length > 0
    ? Object.keys(product.variants[0].combination || {})
    : [];

  // Selected combination

  // Price from selected variant
  const matchedVariant = product.variants?.find((v) => {
    if (!v.combination) return false;
    return variantKeys.every(
      (key) => v.combination[key] === selectedCombination[key]
    );
  });

  const displayPrice = matchedVariant?.price || product.price;

  // Stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<RiStarFill key={i} size={16} className="text-[#c19417]" />);
      else if (rating >= i - 0.5) stars.push(<RiStarHalfFill key={i} size={16} className="text-[#c19417]" />);
      else stars.push(<RiStarLine key={i} size={16} className="text-[#c19417]" />);
    }
    return stars;
  };

  // Unique options per key
  const getOptions = (key) => {
    const opts = new Set();
    product.variants?.forEach((v) => {
      if (v.combination?.[key]) opts.add(v.combination[key]);
    });
    return Array.from(opts);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, matchedVariant || null);
    setIsCartOpen(true);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center font-user justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <RiCloseLine size={20} />
        </button>

        {/* LEFT — IMAGES */}
        <div className="w-full md:w-[45%] bg-[#f8f8f8] flex flex-col">
          <div className="relative flex-1 min-h-[300px] flex items-center justify-center p-6">
            <img
              src={product.images?.[currentImg] || "/placeholder.jpg"}
              alt={product.name}
              className="max-h-[320px] object-contain w-full"
            />
            {/* Prev */}
            {product.images?.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImg((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentImg((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 pb-4">
            {product.images?.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`w-2 h-2 rounded-full transition ${
                  currentImg === i ? "bg-[#c19417]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="flex-1 p-6 overflow-y-auto">

          {/* NAME */}
          <h2 className="text-xl font-medium text-gray-900 leading-snug mb-2">
            {product.name}
          </h2>

          {/* STARS */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">{renderStars(product.rating || 0)}</div>
            {product.reviewCount > 0 && (
              <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
            )}
          </div>

          {/* PRICE */}
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            ${displayPrice}
          </p>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            {product.description}
          </p>

          {/* VARIANTS */}
          {variantKeys.map((key) => (
            <div key={key} className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2 capitalize">
                {key}
              </p>
              <div className="flex flex-wrap gap-2">
                {getOptions(key).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedCombination((prev) => ({ ...prev, [key]: opt }))}
                    className={`px-4 py-1.5 text-sm border transition ${
                      selectedCombination[key] === opt
                        ? "border-[#c19417] text-[#c19417] bg-amber-50"
                        : "border-gray-200 text-gray-700 hover:border-[#c19417]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {selectedCombination[key] && (
                <button
                  onClick={() => setSelectedCombination((prev) => { const c = {...prev}; delete c[key]; return c; })}
                  className="text-xs text-gray-400 mt-1 hover:text-gray-600"
                >
                  × Clear
                </button>
              )}
            </div>
          ))}

          {/* STOCK */}
          <div className="mb-5">
            <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {/* QTY + ADD TO CART */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-500 hover:bg-gray-50"
              >−</button>
              <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-500 hover:bg-gray-50"
              >+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#c19417] hover:bg-black text-white text-sm font-medium uppercase tracking-wider transition"
            >
              Add to Cart
            </button>
          </div>

          {/* BUY NOW */}
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="block w-full bg-gray-900 hover:bg-black text-white text-sm font-medium uppercase tracking-wider py-3 text-center transition"
          >
            Buy Now
          </Link>

          {/* SKU + CATEGORY */}
          <div className="mt-5 space-y-1 text-xs text-gray-400">
            <p>SKU: {product.slug?.toUpperCase().slice(0, 10)}</p>
            <p>
              Categories:{" "}
              <span className="text-[#c19417]">
                {product.category?.name || "—"}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}