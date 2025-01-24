import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "./Url";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${baseUrl}/api/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            {/* Username */}
            <div className="mt-4 space-y-2">
              <span>UserName</span>
              <br />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading} // Disable input while loading
                required
              />
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading} // Disable input while loading
                required
              />
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading} // Disable input while loading
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-blue-500 underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <div className="flex justify-around mt-4 items-center">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 flex items-center justify-center"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
