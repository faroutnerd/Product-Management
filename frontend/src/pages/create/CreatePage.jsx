import { useProductStore } from "@/store/product";
import React, { useState, useRef } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef(null);

  const { createProduct } = useProductStore();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      showToast("Please fill all fields", "error");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      const { success, message } = await createProduct(formData);
      
      // Simulate 2-second loading
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (success) {
        showToast("Product created successfully!", "success");
        setNewProduct({ name: "", price: "", image: null });
      } else {
        showToast(message || "Failed to create product", "error");
      }
    } catch (error) {
      showToast("An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    if (!isLoading) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Create Product
        </h1>

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } ${toast.show ? "translate-x-0" : "translate-x-full"}`}
          >
            {toast.message}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          <div>
            <input
              name="name"
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              name="price"
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              disabled={isLoading}
            />
          </div>

          <div>
            <div
              onClick={handleImageClick}
              className={`w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {newProduct.image ? (
                <img
                  src={URL.createObjectURL(newProduct.image)}
                  alt="Selected"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <div className="text-center">
                  <span className="text-4xl text-gray-400 dark:text-gray-300">+</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Upload Image
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
              className="hidden"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-semibold transition duration-300 flex items-center justify-center ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;