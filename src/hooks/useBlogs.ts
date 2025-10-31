import { useState, useEffect } from "react";
import { BlogDirectService } from "@/services/apiServices";
import { Blog } from "@/types/api";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        console.log("useBlogs - Fetching blogs...");

        const blogsData = await BlogDirectService.getPublicBlogs();
        console.log("useBlogs - Received blogs:", blogsData);

        // Debug: Log each blog's properties
        blogsData.forEach((blog, index) => {
          console.log(`useBlogs - Blog ${index}:`, blog);
          console.log(
            `useBlogs - Blog ${index} isActive:`,
            blog.isActive,
            typeof blog.isActive
          );
          console.log(`useBlogs - Blog ${index} titleTr:`, blog.titleTr);
          console.log(`useBlogs - Blog ${index} titleEn:`, blog.titleEn);
        });

        // Filter only active blogs
        const activeBlogs = blogsData.filter((blog) => {
          console.log(
            `useBlogs - Blog "${blog.titleTr || blog.titleEn}" isActive:`,
            blog.isActive
          );
          return blog.isActive === true;
        });
        console.log("useBlogs - Active blogs:", activeBlogs);

        // Sort by date (newest first)
        const sortedBlogs = activeBlogs.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA; // Newest first
        });

        setBlogs(sortedBlogs);
        setError(null);
      } catch (err) {
        console.error("useBlogs - Error fetching blogs:", err);
        setError(err instanceof Error ? err.message : "Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}

export function useBlog(id: number) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("useBlog - Fetching blog with id:", id);

        const blogData = await BlogDirectService.getPublicBlogById(id);
        console.log("useBlog - Received blog:", blogData);

        // Check if blog is active
        if (!blogData.isActive) {
          setError("Blog not found or not active");
          setBlog(null);
        } else {
          setBlog(blogData);
          setError(null);
        }
      } catch (err) {
        console.error("useBlog - Error fetching blog:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  return { blog, loading, error };
}
