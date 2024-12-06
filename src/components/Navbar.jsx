import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  PhotoIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { loading } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon className="w-6 h-6" />,
      path: "/",
    },
    {
      name: "Users",
      icon: <UserIcon className="w-6 h-6" />,
      path: "/users",
    },
    {
      name: "Blogs",
      icon: <DocumentTextIcon className="w-6 h-6" />,
      path: "/blogs",
    },
    {
      name: "Portfolio",
      icon: <PhotoIcon className="w-6 h-6" />,
      path: "/portfolio",
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-4 left-4 z-50 text-gray-600 ${
          isOpen ? "hidden" : ""
        }`}
      >
          <Bars3Icon className="w-8 h-8" />
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 bg-white h-full sm:w-64 bg-sidebar-bg text-sidebar-text 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 z-40
      `}
      >
        <div className="flex justify-between items-center gap-x-4 p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-black">Dashboard</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600"
          >
              <XMarkIcon className="w-8 h-8" />
          </button>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={item.name}
              to={item.path}
              className="flex items-center p-3 hover:bg-sidebar-active rounded-lg mb-2 transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className={`flex items-center p-3 hover:bg-red-700 rounded-lg mt-4 text-red-400 hover:text-white w-full ${
              loading && "cursor-not-allowed opacity-50 bg-red-700"
            }`}
          >
            <ArrowLeftEndOnRectangleIcon className="w-8 h-8 mr-2" />
            {loading ? (
              <div className="w-5 h-5 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Logout"}
          </button>
        </nav>
      </div>

      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default Navbar;
