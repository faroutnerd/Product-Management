import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';
import fileUpload from 'express-fileupload';


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(path.resolve(), 'temp'),
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  })
);

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});