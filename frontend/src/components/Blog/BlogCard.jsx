import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="w-full max-w-[360px] lg:w-[400px] lg:max-w-[800px] lg:w-[500px] bg-white  overflow-hidden flex-shrink-0 mx-auto">
      {/* Image */}
      <div className="overflow-hidden">
  <img
    src={blog.image}
    alt={blog.title}
    className="w-full h-[280px] object-cover transition-transform duration-500 ease-in-out hover:scale-110"
  />
</div>

      {/* Content */}
      <div className="pt-4">
        <p className="text-[15px] font-medium text-[#c19417] mb-2">{blog.date}</p>

        <h3 className="text-[18px] font-medium text-[#111111] leading-6 mb-2 transition duration-300 line-clamp-1">
          {blog.title}
        </h3>

        <p className="text-[#666666] text-[15px] leading-6 line-clamp-2 mb-2">
          {blog.shortDescription}
        </p>

        <Link
          to={`/blog/${blog.slug}`}
          className="text-black text-[15px] font-medium hover:underline hover:text-[#c19417]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}