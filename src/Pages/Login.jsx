import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const allUsers = JSON.parse(localStorage.getItem("fitverseUsers") || "[]");
    const found = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid credentials. Please check your email or password.");
      return;
    }

    localStorage.setItem("fitverseUser", JSON.stringify(found));
    localStorage.setItem("fitverseAuth", JSON.stringify({ email: found.email }));

    alert(`Welcome back, ${found.firstname || "User"}!`);

    if (found.profileId) navigate("/dashboard");
    else navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 text-white text-center space-y-5 transition-all hover:scale-[1.01] hover:shadow-blue-600/30"
      >
        <h2 className="text-3xl font-bold text-blue-400">Welcome to FitVerse</h2>
        <p className="text-gray-300 text-sm">Log in to track your fitness progress</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 py-2 rounded-lg font-semibold shadow-md transition"
        >
          Login
        </button>

        <div className="flex justify-between mt-4 text-sm text-gray-300">
          <Link to="/forgot-password" className="hover:text-blue-400">
            Forgot Password?
          </Link>
          <Link to="/register" className="hover:text-blue-400">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
