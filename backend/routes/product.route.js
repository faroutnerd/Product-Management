import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();  // Create a new router instance

router.get('/', getProducts);
router.post('/', createProduct); 
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct)

export default router;  // Export the router to be used in other files