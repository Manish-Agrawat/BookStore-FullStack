import React from "react";
import { FaInstagram, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div>
        <hr />
        <footer className="footer footer-center  text-base-content rounded p-10">
          <nav className="grid grid-flow-col gap-4">
            <a className="link link-hover">Home</a>
            <a className="link link-hover">Coures</a>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
          </nav>
          <nav>
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
          </nav>
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              <span className="text-pink-500 ml-1">Manish Agrawat</span>
            </p>
          </aside>
        </footer>
      </div>
    </>
  );
};

export default Footer;
