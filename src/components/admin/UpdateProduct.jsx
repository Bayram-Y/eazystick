import React, { useRef, useState, useEffect } from "react";
import PageTitle from "../PageTitle";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Category, CategoryLabel } from "../../lib/enums/product.enum";
import { useParams, Form } from "react-router-dom";
import { getImageUrl } from "../../lib/utils/imageUrl";

export default function UpdateProduct() {
  const fileInputRef = useRef();
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [language, setLanguage] = useState("");
  const [pages, setPages] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await apiClient.get(`/products/${productId}`);
        const data = res.data;

        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setAuthor(data.author);
        setPublishedDate(data.publishedDate || "");
        setLanguage(data.language || "");
        setPages(data.pages || "");
        setStock(data.stock || "");
        setCategory(data.category || "");

        setPreview(getImageUrl(data.imageUrl));
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    if (productId) getProduct();
  }, [productId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productIdNum = Number(productId);

    try {
      const formData = new FormData();

      if (name?.trim()) formData.append("name", name);
      if (description?.trim()) formData.append("description", description);
      if (price) formData.append("price", price);
      if (author?.trim()) formData.append("author", author);
      if (publishedDate) formData.append("publishedDate", publishedDate);
      if (language?.trim()) formData.append("language", language);
      if (pages) formData.append("pages", pages);
      if (stock) formData.append("stock", stock);

      if (category) formData.append("category", category);

      if (image) {
        if (image.size > 5 * 1024 * 1024) {
          toast.error("Image size must be less than 5MB");
          return;
        }
        formData.append("image", image);
      }

      await apiClient.put(`/admin/update-product/${productIdNum}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-6 py-8 font-primary dark:bg-darkbg">
      <PageTitle title="Update Product" />

      <Form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-40 bg-white dark:bg-gray-700 shadow-lg rounded-xl p-8"
      >
        {/* LEFT - IMAGE */}
        <div className="w-1/2 pr-8 border-r border-gray-400 dark:border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-light">
            Update Image
          </h2>

          <div
            onClick={handleClick}
            className="w-full h-96 border border-dashed border-gray-400 rounded-lg  flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain  rounded-lg"
              />
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-8xl text-gray-400"
                />
                <span className="text-gray-500 mt-2">Click to upload</span>
                <FontAwesomeIcon icon={faUpload} />
              </>
            )}
          </div>

          <span className="text-sm text-gray-500">
            (PNG, JPG, JPEG - max 5MB)
          </span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* RIGHT - INFO */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-light">
            Product Information
          </h2>

          <div className="flex flex-col text-sm text-gray-500">
            {/* NAME */}
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
              required
            />

            {/* DESCRIPTION */}

            <div className="flex flex-col mb-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="p-2 border rounded-md"
                placeholder="Enter description..."
              />

              <p className="text-sm text-gray-500 mt-1">
                {description.length}/500
              </p>
            </div>

            {/* AUTHOR */}
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
              required
            />

            <div className="flex  gap-27">
              {/* CATEGORY */}
              <select
                className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>

                {Object.values(Category).map((cat) => (
                  <option key={cat} value={cat}>
                    {CategoryLabel[cat]}
                  </option>
                ))}
              </select>

              {/* LANGUAGE */}
              <input
                type="text"
                placeholder="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex gap-20">
              {/* PRICE */}
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                required
              />

              {/* DATE */}
              <input
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex gap-20">
              {/* PAGES */}
              <input
                type="number"
                placeholder="Pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
              />

              {/* STOCK */}
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mb-3 p-2 border rounded-md text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 cursor-pointer"
            >
              Update Product
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
