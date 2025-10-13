import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProfileSetup from "./Pages/ProfileSetup";
import ProfileEdit from "./Pages/ProfileEdit";
import ForgotPassword from "./Pages/ForgotPassword";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check auth only once on load
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Also re-check when user changes (login, logout, setup)
  useEffect(() => {
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("fitverseUser") || "null");
    const auth = JSON.parse(localStorage.getItem("fitverseAuth") || "null");
    const loggedIn = user && auth && auth.email === user.email;

    setIsLoggedIn(!!loggedIn);
    setHasProfile(!!user?.profileId);
    setCheckedAuth(true);

    // Handle initial redirect only if on root or invalid route
    if (["#/",""].includes(window.location.hash) || location.pathname === "/") {
      if (loggedIn && user?.profileId) {
        navigate("/dashboard", { replace: true });
      } else if (loggedIn && !user?.profileId) {
        navigate("/profile-setup", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  };

  if (!checkedAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg bg-gray-100">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white transition-all">
      {isLoggedIn && <NavBar />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Profile Routes */}
        <Route
          path="/profile-setup"
          element={isLoggedIn ? <ProfileSetup /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-profile"
          element={isLoggedIn ? <ProfileEdit /> : <Navigate to="/login" replace />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              hasProfile ? (
                <Dashboard />
              ) : (
                <Navigate to="/profile-setup" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
