import React, { useState } from "react";
import axios from "axios";
import baseUrl from "./Url";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/reset-password`,
        { token, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword" className="block mb-2 font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // Disable input when loading
            required
          />
          <label
            htmlFor="confirmPassword"
            className="block mt-4 mb-2 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading} // Disable input when loading
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 duration-200 flex items-center justify-center"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
