import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="sticky top-0 z-50 p-4 bg-gray-800 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <Link className="text-xl font-bold text-white" to="/">Phoenix Surveys</Link>
        <div className="hidden space-x-6 md:flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/surveys/public" className="text-gray-300 hover:text-white">Surveys</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white">
                {user.name ?? user.username ?? "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}