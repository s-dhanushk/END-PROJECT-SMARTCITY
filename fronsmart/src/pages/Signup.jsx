import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Signup successful! Connect backend later.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">

        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <div className="flex items-center mt-1 border rounded-lg p-2 shadow-sm">
              <User size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <div className="flex items-center mt-1 border rounded-lg p-2 shadow-sm">
              <Mail size={20} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="flex items-center mt-1 border rounded-lg p-2 shadow-sm">
              <Lock size={20} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Create password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700 font-medium">Confirm Password</label>
            <div className="flex items-center mt-1 border rounded-lg p-2 shadow-sm">
              <Lock size={20} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
