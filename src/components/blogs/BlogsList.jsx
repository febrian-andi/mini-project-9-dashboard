import React from "react";
import BlogsRow from "./BlogsRow";
import { useFetchData } from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

function BlogsList() {
  const { data: blogs, loading, error } = useFetchData("/blogs");

  if (loading) {
    return (
      <div className="flex space-x-2 justify-center">
        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blogs Management</h1>
        <Link 
          to="/blogs/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create New Blog
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Published</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {blogs.data.map((blog, index) => (
              <BlogsRow key={blog.id} index={index} blog={blog} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlogsList;
