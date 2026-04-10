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
      <section className="w-full py-16 px-4 font-body">
  <div className="max-w-[1400px] mx-auto">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

      {/* LEFT SIDE */}
      <div className="space-y-5">

        {/* Image + Thumbnails */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 lg:gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
            {product.images.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border ${
                  selectedImage === img
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#f8f8f8] overflow-hidden order-1 lg:order-2">
            <img
              src={selectedImage}
              alt=""
              className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover"
            />
          </div>
        </div>

        {/* FEATURE STRIP */}
<div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible border border-[#e5e5e5] bg-white">          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 lg:px-4 lg:py-4 bg-[#f3f4fc] min-w-[200px] md:min-w-0 sm:min-w-0 ${
                  index !== data.length - 1 ? "sm:border-r border-[#DEE3F2]" : ""
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center text-[#47486f] shrink-0">
                  <Icon size={18} />
                </div>

                <p className="text-[14px] font-medium text-[#47486F]">
                  {item.heading}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="pt-2">

        <p className="text-sm mb-3">
          <span className="text-[#666666]">Brand:</span>{" "}
          <span className="text-[#c19417]">{product.brand}</span>
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
          {product.name}
        </h1>

        {/* Price + Rating */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-semibold">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Metal */}
        <div className="mb-6">
          <p className="mb-2">Choice of Metal</p>
          <div className="flex flex-wrap gap-2 text-[13px]">
            <div className="px-3 py-2 border">Yellow Gold</div>
            <div className="px-3 py-2 border">Rose Gold</div>
            <div className="px-3 py-2 border">Silver</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-8">

          <div className="flex flex-col sm:flex-row gap-3 mb-3">

            {/* Counter */}
            <div className="flex items-center border h-[48px] sm:h-[52px] w-full sm:w-[160px]">
              <button
                onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                className="w-[45px] sm:w-[50px]"
              >
                <RiSubtractLine />
              </button>

              <div className="flex-1 text-center border-x">
                {quantity}
              </div>

              <button
                onClick={() => setQuantity((p) => p + 1)}
                className="w-[45px] sm:w-[50px]"
              >
                <RiAddLine />
              </button>
            </div>

            {/* Add to Cart */}
            <button className="flex-1 h-[48px] sm:h-[52px] bg-[#c19417] text-white">
              Add to Cart
            </button>
          </div>

          <button className="w-full h-[50px] sm:h-[54px] bg-black text-white">
            Buy Now
          </button>
        </div>

        {/* Small Info */}
        <div className="space-y-2 text-[13px] text-[#666]">
          <div className="flex gap-2">
            <RiTruckLine />
            <p>{product.shipping.estimatedDelivery}</p>
          </div>

          <div className="flex gap-2">
            <RiShieldCheckLine />
            <p>Free shipping on orders above $200</p>
          </div>
        </div>

      </div>
    </div>



        {/* ===================== TABS SECTION ===================== */}
        <div className="mt-20">




          {/* Tab Buttons */}
          <div className="">

         
         <div className="flex sm:flex-wrap overflow-x-auto sm:overflow-visible border border-[#e5e5e5] mb-10 no-scrollbar">
  {[
    { key: "description", label: "Description" },
    { key: "comparison", label: "Quick Comparison" },
    { key: "reviews", label: "Reviews" },
    { key: "shipping", label: "Shipping & Return Policy" },
  ].map((tab) => (
    <button
      key={tab.key}
      onClick={() => setActiveTab(tab.key)}
      className={`px-4 py-3 text-[16px] whitespace-nowrap shrink-0 font-medium tracking-wide transition duration-300 ${
        activeTab === tab.key
          ? "text-black border-b-2 border-[#c19417]"
          : "text-[#777777] hover:text-black"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>
 </div>
          

          {/* ===================== TAB CONTENT ===================== */}

          <div className="border border-[#e5e5e5] p-6  bg-white">
       {activeTab === "description" && (
  <div className="space-y-6">

    {/* ===== ABOUT THIS ITEM ===== */}
    <div>
      <h3 className="text-[28px] font-medium text-[#111111]">
        About This Item
      </h3>

      <p className="text-gray-600 leading-7 text-[15px]">
        {product.description}
      </p>
    </div>

    {/* ===== IMAGE ===== */}
    <img
      src="/products-banner-2.jpg"
      alt="Product Banner"
      className="w-full object-cover"
    />

    {/* ===== SPECIFICATIONS ===== */}
    <div>
      <h3 className="text-[16px] font-medium text-[#666666] mb-2">
        Specifications
      </h3>

      <ul className="list-disc pl-5 space-y-2 text-[15px] text-[#666666]">
        <li>Premium quality material</li>
        <li>Elegant handcrafted design</li>
        <li>Perfect for daily & occasional wear</li>
        <li>Lightweight & comfortable</li>
      </ul>
    </div>

    {/* ===== PRODUCT INFORMATION ===== */}
    <div>
      <div className="w-full bg-[#f5f3ed] px-5 py-3 mb-4">
        <h3 className="text-[16px] font-semibold text-[#c19417] uppercase">
          Product Information
        </h3>
      </div>

      {/* OUTER BOX (single border only) */}
      <div className="border border-[#e5e5e5] text-[14px] text-[#666666]">

        {/* Dimensions */}
        <div className="grid grid-cols-[180px_auto] p-4">
          <p className="font-medium">Dimensions</p>
          <div className="space-y-1">
            <p>Width - {product.dimensions.width}</p>
            <p>Height - {product.dimensions.height}</p>
            <p>Weight - {product.dimensions.weight}</p>
          </div>
        </div>

        {/* single divider */}
        <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2 bg-[#f5f3ed]">
          <p className="font-medium">Purity</p>
          <p>{product.dimensions.purity}</p>
        </div>

        {/* ===== DIAMOND SECTION ===== */}
        <div className="border-t border-[#e5e5e5]">

          {/* Heading */}
          <div className="px-4 py-3">
            <h3 className="text-[16px] font-semibold text-[#c19417] uppercase">
              Diamond & Gemstones
            </h3>
          </div>

          {/* Rows */}
          <div className="border-t border-[#e5e5e5]">

            <div className="grid grid-cols-[180px_auto] px-4 py-2">
              <p className="font-medium">Diamond Type</p>
              <p className="border border-[#e5e5e5] px-2 py-1 w-fit">
                {product.gemstones.diamondType}
              </p>
            </div>

            <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2 bg-[#f5f3ed]">
              <p className="font-medium">Setting Type</p>
              <p>{product.gemstones.settingType}</p>
            </div>

            <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2">
              <p className="font-medium">Total Number</p>
              <p className="border border-[#e5e5e5] px-2 py-1 w-fit">
                {product.gemstones.totalNumber}
              </p>
            </div>

            <div className="border-t border-[#e5e5e5] grid grid-cols-[180px_auto] px-4 py-2 bg-[#f5f3ed]">
              <p className="font-medium">Total Weight</p>
              <p>{product.gemstones.totalWeight}</p>
            </div>

          </div>
        </div>

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
                spacing="pt-6"
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
  <div className="space-y-10 text-[15px] text-gray-700 leading-7">

    {/* ===== SHIPPING POLICY ===== */}
    <div>
      <div className="w-full bg-[#f3f4f6] px-5 py-3 mb-4">
        <h3 className="text-[16px] font-semibold text-black uppercase">
          Shipping Policy
        </h3>
      </div>

      <div className="space-y-4">
        <p>
          At our Company, we understand the importance of timely delivery. We offer a variety of shipping options including standard, expedited, and express shipping.
        </p>

        <p>
          Our dedicated team works diligently to process and dispatch your orders promptly, aiming to deliver them within the estimated timeframe.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Dispatch: Within 24 Hours</li>
          <li>Free shipping on orders above $99</li>
          <li>International delivery: 5–7 business days</li>
          <li>Cash on delivery might be available</li>
          <li>Easy 30 days returns & exchanges</li>
        </ul>

        <p>
          Delivery times may vary depending on product availability, destination, and carrier delays.
        </p>
      </div>
    </div>

    {/* ===== RETURNS POLICY ===== */}
    <div>
      <div className="w-full bg-[#f3f4f6] px-5 py-3 mb-4">
        <h3 className="text-[16px] font-semibold text-black uppercase">
          Returns Policy
        </h3>
      </div>

      <div className="space-y-4">
        <p>
          We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Items must be unused and undamaged</li>
          <li>Original packaging and tags must be intact</li>
          <li>Proof of purchase is required</li>
        </ul>
      </div>
    </div>

  </div>
)}
</div>
        </div>

        {/* ===================== RELATED PRODUCTS ===================== */}
        <div className="mt-">
          <TrendingProducts
            products={relatedProducts}
            title="Related Products"
            subtitle="You May Also Like"
            showTabs={false}
            filterTrending={false}
          />
        </div>
        </div>
      </section>
    </>
  );
}