import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);   
// -> mongoose will create a collection called products in the database and the model will be used to interact with that collection. The first argument is the name of the model, and the second argument is the schema. 
export default Product;