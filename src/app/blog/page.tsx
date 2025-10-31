"use client";

import React from "react";
import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Blog } from "@/types/api";

function BlogCard({ blog }: { blog: Blog }) {
  const { t, language } = useLanguage();

  const extractTextFromHtml = (html: string, maxLength: number = 150) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Get title and description based on current language
  const getBlogTitle = () => {
    if (language === "tr") {
      return blog.titleTr || blog.titleEn || "Başlık Bulunamadı";
    } else {
      return blog.titleEn || blog.titleTr || "Title Not Found";
    }
  };

  const getBlogDescription = () => {
    if (language === "tr") {
      return blog.descriptionTr || blog.descriptionEn || "";
    } else {
      return blog.descriptionEn || blog.descriptionTr || "";
    }
  };

  const title = getBlogTitle();
  const description = getBlogDescription();
  const readingTime = blog.readingTime || 1;

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {extractTextFromHtml(description)}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="text-gray-400">
            {readingTime} {t.blog.minutes}
          </span>
        </div>

        <Link
          href={`/blog/${blog.blogId}`}
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          {t.blog.readMore}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
function BlogLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
        >
          <div className="aspect-video w-full bg-gray-300"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const { t } = useLanguage();
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.blog.title}
            </h1>
            <p className="text-xl text-gray-600">{t.blog.loadingBlogs}</p>
          </div>
          <BlogLoading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.blog.title}
            </h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-700">{t.blog.errorLoadingBlogs}</p>
              <p className="text-red-600 text-sm mt-2">{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.blog.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <p className="text-gray-500 text-lg">{t.blog.noBlogs}</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.blogId} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
