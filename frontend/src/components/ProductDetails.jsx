import React, { useState } from "react";
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
} from "@remixicon/react";

export default function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.gallery?.[0] || product?.images?.main
  );

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

  if (!product) {
    return <div className="py-20 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT SIDE */}
        <div className="flex gap-5">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {product.images.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition ${
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
          <div className="flex-1 bg-[#f8f8f8] rounded-3xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-150 object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pt-2">
          {/* Brand */}
          <p className="text-sm uppercase tracking-[3px] text-[#c19417] mb-3">
            {product.brand}
          </p>

          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-semibold text-black">${product.price}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-7 mb-8">{product.description}</p>

          {/* Product Meta */}
          <div className="space-y-3 mb-8 text-[15px] text-gray-700">
            <p><span className="font-semibold text-black">Carat:</span> {product.carat}</p>
            <p><span className="font-semibold text-black">Metal:</span> {product.metal}</p>
            <p><span className="font-semibold text-black">Stone:</span> {product.stone}</p>
            <p><span className="font-semibold text-black">Stock No:</span> {product.stockNumber}</p>
            <p><span className="font-semibold text-black">Availability:</span> {product.stock}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-[#c19417] transition duration-300">
              Add to Cart
            </button>
            <button className="px-8 py-4 border border-black text-black rounded-xl font-medium hover:bg-black hover:text-white transition duration-300">
              Buy Now
            </button>
          </div>

          {/* Extra Actions */}
          <div className="flex flex-wrap gap-5 text-sm text-gray-700 mb-8">
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
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <RiEyeLine size={18} />
            <span>18 people are viewing this right now</span>
          </div>

          {/* Info Boxes */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
              <RiTruckLine size={24} className="text-[#c19417]" />
              <div>
                <p className="font-medium text-black">Estimated Delivery</p>
                <p className="text-sm text-gray-500">
                  {product.shipping.estimatedDelivery}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
              <RiShieldCheckLine size={24} className="text-[#c19417]" />
              <div>
                <p className="font-medium text-black">Free Shipping & Guarantee</p>
                <p className="text-sm text-gray-500">
                  Free shipping on orders above $200
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
              <RiSecurePaymentLine size={24} className="text-[#c19417]" />
              <div>
                <p className="font-medium text-black">Safe & Secure Checkout</p>
                <p className="text-sm text-gray-500">
                  Protected payments with trusted methods
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          Product Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dimensions */}
          <div className="border border-gray-200 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-black mb-5">Dimensions</h3>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-medium text-black">Width:</span> {product.dimensions.width}</p>
              <p><span className="font-medium text-black">Height:</span> {product.dimensions.height}</p>
              <p><span className="font-medium text-black">Weight:</span> {product.dimensions.weight}</p>
              <p><span className="font-medium text-black">Purity:</span> {product.dimensions.purity}</p>
            </div>
          </div>

          {/* Diamonds & Gemstones */}
          <div className="border border-gray-200 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-black mb-5">
              Diamond & Gemstones
            </h3>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-medium text-black">Diamond Type:</span> {product.gemstones.diamondType}</p>
              <p><span className="font-medium text-black">Setting Type:</span> {product.gemstones.settingType}</p>
              <p><span className="font-medium text-black">Total Number:</span> {product.gemstones.totalNumber}</p>
              <p><span className="font-medium text-black">Total Weight:</span> {product.gemstones.totalWeight}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}