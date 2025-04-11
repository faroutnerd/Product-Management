import { useProductStore } from "../store/product";
import { useEffect } from "react";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return(
    <div>
      {products.length === 0 && (
        <h1>No products found</h1>
      )}
    </div>
  );
};

export default HomePage;