import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "./Url";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BuyNOW = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, author, price } = location.state; // Extract course details from location state

  return (
    <>
      <div className="fixed w-full top-0 z-10">
        <Navbar />
      </div>
      <div className="pt-20 max-w-screen-md container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Buy Course</h1>
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">Author: {author}</p>
          <p className="text-gray-600 mb-4">Price: ₹{price}</p>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
};

export default BuyNOW;
