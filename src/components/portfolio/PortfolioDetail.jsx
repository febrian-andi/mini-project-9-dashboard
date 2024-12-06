import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function PortfolioDetail() {
  const id = useParams().id;
  const { data: portfolio, loading, error } = useFetchData(`/portfolio/${id}`);
  
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
        to="/portfolio"
        className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mb-6"
      >
        <ArrowLeftCircleIcon className="w-6 h-6 inline mr-1 align-middle" />
        Back
      </Link>
      <img src={portfolio.data.banner} alt="portfolio" className="mx-auto" />
      <div>
        <h1 className="text-3xl font-bold text-center">
          {portfolio.data.title}
        </h1>
        <p className="text-center text-gray-500">
          {formatDate(portfolio.data.created_at)}
        </p>
      </div>
      <p className="text-center text-gray-500">{portfolio.data.content}</p>
    </div>
  );
}

export default PortfolioDetail;
