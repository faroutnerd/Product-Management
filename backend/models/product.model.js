import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Stores Cloudinary URL
  public_id: { type: String }, // Stores Cloudinary public_id for deletion
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;