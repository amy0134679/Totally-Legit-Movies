<script setup>
import { useStore } from "../store/index.js";

const store = useStore();
</script>

<template>
  

  <img
        id="background"
        :src="`https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2513.jpg?w=1480&t=st=1685753987~exp=1685754587~hmac=73e09f7524ad5ea1f9bbd3510c1294277b6ee526cb3918ae3252c3b5e77efe49`"
        alt=""
      />

  
  <h1>Your Shopping Cart</h1>
    <div id = "movie" v-for="movie in store.cart">
      
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
      <h2>{{ movie.title }}</h2>
      <h1>{{ movie.budget }}</h1>

    </div>

</template>

<style>

#movie {
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  margin: auto;
  padding: 50px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.25);
  filter: drop-shadow(-10px 10px 20px #827397);
  margin-top: 50px;
  height: 250px;
  width: 50%;
  display: flex;
  flex-direction: column;
}

 h1 {
  margin: auto;
  font-size: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
 }

img {
  align-items: left;
  width: 175px;
  }

#background{
  filter:blur(2px);
}
</style>
