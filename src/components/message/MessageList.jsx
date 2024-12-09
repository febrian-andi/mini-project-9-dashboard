import React from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { MessageRow } from "./MessageRow";

function messageList() {
  const { data: message, loading, error } = useFetchData("/contact");

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
      <div className="flex justify-start items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Message from Contact
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Website</th>
              <th className="py-3 px-6 text-left">Message</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {message.data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
            {message.data.map((item, index) => (
              <MessageRow
                key={item.id}
                index={index}
                message={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default messageList;
