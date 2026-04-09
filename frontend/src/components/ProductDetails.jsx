import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  RiStarFill,
  RiStarHalfFill,
  RiStarLine,
  RiHeartLine,
  RiShuffleLine,
  RiQuestionLine,
  RiShareLine,
  RiEyeLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiSecurePaymentLine,
  RiAddLine,
  RiSubtractLine,
  
RiStackLine  } from "@remixicon/react";

import TrendingProducts from "../components/TrendingProducts";
import { productsData } from "../data/product";
export default function ProductDetails({ product }) {
  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const [selectedImage, setSelectedImage] = useState(
    product?.images?.gallery?.[0] || product?.images?.main
  );

  useEffect(() => {
    setSelectedImage(product?.images?.gallery?.[0] || product?.images?.main);
    setQuantity(1);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 8);
  }, [product]);

  const comparisonProducts = useMemo(() => {
    return productsData.filter((item) => item.id !== product?.id).slice(0, 6);
  }, [product]);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<RiStarFill key={i} size={16} className="text-[#c19417]" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <RiStarHalfFill key={i} size={16} className="text-[#c19417]" />
        );
      } else {
        stars.push(<RiStarLine key={i} size={16} className="text-[#c19417]" />);
      }
    }

    return stars;
  };


  const data=[
    {icon:RiShieldCheckLine,heading:'101% Original'},
        {icon:RiStackLine  ,heading:'Lowest Price'},
    {icon:RiTruckLine,heading:'Free Shipping'},

  ]

  if (!product) {
    return <div className="py-20 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <>
      {/* ===================== BREADCRUMB SECTION ===================== */}
      <section className="relative w-full min-h-[160px] font-body overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          alt="Breadcrumb"
          className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
        />

        <div className="absolute inset-0 flex items-center justify-center text-black px-4 text-center">
          <div>
            <p className="text-sm md:text-[15px] mb-2">
              <Link to="/" className="hover:text-[#c19417] transition duration-300">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                to={`/shop/${product.category}`}
                className="hover:text-[#c19417] transition duration-300 capitalize"
              >
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black capitalize">{slug}</span>
            </p>

            <h1 className="text-[26px] md:text-[34px] font-semibold capitalize">
              {product.name}
            </h1>
          </div>
        </div>
      </section>

      {/* ===================== PRODUCT DETAILS ===================== */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-16 font-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          {/* LEFT SIDE */}
<div className="space-y-5">
  {/* Top Image Area */}
  <div className="flex gap-5 items-start">
    
    {/* Thumbnails */}
    <div className="flex flex-col gap-4 shrink-0">
      {product.images.gallery.map((img, index) => (
        <button
          key={index}
          onClick={() => setSelectedImage(img)}
          className={`w-24 h-24 overflow-hidden border transition ${
            selectedImage === img
              ? "border-black"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <img
            src={img}
            alt={`${product.name}-${index}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>

    {/* Main Image */}
    <div className="flex-1 bg-[#f8f8f8] overflow-hidden">
      <img
        src={selectedImage}
        alt={product.name}
        className="w-full h-[600px] object-cover"
      />
    </div>
  </div>

  {/* ===================== FEATURE STRIP ===================== */}
  <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#e5e5e5] bg-white">
    {data.map((item, index) => {
      const Icon = item.icon;
      return (
        <div
          key={index}
          className={`flex items-center gap-3 px-4 py-4 ${
            index !== data.length - 1 ? "sm:border-r border-[#e5e5e5]" : ""
          }`}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-[#f8f8f8] text-[#c19417] shrink-0">
            <Icon size={18} />
          </div>

          <div>
            <p className="text-[14px] font-medium text-black leading-[1.4]">
              {item.heading}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>

          {/* RIGHT SIDE */}
          <div className="pt-2">
            {/* Brand */}
            <p className="text-sm mb-3">
              <span className="tracking-wider text-[#666666]">Brand:</span>{" "}
              <span className="text-[#c19417] tracking-wider">{product.brand}</span>
            </p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price + Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-black">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-7 mb-8">{product.description}</p>

            {/* Product Meta */}
            <div className="space-y-2 mb-8 text-[15px] text-gray-700">
              <p><span className="font-semibold text-black">Carat:</span> {product.carat}</p>
              <p><span className="font-semibold text-black">Metal:</span> {product.metal}</p>
              <p><span className="font-semibold text-black">Stone:</span> {product.stone}</p>
              <p><span className="font-semibold text-black">Stock No:</span> {product.stockNumber}</p>
              <p><span className="font-semibold text-black">Availability:</span> {product.stock}</p>
            </div>

            {/* ===================== CTA SECTION ===================== */}
            <div className="mb-8">
              {/* Add to cart + Counter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                {/* Counter */}
                <div className="flex items-center border border-[#d9d9d9] h-[52px] w-full sm:w-[160px]">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-[50px] h-full flex items-center justify-center hover:bg-[#f5f5f5] transition"
                  >
                    <RiSubtractLine size={18} />
                  </button>

                  <div className="flex-1 h-full flex items-center justify-center text-[15px] font-medium border-x border-[#d9d9d9]">
                    {quantity}
                  </div>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-[50px] h-full flex items-center justify-center hover:bg-[#f5f5f5] transition"
                  >
                    <RiAddLine size={18} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button className="flex-1 h-[52px] bg-[#c19417] text-white font-medium uppercase tracking-wide hover:bg-black transition duration-300">
                  Add to Cart
                </button>
              </div>

              {/* Buy Now */}
              <button className="w-full h-[54px] bg-black text-white font-medium uppercase tracking-wide hover:bg-[#c19417] transition duration-300">
                Buy Now
              </button>
            </div>

            {/* Extra Actions */}
            <div className="flex flex-wrap gap-5 text-sm text-gray-700 mb-6">
              <button className="flex items-center gap-2 hover:text-black transition">
                <RiShuffleLine size={18} /> Compare
              </button>
              <button className="flex items-center gap-2 hover:text-black transition">
                <RiHeartLine size={18} /> Wishlist
              </button>
              <button className="flex items-center gap-2 hover:text-black transition">
                <RiQuestionLine size={18} /> Ask Us
              </button>
              <button className="flex items-center gap-2 hover:text-black transition">
                <RiShareLine size={18} /> Share
              </button>
            </div>

            {/* Watch Count */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <RiEyeLine size={16} />
              <span>18 people are viewing this right now</span>
            </div>

            {/* ===================== SMALL INFO ===================== */}
            <div className="space-y-2 text-[13px] text-[#666666]">
              <div className="flex items-start gap-2">
                <RiTruckLine size={16} className="text-[#c19417] mt-[2px] shrink-0" />
                <p>
                  <span className="text-black font-medium">Delivery:</span>{" "}
                  {product.shipping.estimatedDelivery}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <RiShieldCheckLine size={16} className="text-[#c19417] mt-[2px] shrink-0" />
                <p>
                  <span className="text-black font-medium">Shipping:</span>{" "}
                  Free shipping on orders above $200
                </p>
              </div>

              <div className="flex items-start gap-2">
                <RiSecurePaymentLine size={16} className="text-[#c19417] mt-[2px] shrink-0" />
                <p>
                  <span className="text-black font-medium">Checkout:</span>{" "}
                  Secure payment with trusted methods
                </p>
              </div>
            </div>
          </div>
        </div>




        {/* ===================== TABS SECTION ===================== */}
        <div className="mt-20">




          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-3 border-b border-[#e5e5e5] pb-4 mb-10">
            {[
              { key: "description", label: "Description" },
              { key: "comparison", label: "Quick Comparison" },
              { key: "reviews", label: "Reviews" },
              { key: "shipping", label: "Shipping & Return Policy" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-[14px] uppercase tracking-wide transition duration-300 border ${
                  activeTab === tab.key
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-[#d9d9d9] hover:bg-[#c19417] hover:text-white hover:border-[#c19417]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          

          {/* ===================== TAB CONTENT ===================== */}
          {activeTab === "description" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Information */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-5">Product Information</h3>
                <div className="space-y-4 text-gray-700 text-[15px]">
                  <p>{product.description}</p>
                  <p><span className="font-medium text-black">Category:</span> {product.category}</p>
                  <p><span className="font-medium text-black">Sub Category:</span> {product.subCategory}</p>
                  <p><span className="font-medium text-black">Carat:</span> {product.carat}</p>
                  <p><span className="font-medium text-black">Metal:</span> {product.metal}</p>
                  <p><span className="font-medium text-black">Stone:</span> {product.stone}</p>
                </div>
              </div>

              {/* Sizes / Specs */}
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-5">Sizes & Specifications</h3>
                <div className="space-y-4 text-gray-700 text-[15px]">
                  <p><span className="font-medium text-black">Width:</span> {product.dimensions.width}</p>
                  <p><span className="font-medium text-black">Height:</span> {product.dimensions.height}</p>
                  <p><span className="font-medium text-black">Weight:</span> {product.dimensions.weight}</p>
                  <p><span className="font-medium text-black">Purity:</span> {product.dimensions.purity}</p>
                  <p><span className="font-medium text-black">Diamond Type:</span> {product.gemstones.diamondType}</p>
                  <p><span className="font-medium text-black">Setting Type:</span> {product.gemstones.settingType}</p>
                  <p><span className="font-medium text-black">Total Number:</span> {product.gemstones.totalNumber}</p>
                  <p><span className="font-medium text-black">Total Weight:</span> {product.gemstones.totalWeight}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div>
              <TrendingProducts
                products={comparisonProducts}
                title="Trending Products"
                subtitle="Quick Comparison"
                showTabs={false}
                filterTrending={false}
              />
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Customer Reviews</h3>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(5)}
                    <span className="font-medium text-black">jenifer</span>
                  </div>
                  <p className="text-[15px] text-gray-600 leading-7">
                    Beautiful quality and exactly as shown. The finishing feels premium and elegant.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(4.5)}
                    <span className="font-medium text-black">rojer</span>
                  </div>
                  <p className="text-[15px] text-gray-600 leading-7">
                    Packaging was lovely and delivery was on time. Will definitely order again.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(5)}
                    <span className="font-medium text-black">james</span>
                  </div>
                  <p className="text-[15px] text-gray-600 leading-7">
                    Very classy piece. Looks even better in person.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Shipping & Return Policy</h3>

              <div className="space-y-5 text-[15px] text-gray-700 leading-7">
                <p>
                  We process all orders within 1–2 business days. Delivery timelines may vary depending on your location and product availability.
                </p>

                <p>
                  Standard shipping is available on all orders, and free shipping may apply on selected order values or promotional campaigns.
                </p>

                <p>
                  If your item arrives damaged or incorrect, please contact our support team within 48 hours of receiving your order.
                </p>

                <p>
                  Returns and exchanges are accepted according to our return eligibility terms. Products must be unused and in original packaging.
                </p>

                <p>
                  For customized or engraved jewelry items, returns may not be applicable unless the item is faulty.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ===================== RELATED PRODUCTS ===================== */}
        <div className="mt-24">
          <TrendingProducts
            products={relatedProducts}
            title="Related Products"
            subtitle="You May Also Like"
            showTabs={false}
            filterTrending={false}
          />
        </div>
      </section>
    </>
  );
}