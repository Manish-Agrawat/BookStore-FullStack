import React, { useState } from "react";
import Navbar from "./Navbar";
import baseUrl from "./Url";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "./Footer";
import { FaInstagram, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { authToken } from "../../utils/Authtoken";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    const isValid = await authToken();
    if (!isValid.valid) {
      setIsLoading(false);
      return toast.error("You need to login first");
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/contact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
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
    <>
      {/* Fixed Navbar */}
      <div className="fixed w-full top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-16 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
            Get in <span className="text-pink-500">Touch</span> with Us!
          </h1>
          <p className="mt-6 text-gray-600">
            Have questions, feedback, or need assistance? We'd love to hear from
            you. Fill out the form below or reach out to us directly.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading} // Disable input when loading
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading} // Disable input when loading
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading} // Disable input when loading
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 flex items-center justify-center"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              You can also reach out to us directly through the following:
            </p>
            <ul>
              <li className="mb-2">
                <strong>Phone:</strong> +91 98765 43210
              </li>
              <li className="mb-2">
                <strong>Email:</strong> support@example.com
              </li>
              <li className="mb-2">
                <strong>Address:</strong> 123 Main Street, New Delhi, India
              </li>
            </ul>
            <div className="flex flex-row gap-5">
              <a
                href="https://github.com/Manish-Agrawat"
                className="group text-2xl text-gray-700 hover:text-pink-500 "
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/manish_447_/profilecard/?igsh=dWlleXp3M3g1eXVo"
                className="group text-2xl text-gray-700 hover:text-pink-500 "
              >
                <FaInstagram />
              </a>
              <a className="group text-2xl text-gray-700 hover:text-pink-500 ">
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/manish-agrawat/"
                className="group text-2xl text-gray-700 hover:text-pink-500 "
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Contact;
