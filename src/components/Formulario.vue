<template>
    <div>

        <form @submit.prevent="subirProducto">
    <input type="text" v-model="nombre" placeholder="Nombre" required />
    <input type="number" v-model="precio" placeholder="Precio" required />
    <input type="number" v-model="stock" placeholder="Stock" required />
    <input type="file" @change="cargarImagen" required />
    <button type="submit">Subir Producto</button>
  </form>

    </div>
</template>


<script setup>



import { ref } from "vue";


const nombre = ref('');
const precio = ref('');
const stock = ref('');
const imagen = ref(null);

const cargarImagen = (event) => {
  imagen.value = event.target.files[0];
};

const subirProducto = async () => {
  const formData = new FormData();
  formData.append("nombre", nombre.value);
  formData.append("precio", precio.value);
  formData.append("stock", stock.value);
  formData.append("imagen", imagen.value);

  const respuesta = await fetch("https://tenis-7hv3.onrender.com/productos", {
    method: "POST",
    body: formData,
  });

  const datos = await respuesta.json();
  console.log("Producto guardado:", datos);
};

</script>


<style>

body{

    background-color: #000;

}

</style>