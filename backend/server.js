import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import Product from './models/product.model.js';  // Assuming you have a Product model defined in models/Product.js

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());  // allow us to accept JSON data in the req.body

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});  // Fetch all products from the database
        res.status(200).json({success: true, data: products});  // Respond with the list of products
    } catch (error) {
        console.log("Error fetching products:", error.message);
        res.status(500).json({success: false, message: 'Server error'});  // Handle server error
    }
});

app.post('/api/products', async (req, res) => {
    const product = req.body;   // Assuming the product data is sent in the request body

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product(product);  // Assuming Product is a Mongoose model

    try {
        await newProduct.save();  // Save the product to the database
        res.status(201).json({success: true, data: newProduct});  // Respond with the created product
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({success: false, message: 'Server error'});  // Handle server error
    }
})

app.delete('/api/products/:id', async (req, res) => {
    const {id} = req.params;  // Extract the product ID from the request parameters
    try {
        await Product.findByIdAndDelete(id);  // Find the product by ID and delete it
        res.status(200).json({success: true, message: 'Product deleted successfully'});  // Respond with success message
    } catch (error) {
        console.log("Error deleting product:", error.message);
        res.status(404).json({success: false, message: 'Product Not Found'}); 
    }
});



app.listen(PORT, (req, res) => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})