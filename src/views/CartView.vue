<template>
  <img
    id="background"
    :src="`https://wallpaper-house.com/data/out/10/wallpaper2you_418284.jpg`"
    alt=""
  />

  <h1>Your Shopping Cart</h1>
  <div id="movie" v-for="movie in store.cart" :key="movie.id">
    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
    <h2>{{ movie.title }}</h2>
    <h2>Price: ${{ movie.price }}.00</h2>
    <h2>Runtime: {{ movie.runtime }} minutes</h2>
  </div>
</template>

<script setup>
import { useStore } from "../store/index.js";
import axios from "axios";
const store = useStore();

const fetchMovieDetails = async () => {
  for (const movie of store.cart) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en",
      },
    });
    movie.runtime = response.data.runtime; // Update movie object directly
  }
};

fetchMovieDetails(); // Call the function to fetch movie details
</script>

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
  padding: 30px;
  margin: auto;
  font-size: 50px;
  font-family: "Chivo", sans-serif;
  color: white;
}

img {
  align-items: left;
  width: 175px;
}

#background {
  filter: blur(3px);
}
</style>
