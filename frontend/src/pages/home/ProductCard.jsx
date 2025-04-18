import { useProductStore } from "@/store/product";
import React, { useState, useRef } from "react";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [updatedData, setUpdatedData] = useState({
    name: product.name,
    price: product.price,
    image: null,
  });
  const fileInputRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleDeleteProduct = async (pid) => {
    setIsDeletingLoading(true);
    try {
      const { success, message } = await deleteProduct(pid);
      if (success) {
        showToast("Product deleted successfully!", "success");
      } else {
        showToast(message || "Failed to delete product", "error");
      }
    } catch (error) {
      showToast("An error occurred", "error");
    } finally {
      setIsDeletingLoading(false);
    }
  };

  const handleUpdateProduct = async (pid) => {
    if (isUpdating) {
      setIsUpdatingLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", updatedData.name);
        formData.append("price", updatedData.price);
        if (updatedData.image) {
          formData.append("image", updatedData.image);
        }

        const { success, message } = await updateProduct(pid, formData);
        if (success) {
          showToast("Product updated successfully!", "success");
          setIsUpdating(false);
        } else {
          showToast(message || "Failed to update product", "error");
        }
      } catch (error) {
        showToast("An error occurred", "error");
      } finally {
        setIsUpdatingLoading(false);
      }
    } else {
      setIsUpdating(true);
    }
  };

  const handleImageClick = () => {
    if (!isUpdatingLoading) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900 p-4 flex flex-col space-y-4 hover:shadow-lg dark:hover:shadow-gray-700 transition duration-300 max-w-sm mx-auto">
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

      {/* Image Section */}
      <div className="w-full h-48 rounded-lg overflow-hidden relative">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-2">
        {isUpdating ? (
          <>
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Product Name"
            />
            <input
              type="number"
              value={updatedData.price}
              onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Price"
            />
            <div>
              <div
                onClick={handleImageClick}
                className={`w-full h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300 ${
                  isUpdatingLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {updatedData.image ? (
                  <img
                    src={URL.createObjectURL(updatedData.image)}
                    alt="Selected"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-2xl text-gray-400 dark:text-gray-300">+</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Upload Image
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.files[0] })}
                className="hidden"
                disabled={isUpdatingLoading}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">Price: ₹{product.price}</p>
          </>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => handleUpdateProduct(product._id)}
          disabled={isUpdatingLoading}
          className={`flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200 ${isUpdatingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUpdatingLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            isUpdating ? "Save" : "Update"
          )}
        </button>
        <button
          onClick={() => handleDeleteProduct(product._id)}
          disabled={isDeletingLoading}
          className={`flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200 ${isDeletingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isDeletingLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;