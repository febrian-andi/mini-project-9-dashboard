import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../utils/formatDate";
import { useFetchData } from "../../hooks/useFetchData";
import { useDeleteData } from "../../hooks/useDeleteData";

export const BlogsRow = ({ blog, index }) => {
  const { deleteData } = useDeleteData("/blogs");
  const { refetch } = useFetchData("/blogs");

  const handleDelete = () => {
    deleteData(blog.id, refetch);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
      <td className="py-3 px-6 text-left">{formatDate(blog.created_at)}</td>
      <td className="py-3 px-6 text-left">{blog.title}</td>
      <td className="py-3 px-6 text-left">
        {blog.published ? (
          <p className="text-center bg-green-500 text-white w-[40px] rounded-2xl p-1 font-semibold">
            Yes
          </p>
        ) : (
          <p className="text-center bg-red-500 text-white w-[40px] rounded-2xl p-1 font-semibold">
            No
          </p>
        )}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center gap-x-4">
          <Link
            to={`/blogs/${blog.id}`}
            className="w-4 mr-2 transform hover:text-sky-500 hover:scale-110"
          >
            <EyeIcon className="w-6 h-6" />
          </Link>
          <Link
            to={`/blogs/edit/${blog.id}`}
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
          >
            <PencilIcon className="w-6 h-6" />
          </Link>
          <button
            onClick={handleDelete}
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogsRow;
