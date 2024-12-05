import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import AddUsersPage from "./pages/users/AddUsersPage";
import BlogsPage from "./pages/BlogsPage";
import PortfolioPage from "./pages/PortfolioPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppComponent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { token } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

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
              isAuthenticated ? (
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
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddUsersPage />
              </ProtectedRoute>
            }
          />
  
          {/* Blog Routes */}
          <Route
            path="/blogs"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BlogsPage />
              </ProtectedRoute>
            }
          />

          {/* Portfolio Routes */}
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PortfolioPage />
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
