import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Load user info
  useEffect(() => {
    const fetchUser = () => {
      const auth = JSON.parse(localStorage.getItem("fitverseAuth") || "null");
      const currentUser = JSON.parse(localStorage.getItem("fitverseUser") || "null");
      if (auth && currentUser) setUser(currentUser);
      else setUser(null);
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, [location]);

  // ✅ Dark mode toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("fitverseAuth");
    localStorage.removeItem("fitverseUser");
    navigate("/login");
  };

  const userName = user?.firstname
    ? `${user.firstname} ${user.lastname || ""}`
    : "User";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600/60 via-indigo-600/60 to-purple-600/60 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* ✅ Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="./muscle.png"
            alt="FitVerse Logo"
            className="w-9 h-9 drop-shadow-md group-hover:scale-110 transition-transform"
          />
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent group-hover:opacity-90 transition-all">
            FitVerse
          </span>
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm text-white/90">
                Hello, <b>{userName}</b>
              </span>

              <Link
                to="/dashboard"
                className="hover:text-cyan-300 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/edit-profile"
                className="hover:text-cyan-300 transition"
              >
                Edit Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-400 transition"
              >
                Logout
              </button>

              {/* ✅ Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-300" />
                ) : (
                  <Moon size={18} className="text-gray-200" />
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-cyan-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-cyan-300 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 px-6 py-4 bg-gradient-to-b from-blue-700/80 via-indigo-700/80 to-purple-800/80 backdrop-blur-md border-t border-white/10 shadow-lg text-white animate-slideDown">
          {user ? (
            <>
              <span className="text-sm text-white/90">
                Hello, <b>{userName}</b>
              </span>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/edit-profile"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                Edit Profile
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-300 hover:text-red-400 transition"
              >
                Logout
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="mt-2 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-300" />
                ) : (
                  <Moon size={18} className="text-gray-200" />
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
