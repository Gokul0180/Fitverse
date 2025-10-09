// src/services/api.js
import axios from "axios";

const API_BASE = "https://68dc31177cd1948060a9b0da.mockapi.io";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ---------------- USERS ----------------
export const createUser = (data) => api.post("/users", data);
export const getUser = (id) => api.get(`/users/${id}`);
export const getUsers = () => api.get("/users");
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// ---------------- PROFILES ----------------
export const createProfile = (data) => api.post("/profiles", data);
export const getProfile = (id) => api.get(`/profiles/${id}`);
export const getProfiles = () => api.get("/profiles");
export const updateProfile = (id, data) => api.put(`/profiles/${id}`, data);
export const patchProfile = (id, data) => api.patch(`/profiles/${id}`, data);
export const deleteProfile = (id) => api.delete(`/profiles/${id}`);

// ---------------- TASKS / METRICS HELPERS ----------------
export const addTaskToProfile = async (profileId, task) => {
  const res = await getProfile(profileId);
  const profile = res.data;
  const tasks = profile.tasks || [];
  tasks.push(task);
  return updateProfile(profileId, { ...profile, tasks });
};

export const appendMetricToProfile = async (profileId, metric) => {
  const res = await getProfile(profileId);
  const profile = res.data;
  const metrics = profile.metrics || [];
  metrics.push(metric);
  return updateProfile(profileId, { ...profile, metrics });
};

// ---------------- WEEKLY PLAN ----------------
export const updateWeeklyPlan = (profileId, weeklyPlan) =>
  patchProfile(profileId, { weeklyPlan });

// ---------------- OTP (demo only) ----------------
export const createOtp = (data) => api.post("/otps", data);
export const getOtp = (id) => api.get(`/otps/${id}`);
export const verifyOtp = async (email, code) => {
  const res = await api.get("/otps");
  const otp = res.data.find((o) => o.email === email && o.code === code);
  return otp ? true : false;
};

export default api;
