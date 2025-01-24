import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "./Url";
import toast from "react-hot-toast";
import axios from "axios";

const Sing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState("client");
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader
    try {
      const endPoint =
        isAdmin === "admin"
          ? `${baseUrl}/api/users/register-admin`
          : `${baseUrl}/api/users/register`;
      let res = await axios.post(endPoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (
        res.data.message === "User already exists" ||
        "Admin already exists"
      ) {
        toast.error(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit}>
              {/* Close button */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              {/* Full Name */}
              <div className="mt-4 space-y-2">
                <span>Full Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  name="fullName"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Username */}
              <div className="mt-4 space-y-2">
                <span>Username</span>
                <br />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  value={formData.username}
                  onChange={handleChange}
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
                  required
                />
              </div>
              {/* Role Selection */}
              <div className="mt-4 space-y-2">
                <span>Role</span>
                <br />
                <select
                  name="role"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  value={isAdmin}
                  onChange={(e) => {
                    setIsAdmin(e.target.value);
                  }}
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {/* Submit Button */}
              <div className="flex justify-around mt-4">
                <button
                  type="submit"
                  className={`w-32 bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </button>

                <p className="text-xl">
                  Have an account?{" "}
                  <Link
                    to="/login"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sing;
