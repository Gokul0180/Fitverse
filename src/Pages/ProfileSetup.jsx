import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("fitverseUser") || "null");

  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "weight loss",
    workoutType: "withweight",
    dietType: "veg",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (user.profile) setProfile(user.profile);
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Update current user object
    const updated = { ...user, profile, profileId: Date.now() };
    localStorage.setItem("fitverseUser", JSON.stringify(updated));

    // ✅ Update users list so data persists globally
    const allUsers = JSON.parse(localStorage.getItem("fitverseUsers") || "[]");
    const idx = allUsers.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      allUsers[idx] = updated;
      localStorage.setItem("fitverseUsers", JSON.stringify(allUsers));
    }

    alert("Profile saved successfully!");

    // ✅ Delay slightly to let App.jsx detect the updated profileId
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white space-y-4 text-center transition-transform duration-300 hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Complete Your Profile
        </h2>

        {["age", "height", "weight"].map((field) => (
          <input
            key={field}
            name={field}
            value={profile[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border border-white/30 bg-white/20 text-white w-full p-2 rounded-lg placeholder-white/70 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        ))}

        <select
          name="goal"
          value={profile.goal}
          onChange={handleChange}
          className="border border-white/30 bg-white/20 text-white w-full p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option className="text-gray-900" value="weightloss">Weight Loss</option>
          <option className="text-gray-900" value="weightgain">Weight Gain</option>
          <option className="text-gray-900" value="muscle">Muscle Gain</option>
          <option className="text-gray-900" value="crossfit">CrossFit</option>
        </select>

        <select
          name="workoutType"
          value={profile.workoutType}
          onChange={handleChange}
          className="border border-white/30 bg-white/20 text-white w-full p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option className="text-gray-900" value="withweight">With Weights</option>
          <option className="text-gray-900" value="withoutweight">Without Weights</option>
        </select>

        <select
          name="dietType"
          value={profile.dietType}
          onChange={handleChange}
          className="border border-white/30 bg-white/20 text-white w-full p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option className="text-gray-900" value="veg">Vegetarian</option>
          <option className="text-gray-900" value="nonveg">Non-Vegetarian</option>
        </select>

        <button className="mt-5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 w-full py-2 rounded-lg text-white hover:brightness-110 transition-all duration-300">
          Save Profile
        </button>
      </form>
    </div>
  );
}
