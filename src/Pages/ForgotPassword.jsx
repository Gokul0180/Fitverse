import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    const users = JSON.parse(localStorage.getItem("fitverseUsers")) || [];
    const matchedUser = users.find((u) => u.email === email);

    if (!matchedUser) {
      return alert("No account found with this email. Please register first.");
    }

    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setStep(2);
    alert(`OTP sent (simulated): ${generatedOtp}`);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) setStep(3);
    else alert("Invalid OTP. Try again.");
  };

  const handleResetPassword = () => {
    if (!newPassword) return alert("Password cannot be empty.");
    const users = JSON.parse(localStorage.getItem("fitverseUsers")) || [];
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("fitverseUsers", JSON.stringify(updatedUsers));
    alert("Password reset successful! Please login with your new password.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-black px-4 py-10">
      <div className="w-full max-w-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-white text-center hover:scale-[1.01] transition-all hover:shadow-blue-600/30">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Forgot Password
        </h2>
        <p className="text-gray-300 text-sm mb-6">
          Don’t worry, we’ll help you reset your password securely.
        </p>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
            />
            <button
              onClick={handleSendOtp}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 hover:opacity-90 transition font-semibold"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <div className="space-y-4">
            <input
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 transition font-semibold"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div className="space-y-4">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/70"
            />
            <button
              onClick={handleResetPassword}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 hover:opacity-90 transition font-semibold"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
