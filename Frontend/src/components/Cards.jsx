import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authToken } from "../../utils/Authtoken";

function Cards({ item }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const [isValid , setIsValid ] = useState(false);

  async function isValid(){
    const res=await authToken();
    setIsValid(res.valid);
  }
  isValid();

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-72 h-[450px] bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure className="h-[180px] overflow-hidden">
            <img
              src={item.coverImage || "./book.jpg"} // Using default image if no coverImage is provided
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </p>
            <div className="mt-2">
              <span
                className="badge badge-secondary text-sm truncate w-28 overflow-hidden"
                title={item.category}
              >
                {item.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {showMore
                ? item.description
                : `${item.description?.slice(0, 100)}...`}
            </p>
            {item.description && (
              <button
                onClick={toggleShowMore}
                className="text-blue-500 mt-2 text-xs hover:underline"
              >
                {showMore ? "Show Less" : "Read More"}
              </button>
            )}
            <div className="card-actions justify-between mt-4">
              <div className="badge badge-outline text-lg">${item.price}</div>
              <Link
                to={isValid ? "/buy" : "/login"}
                state={{
                  title: item.title,
                  author: item.author,
                  price: item.price,
                }}
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
