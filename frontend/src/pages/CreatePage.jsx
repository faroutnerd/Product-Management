import { useProductStore } from "@/store/product";
import React from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("success", success);
    console.log("message", message);

    setNewProduct({ name: "",price: "",image: "" });
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh
          handleAddProduct();
        }}
      >
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          name="image"
          type="text"
          placeholder="imageURL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
