import React from "react";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useDeleteData } from "../../hooks/useDeleteData";
import { useFetchData } from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

export const TestimonialRow = ({ testimonial, index }) => {
  const { deleteData } = useDeleteData(`/testimonial`);
  const { refetch } = useFetchData("/testimonial");

  const handleDelete = () => {
    deleteData(testimonial.id, refetch);
  };

  return (
    <tr
      key={testimonial.id}
      className="border-b border-gray-200 hover:bg-gray-100"
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
      <td className="py-3 px-6 text-left">
        <img src={testimonial.foto_profile} alt={testimonial.name} className="w-10 h-10 rounded-full" />
      </td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{testimonial.name}</span></td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{testimonial.title}</span></td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{testimonial.message}</span></td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center gap-x-4">
          <Link
            to={`/testimonial/${testimonial.id}`}
            className="w-4 mr-2 transform hover:text-sky-500 hover:scale-110"
          >
            <EyeIcon className="w-6 h-6" />
          </Link>
          <Link
            to={`/testimonial/edit/${testimonial.id}`}
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

export default TestimonialRow;
