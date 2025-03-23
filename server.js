import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConexion from "./src/database.js";
import Producto from "./src/models/Producto.js";
import multer from "multer";
import path from "path"; // Importa el módulo 'path'
import { fileURLToPath } from 'url'; // Importa fileURLToPath

// Cargar variables de entorno
dotenv.config();

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Inicializar la app de Express
const app = express();

// Middlewares
app.use(cors()); // Permite solicitudes desde otros dominios (útil para frontend separado)
app.use(express.json({ limit: "10mb" })); // Habilita JSON en las solicitudes con límite de 10MB

// Obtener la ruta del directorio actual usando fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB Atlas
dbConexion();

// Ruta para agregar un producto con imagen
app.post("/productos", upload.single("imagen"), async (req, res) => {
    try {
        const { nombre, marca, precio, stock } = req.body;
        const imagenBase64 = req.file.buffer.toString("base64"); // Convertir imagen a Base64

        const nuevoProducto = new Producto({
            nombre,
            marca,
            precio,
            stock,
            imagen: `data:image/jpeg;base64,${imagenBase64}`,
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al guardar el producto:", error); // Agrega un log de error
        res.status(500).json({ error: "Error al guardar el producto" });
    }
});

app.get("/productos", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error); // Agrega un log de error
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 10000;  // Usar el puerto proporcionado por Render
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));