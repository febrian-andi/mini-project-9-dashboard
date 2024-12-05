import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import UsersRow from "./UsersRow";
import { Link } from "react-router-dom";

function UsersList() {
  const { data: users, loading, error } = useFetchData("/users");

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <Link
          to="/users/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New User
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.data.map((user, index) => (
              <UsersRow key={user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
