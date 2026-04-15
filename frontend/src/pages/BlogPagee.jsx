import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { blogsData } from "../data/blogs";
import { commentsData } from "../data/comments";

export default function BlogPagee() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("blog")) return "blog";
    return "page";
  };

  // Filter blogs (optional category filter)
  const filteredBlogs = selectedCategory
    ? blogsData.filter((b) => b.categories.includes(selectedCategory))
    : blogsData;

  return (
    <div className="font-body">
      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px] overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold uppercase">
            {getTitle()}
          </h1>
          <p className="text-sm text-gray-600 uppercase">
            Home / {getTitle()}
          </p>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ================= LEFT: BLOG GRID ================= */}
          <div className="w-full lg:w-[75%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="  overflow-hidden hover:shadow-lg transition"
                >
                  {/* IMAGE */}
                  <div className="w-full h-[320px] overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {blog.categories.map((cat, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#f1efea] px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mb-2">
                      {blog.date}
                    </p>

                    {/* Title */}
                    <h3 className="text-[18px] font-semibold mb-3 text-[#111] line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[14px] text-[#666] mb-4 line-clamp-3">
                      {blog.shortDescription}
                    </p>

                    {/* Button */}
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-block mt-2 px-5 py-2 bg-[#c19417] text-white text-sm uppercase hover:bg-black transition"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT: SIDEBAR ================= */}
          <div className="w-full lg:w-[25%] flex flex-col gap-6">

            {/* Recent Posts */}
            <div className="border border-[#e5e5e5] p-6 ">
              <h4 className="text-xl font-semibold mb-5">Recent Posts</h4>

              <div className="space-y-4">
                {blogsData.slice(0, 4).map((b) => (
                  <Link
                    key={b.id}
                    to={`/blog/${b.slug}`}
                    className="flex gap-3 group  pb-3 "
                  >
                    <img
                      src={b.image}
                      alt=""
                      className="w-16 h-14 object-cover rounded"
                    />
                    <div>
                      <p className=" text-[#666] text-[15px] group-hover:text-[#c19417]">
                        {b.title}
                      </p>
                      {/* <p className="text-xs text-gray-500">{b.date}</p> */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div className="border border-[#e5e5e5] p-6 ">
              <h4 className="text-xl font-semibold mb-5">
                Recent Comments
              </h4>

              <div className="space-y-4">
                {commentsData.slice(0, 6).map((c) => (
                  <div key={c.id} className="flex gap-3">
                    {/* <img
                      src={c.profileImg}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    /> */}
                    <div className="">
                      <p className="text-[15px] font-medium text-[#666]">{c.name}</p>
                     {/*  <p className="text-xs text-gray-500">{c.date}</p> */}
                      <p className="text-[15px] text-[#666] line-clamp-2">
                        {c.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border border-[#e5e5e5] p-6 rounded-xl">
              <h4 className="text-xl font-semibold mb-5">Categories</h4>

              <div className="flex flex-col gap-2">
                {[...new Set(blogsData.flatMap((b) => b.categories))].map(
                  (cat, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-left text-[#666]  ${
                        selectedCategory === cat
                          ? " text-white"
                          : ""
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="border border-[#e5e5e5] p-6 rounded-xl">
              <h4 className="text-xl font-semibold mb-5">Tags</h4>

              <div className="flex flex-col gap-2">
                {[...new Set(blogsData.flatMap((b) => b.tags))].map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="px-9 py-1 w-fit border border-[#f1efea] text-sm  rounded"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}