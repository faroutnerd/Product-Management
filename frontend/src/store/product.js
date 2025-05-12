import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  darkMode: false,

  toggleTheme: () =>
    set((state) => ({ darkMode: !state.darkMode })),

  setProducts: (products) => set({ products }),

  createProduct: async (formData) => {
    if (!formData.get('name') || !formData.get('price') || !formData.get('image')) {
      return { success: false, message: "Please fill all fields" };
    }

    try {
      const res = await axios.post("/api/products", formData);
      const data = res.data;

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await axios.get("/api/products");
      set({ products: res.data.data });
    } catch (error) {
      console.error("Fetch failed:", error.message);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await axios.delete(`/api/products/${pid}`);
      const data = res.data;

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (pid, formData) => {
    if (!(formData instanceof FormData)) {
      return { success: false, message: "Invalid data format" };
    }

    try {
      const res = await axios.put(`/api/products/${pid}`, formData);
      const data = res.data;

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
