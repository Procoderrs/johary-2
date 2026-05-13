import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  RiStarFill, RiStarHalfFill, RiStarLine,
  RiTruckLine, RiShieldCheckLine, RiAddLine, RiSubtractLine, RiStackLine,
} from "@remixicon/react";
import TrendingProducts from "../components/TrendingProducts";
import { useCart } from "../context/CartContext";
import { getAllProducts } from "../api/product";

export default function ProductDetails({ product }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || "/placeholder.jpg");
  const [selectedCombination, setSelectedCombination] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setSelectedImage(product?.images?.[0] || "/placeholder.jpg");
    setQuantity(1);
    setSelectedCombination({});
  }, [product]);

  // Related products load karo
  useEffect(() => {
    const loadRelated = async () => {
      if (!product?.category?._id) return;
      try {
        const res = await getAllProducts({ category: product.category._id });
        const related = (res.data?.data || []).filter(p => p._id !== product._id).slice(0, 8);
        setRelatedProducts(related);
      } catch (err) {
        console.log(err);
      }
    };
    loadRelated();
  }, [product]);

  // Variant keys
  const variantKeys = product?.variants?.length > 0
    ? Object.keys(product.variants[0].combination || {})
    : [];

  const getOptions = (key) => {
    const opts = new Set();
    product?.variants?.forEach(v => { if (v.combination?.[key]) opts.add(v.combination[key]); });
    return Array.from(opts);
  };

  const matchedVariant = product?.variants?.find(v =>
    variantKeys.every(key => v.combination?.[key] === selectedCombination[key])
  );

  const displayPrice = matchedVariant?.price || product?.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, matchedVariant || null);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, matchedVariant || null);
    navigate("/checkout");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<RiStarFill key={i} size={16} className="text-[#c19417]" />);
      else if (rating >= i - 0.5) stars.push(<RiStarHalfFill key={i} size={16} className="text-[#c19417]" />);
      else stars.push(<RiStarLine key={i} size={16} className="text-[#c19417]" />);
    }
    return stars;
  };

  const featureData = [
    { icon: RiShieldCheckLine, heading: "101% Original" },
    { icon: RiStackLine, heading: "Lowest Price" },
    { icon: RiTruckLine, heading: "Free Shipping" },
  ];

  if (!product) {
    return <div className="py-20 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <>
      {/* BREADCRUMB */}
      <section className="relative w-full min-h-[160px] font-body overflow-hidden">
        <img src="/breadcumb-bkg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.03]" />
        <div className="absolute inset-0 flex items-center justify-center text-black px-4 text-center">
          <div>
            <p className="text-sm md:text-[15px] mb-2">
              <Link to="/" className="hover:text-[#c19417] transition">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-[#c19417] transition capitalize">
                {product.category?.name || "Shop"}
              </Link>
              <span className="mx-2">/</span>
              <span className="capitalize">{product.name}</span>
            </p>
            <h1 className="text-[26px] md:text-[34px] font-semibold capitalize">{product.name}</h1>
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="w-full py-16 px-4 font-body">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT — IMAGES */}
            <div className="space-y-5">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">

                {/* Thumbnails */}
                <div className="flex lg:flex-col gap-3 lg:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
                  {(product.images || []).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border ${
                        selectedImage === img ? "border-black" : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 bg-[#f8f8f8] overflow-hidden order-1 lg:order-2">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover"
                  />
                </div>
              </div>

              {/* FEATURE STRIP */}
              <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible border border-[#e5e5e5]">
                {featureData.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-4 bg-[#f3f4fc] min-w-[180px] md:min-w-0 ${
                      i !== featureData.length - 1 ? "border-r border-[#DEE3F2]" : ""
                    }`}
                  >
                    <item.icon size={18} className="text-[#47486f] shrink-0" />
                    <p className="text-[14px] font-medium text-[#47486F]">{item.heading}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — INFO */}
            <div className="pt-2">

              {/* Brand */}
              {product.brand?.name && (
                <p className="text-sm mb-3">
                  <span className="text-[#666]">Brand: </span>
                  <span className="text-[#c19417]">{product.brand.name}</span>
                </p>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>

              {/* Price + Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-semibold">${displayPrice}</span>
                <div className="flex items-center gap-2">
                  {renderStars(product.rating || 0)}
                  <span className="text-sm text-gray-500">({product.reviewCount || 0} reviews)</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* VARIANTS */}
              {variantKeys.map((key) => (
                <div key={key} className="mb-5">
                  <p className="mb-2 font-medium capitalize">{key}</p>
                  <div className="flex flex-wrap gap-2 text-[13px]">
                    {getOptions(key).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedCombination(prev => ({ ...prev, [key]: opt }))}
                        className={`px-3 py-2 border transition ${
                          selectedCombination[key] === opt
                            ? "border-[#c19417] bg-amber-50 text-[#c19417]"
                            : "border-gray-200 hover:border-[#c19417]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {selectedCombination[key] && (
                    <button
                      onClick={() => setSelectedCombination(prev => { const c = {...prev}; delete c[key]; return c; })}
                      className="text-xs text-gray-400 mt-1"
                    >
                      × Clear
                    </button>
                  )}
                </div>
              ))}

              {/* Stock */}
              <div className="mb-5">
                <span className={`text-xs px-3 py-1 rounded-full border ${
                  product.stock > 0 ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-500 border-red-100"
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>

              {/* CTA */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <div className="flex items-center border h-[48px] sm:h-[52px] w-full sm:w-[160px]">
                    <button onClick={() => setQuantity(p => Math.max(1, p - 1))} className="w-[45px] sm:w-[50px] flex items-center justify-center">
                      <RiSubtractLine />
                    </button>
                    <div className="flex-1 text-center border-x">{quantity}</div>
                    <button onClick={() => setQuantity(p => p + 1)} className="w-[45px] sm:w-[50px] flex items-center justify-center">
                      <RiAddLine />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-[48px] sm:h-[52px] bg-[#c19417] hover:bg-black text-white transition"
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  onClick={handleBuyNow}
                  className="w-full h-[50px] sm:h-[54px] bg-black hover:bg-[#c19417] text-white transition"
                >
                  Buy Now
                </button>
              </div>

              {/* Info */}
              <div className="space-y-2 text-[13px] text-[#666]">
                <div className="flex gap-2 items-center">
                  <RiTruckLine size={16} />
                  <p>Estimated delivery: 5-7 business days</p>
                </div>
                <div className="flex gap-2 items-center">
                  <RiShieldCheckLine size={16} />
                  <p>Free shipping on orders above $200</p>
                </div>
              </div>

            </div>
          </div>

          {/* TABS */}
          <div className="mt-20">
            <div className="flex sm:flex-wrap overflow-x-auto sm:overflow-visible border border-[#e5e5e5] mb-10 no-scrollbar">
              {[
                { key: "description", label: "Description" },
                { key: "reviews", label: "Reviews" },
                { key: "shipping", label: "Shipping & Return Policy" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-3 text-[16px] whitespace-nowrap shrink-0 font-medium tracking-wide transition duration-300 ${
                    activeTab === tab.key
                      ? "text-black border-b-2 border-[#c19417]"
                      : "text-[#777] hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="border border-[#e5e5e5] p-6 bg-white">

              {activeTab === "description" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[28px] font-medium text-[#111] mb-3">About This Item</h3>
                    <p className="text-gray-600 leading-7 text-[15px]">{product.description}</p>
                  </div>
                  <img src="/products-banner-2.jpg" alt="" className="w-full object-cover" />
                  <div>
                    <h3 className="text-[16px] font-medium text-[#666] mb-2">Specifications</h3>
                    <ul className="list-disc pl-5 space-y-2 text-[15px] text-[#666]">
                      <li>Premium quality material</li>
                      <li>Elegant handcrafted design</li>
                      <li>Perfect for daily & occasional wear</li>
                      <li>Lightweight & comfortable</li>
                    </ul>
                  </div>
                  {/* Product Info Table */}
                  <div>
                    <div className="w-full bg-[#f5f3ed] px-5 py-3 mb-4">
                      <h3 className="text-[16px] font-semibold text-[#c19417] uppercase">Product Information</h3>
                    </div>
                    <div className="border border-[#e5e5e5] text-[14px] text-[#666]">
                      <div className="grid grid-cols-[180px_auto] p-4">
                        <p className="font-medium">Category</p>
                        <p>{product.category?.name || "—"}</p>
                      </div>
                      {product.metalType?.name && (
                        <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2 bg-[#f5f3ed]">
                          <p className="font-medium">Metal Type</p>
                          <p>{product.metalType.name}</p>
                        </div>
                      )}
                      {product.stoneType?.name && (
                        <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2">
                          <p className="font-medium">Stone Type</p>
                          <p>{product.stoneType.name}</p>
                        </div>
                      )}
                      {product.brand?.name && (
                        <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2 bg-[#f5f3ed]">
                          <p className="font-medium">Brand</p>
                          <p>{product.brand.name}</p>
                        </div>
                      )}
                      <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2">
                        <p className="font-medium">Stock</p>
                        <p>{product.stock > 0 ? `${product.stock} units` : "Out of stock"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-xl font-semibold text-black mb-6">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[
                      { name: "Jennifer", rating: 5, text: "Beautiful quality and exactly as shown. The finishing feels premium and elegant." },
                      { name: "Roger", rating: 4.5, text: "Packaging was lovely and delivery was on time. Will definitely order again." },
                      { name: "James", rating: 5, text: "Very classy piece. Looks even better in person." },
                    ].map((review, i) => (
                      <div key={i} className={i !== 2 ? "border-b border-gray-200 pb-5" : ""}>
                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(review.rating)}
                          <span className="font-medium text-black">{review.name}</span>
                        </div>
                        <p className="text-[15px] text-gray-600 leading-7">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-10 text-[15px] text-gray-700 leading-7">
                  <div>
                    <div className="w-full bg-[#f3f4f6] px-5 py-3 mb-4">
                      <h3 className="text-[16px] font-semibold text-black uppercase">Shipping Policy</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Dispatch: Within 24 Hours</li>
                      <li>Free shipping on orders above $99</li>
                      <li>International delivery: 5–7 business days</li>
                      <li>Easy 30 days returns & exchanges</li>
                    </ul>
                  </div>
                  <div>
                    <div className="w-full bg-[#f3f4f6] px-5 py-3 mb-4">
                      <h3 className="text-[16px] font-semibold text-black uppercase">Returns Policy</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Items must be unused and undamaged</li>
                      <li>Original packaging and tags must be intact</li>
                      <li>Proof of purchase is required</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <TrendingProducts
              products={relatedProducts}
              title="Related Products"
              showTabs={false}
              filterTrending={false}
            />
          )}

        </div>
      </section>
    </>
  );
}