import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "./Url";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/books/getBook`, {
          withCredentials: true,
        });
        setBook(response.data.books);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch books");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Make Navbar fixed */}
      <div className="fixed w-full top-0 z-10">
        <Navbar />
      </div>

      {/* Adjust main content to not overlap with the fixed navbar */}
      <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-16 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12 text-gray-600">
            Discover our curated collection of free courses, designed to help
            you learn and grow in your areas of interest. Dive in and start your
            learning journey today!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default Course;
