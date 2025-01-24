import React, { useEffect, useState } from "react";
import baseURl from "./Url";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import axios from "axios";

const Freebook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseURl}/api/books/getBook`, {
        withCredentials: true,
      });
      try {
        setBook(response.data.books);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch books");
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      {/* Add enough padding-top to account for the height of the fixed navbar */}
      <div className="pt-[80px]">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p className="text-gray-600">
            Explore a wide range of free courses designed to enhance your skills
            and knowledge across various domains. Start learning today without
            any cost!
          </p>
        </div>

        <div className="mt-8">
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Freebook;
