import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "./redux/auth/authSlice";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import useTokenManager from "./hooks/UseTokenManager";

import UsersPage from "./pages/users/UsersPage";
import AddUsersPage from "./pages/users/AddUsersPage";
import EditUserPage from "./pages/users/EditUsersPage";

import BlogsPage from "./pages/blogs/BlogsPage";
import AddBlogsPage from "./pages/blogs/AddBlogsPage";
import EditBlogsPage from "./pages/blogs/EditBlogsPage";
import BlogsDetailPage from "./pages/blogs/BlogsDetailPage";

import PortfolioPage from "./pages/portfolio/PortfolioPage";
import AddPortfolioPage from "./pages/portfolio/AddPortfolioPage";
import EditPortfolioPage from "./pages/portfolio/EditPortfolioPage";
import PortfolioDetailPage from "./pages/portfolio/PortfolioDetailPage";

import TestimonialPage from "./pages/testimonial/TestimonialPage";
import AddTestimonialPage from "./pages/testimonial/AddTestomialPage";
import EditTestimonialPage from "./pages/testimonial/EditTestomialPage";
import TestimonialDetailPage from "./pages/testimonial/TestimonialDetailPage";
import UsersDetailPage from "./pages/users/UsersDetailPage";

function AppComponent() {
  useTokenManager();

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch, token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isLoginPage && (
        <header>
          <Navbar />
        </header>
      )}
      <main className="flex-grow">
        <Routes>
          
          {/* Login Route */}
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Home Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute >
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute >
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute >
                <AddUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute >
                <EditUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute >
                <UsersDetailPage />
              </ProtectedRoute>
            }
          />
  
          {/* Blog Routes */}
          <Route
            path="/blogs"
            element={
              <ProtectedRoute >
                <BlogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/add"
            element={
              <ProtectedRoute >
                <AddBlogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/edit/:id"
            element={
              <ProtectedRoute >
                <EditBlogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ProtectedRoute >
                <BlogsDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Portfolio Routes */}
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute >
                <PortfolioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio/add"
            element={
              <ProtectedRoute >
                <AddPortfolioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio/edit/:id"
            element={
              <ProtectedRoute >
                <EditPortfolioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio/:id"
            element={
              <ProtectedRoute >
                <PortfolioDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Testimoni Routes */}
          <Route
            path="/testimonial"
            element={
              <ProtectedRoute >
                <TestimonialPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/testimonial/add"
            element={
              <ProtectedRoute >
                <AddTestimonialPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/testimonial/edit/:id"
            element={
              <ProtectedRoute >
                <EditTestimonialPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/testimonial/:id"
            element={
              <ProtectedRoute >
                <TestimonialDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppComponent />
    </Router>
  );
}

export default App;
