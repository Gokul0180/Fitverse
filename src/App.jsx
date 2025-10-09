import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProfileSetup from "./Pages/ProfileSetup";
import ProfileEdit from "./Pages/ProfileEdit";
import ForgotPassword from "./Pages/ForgotPassword";

export default function App() {
  const user = JSON.parse(localStorage.getItem("fitverseUser") || "null");
  const auth = JSON.parse(localStorage.getItem("fitverseAuth") || "null");
  const isLoggedIn = user && auth && auth.email === user.email;
  const hasProfile = !!user?.profileId;

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-300">
      {isLoggedIn && <NavBar />}

      <Routes>
        {/* Default route based on login + profile */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              hasProfile ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/profile-setup" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Profile routes */}
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
