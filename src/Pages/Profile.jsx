// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";

export default function Profile() {
  const auth = JSON.parse(localStorage.getItem("fitverseAuth")) || null;
  const users = JSON.parse(localStorage.getItem("fitverseUsers") || "[]");
  const user = users.find((u) => u.id === auth?.userId);

  const [profile, setProfile] = useState(user || null);

  useEffect(() => {
    setProfile(user);
  }, [auth]);

  if (!profile) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No Profile Found</h2>
        <p className="text-gray-500">Please complete your profile first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Profile Information
      </h2>

      {/* Basic Info */}
      <div className="space-y-3">
        <p>
          <strong className="text-gray-700 dark:text-gray-300">Name:</strong>{" "}
          {profile.firstname} {profile.lastname}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-300">Email:</strong>{" "}
          {profile.email}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-300">Goal:</strong>{" "}
          {profile.goal || "Not Set"}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-300">Workout Type:</strong>{" "}
          {profile.type || "Not Set"}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-300">Diet Type:</strong>{" "}
          {profile.dietType || "Not Set"}
        </p>
      </div>

      {/* Progress Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Weight Progress</h3>
        {profile.progress && profile.progress.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
            {profile.progress.map((p, idx) => (
              <li key={idx}>
                {p.date} → {p.weight} kg
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No progress added yet.</p>
        )}
      </div>
    </div>
  );
}
