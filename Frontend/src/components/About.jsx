import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed w-full top-0 z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Introduction Section */}
        <div className="mt-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            About <span className="text-pink-500">Us</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Learn more about our mission, values, and the team behind this
            platform.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to provide high-quality courses and resources to
              learners across the globe. We aim to empower individuals to
              achieve their goals and grow professionally in their respective
              fields.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-100 p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              We envision a world where education is accessible to everyone,
              regardless of their location or background. By creating engaging
              content and fostering a supportive community, we aim to bridge the
              gap between learners and knowledge.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800">
            Meet the <span className="text-pink-500">Team</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img
                src="./image.png"
                alt="Team Member 1"
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                John Doe
              </h3>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img
                src="./image.png"
                alt="Team Member 2"
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                Jane Smith
              </h3>
              <p className="text-gray-500 text-sm">Content Strategist</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img
                src="./image.png"
                alt="Team Member 3"
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-800">
                Michael Lee
              </h3>
              <p className="text-gray-500 text-sm">Developer & Designer</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-5">
        <Footer />
      </div>
    </>
  );
}

export default About;
