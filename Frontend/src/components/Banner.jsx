import React, { useEffect, useState } from "react";
import { authToken } from "../../utils/Authtoken";
import { Link } from "react-router-dom";

const Banner = () => {
  // Check if user is authenticated, if not redirect to login page.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authToken();
      setIsAuthenticated(isValid.valid);
    };
    checkAuth();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row md:mt-36">
        <div className=" order-2 w-full md:w-1/2 md:order-1">
          <div className="space-y-12">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcomes here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              We will be guiding you through various topics such as technology,
              fashion, travel, and more. Enjoy learning and have fun exploring
              these different worlds! Don't forget to share your knowledge with
              others and have fun learning together!
            </p>
          </div>
          <Link
            to={isAuthenticated ? "/coures" : "/login"}
            className="btn mt-7 btn-secondary"
          >
            Get Started{" "}
          </Link>
        </div>
        <div className=" order-1 w-full md:w-1/2">
          <img
            src="./Banner.png"
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
