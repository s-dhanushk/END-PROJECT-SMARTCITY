import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login clicked! You can connect API later.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Smart City Portal
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-6">
          Login to manage village resources & administration
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          
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
                placeholder="Enter password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
