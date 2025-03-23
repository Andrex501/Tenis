import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  marca: String,
  precio: Number,
  stock: Number,
  imagen: String,
});

const Producto = mongoose.model("Producto", ProductoSchema);
export default Producto; 
