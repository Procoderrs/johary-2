import React, { useState } from "react";
import { blogsData } from "../data/blogs";
import { commentsData } from "../data/comments";
import { useParams, Link } from "react-router-dom";

export default function BlogPage() {
  const { slug } = useParams();
  const blog = blogsData.find((b) => b.slug === slug) || blogsData[0];

  // Safeguards
  if (!blog.point) blog.point = [];
  if (!blog.blogImages) blog.blogImages = [];
  if (!blog.categories) blog.categories = [];
  if (!blog.tags) blog.tags = [];

  // Sidebar filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showRecent, setShowRecent] = useState(false);

  const filteredBlogs = selectedCategory
    ? blogsData.filter((b) => b.categories.includes(selectedCategory))
    : showRecent
    ? blogsData.slice(0, 3)
    : [blog];

  return (
    <div className="font-body bg-white">
      {/* ================= Breadcrumb Section ================= */}
      <div className="relative w-full h-52 md:h-64">
        <img
          src="/breadcumb-bkg.jpg"
          alt="Breadcrumb"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm md:text-base uppercase tracking-[3px] text-[#c19417] mb-3">
            {blog.categories[0]}
          </p>
          <h1 className="text-2xl md:text-4xl font-semibold text-[#111111] max-w-3xl leading-tight">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* ================= Main Flex Section ================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* ================= Left Blog Content ================= */}
          <div className="w-full lg:w-[68%]">
            {filteredBlogs.map((b) => (
              <div key={b.id}>
                {/* Blog Main Banner */}
                <div className="w-full h-64 md:h-[450px] overflow-hidden rounded-2xl mb-8">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Date */}
                <p className="text-sm text-[#777777] mb-4">{b.date}</p>

                {/* Heading 1 */}
                <h2 className="text-2xl md:text-3xl font-semibold text-[#111111] leading-snug mb-4">
                  {b.heading_1}
                </h2>

                {/* Description 1 */}
                <p className="text-[16px] leading-8 text-[#555555] mb-8">
                  {b.description_1}
                </p>

                {/* Heading 2 */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#111111] leading-snug mb-4">
                  {b.heading_2}
                </h3>

                {/* Points */}
                <ul className="list-disc pl-6 mb-8 space-y-3 text-[#555555] leading-8">
                  {b.point.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>

                {/* Description 2 */}
                <p className="text-[16px] leading-8 text-[#555555] mb-8">
                  {b.description_2}
                </p>

                {/* Special Quote */}
                <div className="bg-[#f8f8f8] border-l-4 border-[#c19417] px-6 py-6 rounded-xl mb-10">
                  <p className="text-lg italic text-[#222222] leading-8">
                    {b.special_words}
                  </p>
                </div>

                {/* Blog Inner Images */}
                {b.blogImages.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                    {b.blogImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Blog ${i}`}
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                    ))}
                  </div>
                )}

                {/* Heading 3 */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#111111] leading-snug mb-4">
                  {b.heading_3}
                </h3>

                <p className="text-[16px] leading-8 text-[#555555] mb-8">
                  {b.description_3}
                </p>

                {/* Heading 4 */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#111111] leading-snug mb-4">
                  {b.heading_4}
                </h3>

                <p className="text-[16px] leading-8 text-[#555555] mb-10">
                  {b.description_4}
                </p>
              </div>
            ))}
          </div>

          {/* ================= Right Sidebar ================= */}
          <div className="w-full lg:w-[32%] flex flex-col gap-6">
            
            {/* Recent Posts */}
            <div className="border border-[#e5e5e5] p-6 rounded-2xl">
              <h4 className="text-xl font-semibold mb-5 text-[#111111]">
                Recent Posts
              </h4>

              <button
                className="mb-4 px-4 py-2 bg-[#f5f5f5] rounded-lg text-sm hover:bg-[#c19417] hover:text-white transition"
                onClick={() => {
                  setShowRecent(true);
                  setSelectedCategory(null);
                }}
              >
                Show Recent
              </button>

              <div className="space-y-4">
                {blogsData.slice(0, 3).map((b, i) => (
                  <Link
                    key={i}
                    to={`/blog/${b.slug}`}
                    className="block border-b border-[#eeeeee] pb-4 last:border-b-0"
                  >
                    <p className="font-semibold text-[#111111] hover:text-[#c19417] transition leading-6">
                      {b.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{b.date}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div className="border border-[#e5e5e5] p-6 rounded-2xl">
              <h4 className="text-xl font-semibold mb-5 text-[#111111]">
                Recent Comments
              </h4>

              <div className="space-y-5">
                {commentsData.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    className={`flex gap-3 ${
                      c.role === "Admin" ? "ml-4" : ""
                    }`}
                  >
                    <img
                      src={c.profileImg}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#111111]">{c.name}</p>
                      <p className="text-sm text-gray-500 mb-1">{c.date}</p>
                      <p className="text-sm text-[#555555] leading-6">
                        {c.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border border-[#e5e5e5] p-6 rounded-2xl">
              <h4 className="text-xl font-semibold mb-5 text-[#111111]">
                Categories
              </h4>

              <div className="flex flex-wrap gap-3">
                {[...new Set(blogsData.flatMap((b) => b.categories))].map(
                  (cat, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowRecent(false);
                      }}
                      className={`px-4 py-2 rounded-lg border text-sm transition ${
                        selectedCategory === cat
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-[#f8f8f8] text-[#111111] border-[#e5e5e5] hover:bg-[#c19417] hover:text-white hover:border-[#c19417]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="border border-[#e5e5e5] p-6 rounded-2xl">
              <h4 className="text-xl font-semibold mb-5 text-[#111111]">
                Tags
              </h4>

              <div className="flex flex-wrap gap-3">
                {[...new Set(blogsData.flatMap((b) => b.tags))].map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#f8f8f8] text-sm rounded-lg border border-[#e5e5e5] hover:bg-[#c19417] hover:text-white transition cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}