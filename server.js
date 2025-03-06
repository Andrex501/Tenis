import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConexion from "./src/database.js";
import Producto from "./src/models/Producto.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";  // Importar fileURLToPath

// Cargar variables de entorno
dotenv.config();

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Inicializar la app de Express
const app = express();

// Obtener el directorio actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Crear __dirname con fileURLToPath

// Middlewares
app.use(cors()); // Permite solicitudes desde otros dominios (útil para frontend separado)
app.use(express.json({ limit: "10mb" })); // Habilita JSON en las solicitudes con límite de 10MB

// Conectar a MongoDB Atlas
dbConexion();

// Servir archivos estáticos (el frontend compilado por Vite)
app.use(express.static(path.join(__dirname, "dist"))); // Asumiendo que los archivos de Vite están en la carpeta dist

// Ruta para agregar un producto con imagen
app.post("/productos", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const imagenBase64 = req.file.buffer.toString("base64"); // Convertir imagen a Base64

    const nuevoProducto = new Producto({
      nombre,
      precio,
      stock,
      imagen: `data:image/jpeg;base64,${imagenBase64}`,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el producto" });
  }
});

// Ruta para obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 10000;  // Usar el puerto proporcionado por Render
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
