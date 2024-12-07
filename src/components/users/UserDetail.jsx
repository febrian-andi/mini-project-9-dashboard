import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function userDetail() {
  const id = useParams().id;
  const { data: user, loading, error } = useFetchData(`/users/${id}`);

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
        to="/users"
        className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mb-6"
      >
        <ArrowLeftCircleIcon className="w-6 h-6 inline mr-1 align-middle" />
        Back
      </Link>
      <div className="flex flex-col justify-center items-center space-y-4">
        <img src={user.user.photo} alt="user" className="mx-auto border border-black h-[200px]" />
        <p>
          <span className="font-bold">Name : </span> {user.user.name}
        </p>
        <p>
          <span className="font-bold">Email : </span> {user.user.email}
        </p>
        <p>
          <span className="font-bold">Phone : </span> {user.user.username}
        </p>
      </div>
      <div className="flex space-x-8 justify-center">
        <a href={user.user.linkedin_url} target="_blank" rel="noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="linkedin"
            className="mx-auto h-12"
          />
        </a>
        <a href={user.user.ig_url} target="_blank" rel="noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
            alt="instagram"
            className="mx-auto h-12"
          />
        </a>
      </div>
    </div>
  );
}

export default userDetail;
