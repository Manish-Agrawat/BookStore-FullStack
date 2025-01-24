import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authToken } from "../../utils/Authtoken";
import toast from "react-hot-toast";
import baseUrl from "./Url";
import axios from "axios";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authToken();

      setIsAuthenticated(isValid.valid);
      setIsAdmin(isValid.userInfo.isAdmin);
    };
    checkAuth();
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  async function logout() {
    try {
      const response = await axios.get(`${baseUrl}/api/users/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("Logged out successfully");
        setIsAuthenticated(false);
      }
    } catch (error) {}
  }

  const navbarItmen = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/coures">Coures</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      {isAdmin && (
        <li>
          <Link to="/uplode-book">Uplode Book</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div
        className={` max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 ${
          sticky &&
          "sticky-navbar shadow-md bg-base-200 dark:bg-slate-200 dark:text-white duration-300 transition-all ease-in-out z-10"
        }`}
      >
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navbarItmen}
              </ul>
            </div>
            <a className=" text-2xl font-bold cursor-pointer">BookStore</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navbarItmen}</ul>
            </div>
            <div className="hidden md:block">
              <label className="px-3 py-2 border rounded-md flex items-center gap-2">
                <input
                  type="text"
                  className="grow outline-none"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            
            <div>
              {isAuthenticated ? (
                <Link
                  onClick={logout}
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
