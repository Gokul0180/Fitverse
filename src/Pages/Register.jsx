import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("fitverseUsers") || "[]");

    if (users.find((u) => u.email === form.email)) {
      return alert("User already exists. Please login.");
    }

    const newUser = { ...form, id: form.email, profileId: null };
    users.push(newUser);

    localStorage.setItem("fitverseUsers", JSON.stringify(users));
    localStorage.setItem("fitverseUser", JSON.stringify(newUser));
    localStorage.setItem("fitverseAuth", JSON.stringify({ email: newUser.email }));

    alert("Account created successfully!");
    navigate("/profile-setup", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 text-white text-center space-y-5 transition-all hover:scale-[1.01] hover:shadow-blue-600/30"
      >
        <h2 className="text-3xl font-bold text-blue-400">Join FitVerse</h2>
        <p className="text-gray-300 text-sm">Start your fitness journey today 💪</p>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 py-2 rounded-lg font-semibold shadow-md transition"
        >
          Register
        </button>

        <p className="text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
