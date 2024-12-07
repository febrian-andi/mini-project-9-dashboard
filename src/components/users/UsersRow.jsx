import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useDeleteData } from "../../hooks/useDeleteData";
import { useFetchData } from "../../hooks/useFetchData";
import Swal from "sweetalert2";

function UsersRow({ user, index }) {
  const { refetch } = useFetchData("/users");
  const { deleteData } = useDeleteData("/users");

  const handleDelete = () => {
    deleteData(user.id, refetch);
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "Coming Soon!",
      icon: "info",
    });
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
      <td className="py-3 px-6 text-left">{user.name}</td>
      <td className="py-3 px-6 text-left">{user.email}</td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center gap-x-4">
          <Link to={`/users/${user.id}`} className="w-4 mr-2 transform hover:text-sky-500 hover:scale-110">
            <EyeIcon className="w-6 h-6" />
          </Link>
          <Link to={`/users/edit/${user.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <PencilIcon className="w-6 h-6" />
          </Link>
          <button 
            onClick={handleDelete} 
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UsersRow;
