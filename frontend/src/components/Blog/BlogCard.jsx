import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="w-full max-w-[360px] bg-white  overflow-hidden flex-shrink-0 mx-auto">
      {/* Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[180px] object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <p className="text-[13px] text-[#c19417] mb-2">{blog.date}</p>

        <h3 className="text-[18px] font-medium text-[#111111] leading-6 mb-1 transition duration-300 line-clamp-1">
          {blog.title}
        </h3>

        <p className="text-gray-700 text-[14px] leading-6 line-clamp-2 mb-2">
          {blog.shortDescription}
        </p>

        <Link
          to={`/blog/${blog.slug}`}
          className="text-black text-[14px] font-medium hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}