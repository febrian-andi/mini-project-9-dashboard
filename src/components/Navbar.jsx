import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  PhotoIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
            className="flex items-center p-3 hover:bg-red-700 rounded-lg mt-4 text-red-400 hover:text-white w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
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
