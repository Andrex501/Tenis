import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 👈 Cargar dotenv

console.log("🔍 URI de MongoDB:", process.env.CNX_MONGO); // 👈 Imprime la URI para verificar

const dbConexion = async () => {
  try {
    if (!process.env.CNX_MONGO) {
      throw new Error("❌ No se encontró la variable CNX_MONGO en .env");
    }

    await mongoose.connect(process.env.CNX_MONGO, {});
    console.log("✅ Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  }
};

export default dbConexion;
