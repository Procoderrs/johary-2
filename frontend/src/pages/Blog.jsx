import React, { useState, useRef } from "react";
import { blogsData } from "../data/blogs";
import { commentsData } from "../data/comments";
import { useParams, Link } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function BlogPage() {
  const { slug } = useParams();
  const blog = blogsData.find((b) => b.slug === slug) || blogsData[0];

  const similarScrollRef = useRef(null);

  // Safeguards
  if (!blog.point) blog.point = [];
  if (!blog.blogImages) blog.blogImages = [];
  if (!blog.categories) blog.categories = [];
  if (!blog.tags) blog.tags = [];

  // Sidebar filters
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredBlogs = selectedCategory
    ? blogsData.filter((b) => b.categories.includes(selectedCategory))
    : [blog];

  // Similar posts
  const similarPosts = blogsData
    .filter((item) => item.id !== blog.id)
    .filter((item) =>
      item.categories?.some((cat) => blog.categories?.includes(cat))
    )
    .slice(0, 6);

  const scrollLeft = () => {
    similarScrollRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    similarScrollRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-body bg-white">
      {/* ================= Breadcrumb Section ================= */}
      <div className="relative w-full min-h-[160px]  overflow-hidden">
        <img
          src="/breadcumb-bkg.jpg"
          alt="Breadcrumb"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[28px]  font-semibold text-[#111111] max-w-3xl leading-tight">
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

                <p className="text-[16px] leading-8 text-[#555555] mb-12">
                  {b.description_4}
                </p>

                {/* ================= Similar Posts ================= */}
                {similarPosts.length > 0 && (
                  <div className="mt-16">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl md:text-3xl font-semibold text-[#111111]">
                        Similar Posts
                      </h3>

                      <div className="hidden md:flex items-center gap-3">
                        <button
                          onClick={scrollLeft}
                          className="w-11 h-11 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#c19417] hover:text-white transition"
                        >
                          <RiArrowLeftSLine size={24} />
                        </button>
                        <button
                          onClick={scrollRight}
                          className="w-11 h-11 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-[#c19417] hover:text-white transition"
                        >
                          <RiArrowRightSLine size={24} />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={similarScrollRef}
                      className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                    >
                      {similarPosts.map((item) => (
                        <Link
                          key={item.id}
                          to={`/blog/${item.slug}`}
                          className="min-w-full sm:min-w-[48%] bg-white border border-[#eeeeee] rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
                        >
                          <div className="w-full h-[220px] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-105 transition duration-500"
                            />
                          </div>

                          <div className="p-5">
                            <p className="text-sm text-[#777777] mb-2">
                              {item.date}
                            </p>
                            <h4 className="text-[18px] font-semibold text-[#111111] leading-7 hover:text-[#c19417] transition">
                              {item.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
            ))}
            {/* ================= Comments Section ================= */}
<div className="mt-16 border-t border-[#e5e5e5] pt-12">
  <h3 className="text-2xl md:text-3xl font-semibold text-[#111111] mb-3">
    {commentsData.length} Comments
  </h3>

  <p className="text-[15px] text-[#777777] mb-1">Comments navigation</p>
  <p className="text-[15px] text-[#111111] font-medium mb-8 hover:text-[#c19417] transition cursor-pointer">
    Older comments
  </p>

  <div className="space-y-8">
  {commentsData.map((comment) => (
    <div
      key={comment.id}
      className={`flex gap-4 sm:gap-5 ${
        comment.role === "Admin" ? "sm:ml-10" : ""
      }`}
    >
      {/* Profile */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 ${
          comment.role === "Admin" ? "border-2 border-[#f1efea] p-[2px]" : ""
        }`}
      >
        <img
          src={comment.profileImg}
          alt={comment.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-[18px] font-semibold text-[#111111] mb-1">
          {comment.name}{" "}
          <span className="font-normal text-[#555555]">says:</span>
        </h4>

        <p className="text-sm text-[#777777] mb-3">{comment.date}</p>

        <p className="text-[15px] leading-7 text-[#555555] mb-4">
          {comment.comment}
        </p>

        {/* Static extra list */}
        <ul className="list-disc pl-5 space-y-1 text-[15px] text-[#555555]">
          <li>Soluta raex dicta</li>
          <li>Dolor quaerat voluptas minus</li>
          <li>Eaque consequatur error asperiores</li>
        </ul>
      </div>
    </div>
  ))}
</div>


<div className="mt-12 pt-8 border-t border-[#e5e5e5]">
  <h3 className="text-[24px] font-semibold text-[#111111] mb-3">
    Leave a Reply
  </h3>

  <p className="text-[15px] text-[#555555] leading-7">
    You must be{" "}
    <Link
      to="/login"
      className="text-[#c19417] font-medium hover:underline transition duration-300"
    >
      logged in
    </Link>{" "}
    to leave a reply.
  </p>
</div>
</div>
          </div>

          {/* ================= Right Sidebar ================= */}
          <div className="w-full lg:w-[32%] flex flex-col gap-6">
            
            {/* Recent Posts */}
            <div className="border border-[#e5e5e5] p-6 rounded-2xl">
              <h4 className="text-xl font-semibold mb-5 text-[#111111]">
                Recent Posts
              </h4>

              <div className="space-y-4">
                {blogsData.slice(0, 4).map((b, i) => (
                  <Link
                    key={i}
                    to={`/blog/${b.slug}`}
                    className="flex items-center gap-4 border-b border-[#eeeeee] pb-4 last:border-b-0 group"
                  >
                    {/* Blog Thumbnail */}
                    <div className="w-[85px] h-[75px] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p className="font-semibold text-[#111111] group-hover:text-[#c19417] transition leading-6 text-[15px] line-clamp-2">
                        {b.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{b.date}</p>
                    </div>
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