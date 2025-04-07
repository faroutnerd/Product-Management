import express from 'express';
import dotenv from 'dotenv';  
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';  // Import product routes

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());  // allow us to accept JSON data in the req.body

app.use('/api/products', productRoutes);

app.listen(PORT, (req, res) => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})