import Product from "../models/product.model.js";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  const file = req.files?.image;

  if (!name || !price || !file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'products',
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    });

    const newProduct = new Product({
      name,
      price,
      image: result.secure_url,
      public_id: result.public_id
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const file = req.files?.image;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product ID' });
  }

  try {
    let updateData = { name, price };
    
    if (file) {
      // Delete old image from Cloudinary
      const product = await Product.findById(id);
      if (product.public_id) {
        await cloudinary.uploader.destroy(product.public_id);
      }
      
      // Upload new image
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'products',
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
      });
      
      updateData.image = result.secure_url;
      updateData.public_id = result.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};