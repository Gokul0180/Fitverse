import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import WorkoutPlan from "../components/WorkoutPlan";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("fitverseUser") || "{}");
  const [profile, setProfile] = useState(user?.profile || null);
  const [weightData, setWeightData] = useState(profile?.metrics || []);
  const [tasks, setTasks] = useState(profile?.tasks || {});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [workoutDone, setWorkoutDone] = useState(false);

  const dateKey = (d) => new Date(d).toISOString().split("T")[0];
  const key = dateKey(selectedDate);
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const todayTasks = tasks[key] || [];

  // ✅ Redirect if not logged in or missing profile
  useEffect(() => {
    if (!user?.firstname) navigate("/register");
    else if (!profile) navigate("/profile-setup");
  }, [profile, user, navigate]);

  // ✅ Save updated profile
  const saveProfile = (updated) => {
    const updatedUser = { ...user, profile: { ...profile, ...updated } };
    localStorage.setItem("fitverseUser", JSON.stringify(updatedUser));
    setProfile(updatedUser.profile);
  };

  const addWeight = () => {
    if (!newWeight) return;
    const newEntry = { date: key, weight: parseFloat(newWeight) };
    const updatedMetrics = [...(profile.metrics || []), newEntry];
    setWeightData(updatedMetrics);
    saveProfile({ metrics: updatedMetrics });
    setNewWeight("");
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = {
      ...tasks,
      [key]: [...todayTasks, { text: newTask, completed: false }],
    };
    setTasks(updatedTasks);
    saveProfile({ tasks: updatedTasks });
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedDay = [...todayTasks];
    updatedDay[index].completed = !updatedDay[index].completed;
    const updatedTasks = { ...tasks, [key]: updatedDay };
    setTasks(updatedTasks);
    saveProfile({ tasks: updatedTasks });
  };

  // ✅ Add or toggle workout completion
  const toggleWorkoutDone = () => {
    const workoutText = `Workout - ${dayName}`;
    let updatedTasks = { ...tasks };
    let updatedToday = [...todayTasks];

    if (workoutDone) {
      // Remove workout task if unchecked
      updatedToday = updatedToday.filter((t) => t.text !== workoutText);
    } else {
      // Add workout task as completed
      updatedToday.push({ text: workoutText, completed: true });
    }

    updatedTasks[key] = updatedToday;
    setWorkoutDone(!workoutDone);
    setTasks(updatedTasks);
    saveProfile({ tasks: updatedTasks });

    // ✅ Save the date of workout done
    localStorage.setItem("fitverseWorkoutDate", new Date().toISOString().split("T")[0]);
  };

  // ✅ Auto-reset workout done each day
  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("fitverseUser") || "{}");
    const todayTasks = stored?.profile?.tasks?.[todayKey] || [];
    const hasWorkout = todayTasks.some((t) => t.text.startsWith("Workout - "));
    setWorkoutDone(hasWorkout);
  }, []);

  const completed = Object.values(tasks).flat().filter((t) => t.completed).length;
  const total = Object.values(tasks).flat().length || 1;
  const completionRate = ((completed / total) * 100).toFixed(1);

  const quotes = [
    "Push harder than yesterday if you want a different tomorrow.",
    "Progress is progress, no matter how small.",
    "Stay disciplined. Stay unstoppable.",
    "You’re stronger than your excuses.",
    "Consistency builds greatness.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white py-10 px-6 flex justify-center">
      <div className="max-w-7xl w-full grid lg:grid-cols-3 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 transition-all hover:shadow-blue-600/30 hover:scale-[1.01]">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold">
                Welcome back,{" "}
                <span className="text-blue-400">{user.firstname}</span> 👋
              </h2>
              <p className="text-gray-300 italic mt-2">"{randomQuote}"</p>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 text-white px-5 py-2 rounded-lg font-medium shadow-md"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Goal", value: profile?.goal || "Not set" },
              { label: "Workout Type", value: profile?.workoutType || "Not set" },
              { label: "Diet Type", value: profile?.dietType || "Not set" },
              {
                label: "Weight",
                value: weightData.length
                  ? `${weightData[weightData.length - 1].weight} kg`
                  : "-- kg",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 bg-white/10 rounded-2xl border border-white/20 text-center hover:scale-105 transition-all"
              >
                <p className="text-sm text-gray-400">{item.label}</p>
                <h4 className="text-xl font-semibold text-blue-300 mt-1">
                  {item.value}
                </h4>
              </div>
            ))}
          </div>

          {/* Weight Input */}
          <div className="flex items-center gap-3 mt-8">
            <input
              type="number"
              placeholder="Enter today's weight (kg)"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="border border-gray-400/40 bg-white/10 text-white px-3 py-2 rounded-lg w-60 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addWeight}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 px-4 py-2 rounded-lg font-medium shadow-lg"
            >
              Add
            </button>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* Weight Progress */}
            <div className="bg-white/10 rounded-2xl border border-white/20 p-4 hover:shadow-blue-500/20 transition-all">
              <h4 className="font-semibold mb-3 text-blue-300">Weight Progress</h4>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#00E5FF" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#00C49F"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Task Completion */}
            <div className="bg-white/10 rounded-2xl border border-white/20 p-4 hover:shadow-purple-500/20 transition-all">
              <h4 className="font-semibold mb-3 text-purple-300">
                Task Completion ({completionRate}%)
              </h4>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={[
                      { name: "Completed", value: completed },
                      { name: "Pending", value: total - completed },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#a78bfa" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 transition-all hover:shadow-indigo-600/30 hover:scale-[1.01] flex flex-col justify-between">
          {/* Calendar */}
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-inner">
            <Calendar
              onClickDay={setSelectedDate}
              value={selectedDate}
              className="!w-full custom-calendar"
            />
          </div>

          {/* Tasks */}
          <div className="mt-6">
            <h5 className="font-semibold mb-3 text-blue-300">
              Tasks on {selectedDate.toDateString()}
            </h5>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
                className="border border-gray-400/40 bg-white/10 text-white px-3 py-2 rounded-lg w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addTask}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 rounded-lg font-medium"
              >
                +
              </button>
            </div>
            <ul className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {todayTasks.length ? (
                todayTasks.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center bg-white/10 rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition"
                  >
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(i)}
                      className="mr-2 accent-blue-500"
                    />
                    <span
                      className={`flex-1 ${
                        t.completed ? "line-through text-gray-400" : "text-white"
                      }`}
                    >
                      {t.text}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic text-sm">
                  No additional tasks yet. Stay consistent 💪
                </li>
              )}
            </ul>
          </div>

          {/* Workout Plan + Checkbox */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-purple-300">Today's Workout</h5>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={workoutDone}
                  onChange={toggleWorkoutDone}
                  className="accent-purple-500"
                />
                Done
              </label>
            </div>
            <WorkoutPlan
              goal={profile?.goal}
              type={profile?.workoutType}
              day={dayName}
              dietType={profile?.dietType}
            />
          </div>
        </div>
      </div>

      {/* Calendar & Tooltip Styling */}
      <style>{`
        .custom-calendar {
          background: rgba(255,255,255,0.05) !important;
          color: white;
          border: none;
          font-family: 'Inter', sans-serif;
        }
        .react-calendar__tile {
          color: white;
          background: transparent;
        }
        .react-calendar__tile--active {
          background: linear-gradient(135deg, #2563eb, #7c3aed) !important;
          color: white !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
