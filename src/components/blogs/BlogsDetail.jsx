import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function BlogsDetail() {
  const id = useParams().id;
  const { data: blog, loading, error } = useFetchData(`/blogs/${id}`);
  
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
    <div className="flex flex-col justify-center space-y-4">
      <Link
        to="/blog"
        className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mb-6"
      >
        <ArrowLeftCircleIcon className="w-6 h-6 inline mr-1 align-middle" />
        Back
      </Link>
      <img src={blog.data.banner} alt="blog" className="mx-auto" />
      <div>
        <h1 className="text-3xl font-bold text-center">
          {blog.data.title}
        </h1>
        <p className="text-center text-gray-500">
          {formatDate(blog.data.created_at)}
        </p>
      </div>
      <p className="text-center text-gray-500">{blog.data.content}</p>
    </div>
  );
}

export default BlogsDetail;
