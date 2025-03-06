<template>
  <div>


    <nav class="navbar navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" style="font-size: 30px;" href="#">SNEAKERS KENI👽</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">¿Te gustó algun modelo?⬇️🔥</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        
      

          <li class="nav-item">
            <p class="nav-link" href="#">PRESIONA EL ICONO Y CONTACTANOS:</p>

            Kevin🥷🏽
            <a href="https://wa.me/573204084054?text=Hola kevin,%20quiero%20más%20información" target="_blank">
            <img style="height: 40px; width: 40px; margin:5px;" src="../assets/wsp.png" alt="">
            </a>

            <br>

            Andres🥷🏽
            <a href="https://wa.me/573209025487?text=Hola Andres,%20quiero%20más%20información" target="_blank">
            <img style="height: 40px; width: 40px; margin:5px;" src="../assets/wsp.png" alt="">
            </a>
            
            <br>
            Instagram Oficial
            <img style="height: 40px; width: 40px; margin:5px;" src="../assets/instagram.png" alt="">

          </li>
   
        
      
        <!-- Usando <router-link> para navegar a la ruta 'Formulario' -->
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/formulario">Formulario</router-link>
        </li> -->
        <!-- Puedes agregar más enlaces aquí para otras rutas -->
      
    
    <!-- Aquí se renderizarán los componentes según la ruta seleccionada -->
    <router-view></router-view>
       

    
        </ul>
      </div>
    </div>
  </div>
</nav>

<br><br><br><br>


<center>
  <img class="imagenkeni" src="../assets/tenis.webp" alt="">
</center>

<br><br><br>


<div class="cards-container">



 

      <div v-for="producto in productos" :key="producto._id">
        <div class="card">
          <img :src="producto.imagen" class="card-img-top" alt="Producto" />
          <div class="card-body">
            <center>
                 <p class="card-text">
            PRODUCTO: {{ producto.nombre }} <br>
            PRECIO: {{ producto.precio }}💸</p>
            </center>
         
          </div>
        </div>
      </div>

  

 
</div>
<br><br>
    



  </div>
</template>





<style>
  .imagenkeni {
    height: 60vh;
    width: 40vw;
  }

  body {
    background-color: #000000;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Espacio entre tarjetas */
    justify-content: center; /* Centra las tarjetas en la fila */
  }

  .card {
    background-color: #000000;
    
    width: 18rem; /* Ajusta el tamaño de la tarjeta */
    color: #fff;
  }

  /* Media query para pantallas más pequeñas como iPhone 14 Pro Max */
  @media screen and (max-width: 431px) {
    .cards-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* 2 tarjetas por fila */
      gap: 8px; /* Espacio entre tarjetas */
      width: 100%; /* Asegura que ocupe todo el espacio disponible */
    }

    .card {
      width: 100%; /* Asegura que las tarjetas se ajusten al ancho de su contenedor */
    }

    .imagenkeni {
      width: 80%; /* Hace que la imagen ocupe todo el ancho disponible */
      height: auto; /* Mantiene la proporción de la imagen */
    }
  }
</style>



<script setup>

import { ref, onMounted } from "vue";
import axios from "axios";

const productos = ref([]); // Almacenará los productos


// Función para obtener los productos desde el backend
const obtenerProductos = async () => {
  try {
    const respuesta = await axios.get("http://localhost:5001/productos");
    
   productos.value = respuesta.data;
 
  } catch (error) {
    console.error("Error al obtener productos", error);
  }
  console.log(productos.value);
  
};

  

// Ejecutar la función al montar el componente
onMounted(obtenerProductos);

</script>
