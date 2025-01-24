import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
