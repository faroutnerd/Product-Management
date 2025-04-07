import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if(!newProduct.name || !newProduct.price || !newProduct.image) {
        return {success: false, message: "Please fill all fields"};
    }
    const res = await fetch("/api/products",  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
    const data = await res.json();
    set((state) => ({products: [...state.products, data.data]}))    // check the product.controller response where we are passing 'data' as a response
    return {success: true, message: "Product created successfully"};
  }
}));
