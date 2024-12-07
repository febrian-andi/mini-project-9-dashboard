import React from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { TestimonialRow } from "./TestimonialRow";

function TestimonialList() {
  const { data: testimonial, loading, error } = useFetchData("/testimonial");

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
        <h1 className="text-3xl font-bold text-gray-800">
          Testimonial Management
        </h1>
        <Link
          to="/testimonial/add"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          Add Testimonial
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Photo</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Tittle</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {testimonial.data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
            {testimonial.data.map((item, index) => (
              <TestimonialRow
                key={item.id}
                index={index}
                testimonial={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestimonialList;
