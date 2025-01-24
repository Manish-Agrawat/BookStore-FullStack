import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from "./Url";

const UploadBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
    coverImage: null, // for file input
    stock: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0], // Capture the uploaded file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader
    try {
      const response = await axios.post(
        `${baseUrl}/api/books/addBook`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Book uploaded successfully!");
        setFormData({
          title: "",
          author: "",
          price: "",
          category: "",
          description: "",
          coverImage: null,
          stock: "",
        });
      } else {
        toast.error(response.data.message || "Failed to upload the book.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Book</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {/* Author */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
              required
            />
          </div>
          {/* Stock */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
