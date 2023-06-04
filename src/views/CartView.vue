<template>
  <img
    id="background"
    :src="`https://wallpaper-house.com/data/out/10/wallpaper2you_418284.jpg`"
    alt=""
  />

  <div id="cart-container">
    <div id="movie-list">
      <h1>Your Shopping Cart</h1>
      <div class="movie" v-for="movie in store.cart" :key="movie.id">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
        <h2>{{ movie.title }}</h2>
        <h2>Price: ${{ movie.runtime }}.00</h2>
      </div>
    </div>

    <div id="order-summary">
      <h2>Order Summary</h2>
      <div v-for="movie in store.cart" :key="movie.id">
        <h3>{{ movie.title }}</h3>
        <h2>Price: ${{ movie.runtime }}.00</h2>
      </div>
      <h3>Total: ${{ calculateTotal() }}.00 </h3>
    </div>
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


const calculateTotal = () => {
  return store.cart.reduce((total, movie) => total + movie.runtime, 0);
};

</script>

<style>
#cart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

#movie-list {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.movie {
  width: 75%;
  display: flex;
  justify-content: space-between;
  font-family: "Hind", sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.3);
  filter: blur(20px);
  filter: drop-shadow(-10px 10px 20px #827397);
  padding: 30px;
  border-radius: 10px;
  margin: 0 auto; 
  align-items: center;
  margin-bottom: 20px;
}

img {
  width: 175px;
}

#order-summary {
  width: 40%;
  background-color: rgba(252, 210, 235, 0.25);
  padding: 20px;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  filter: drop-shadow(-10px 10px 20px #827397);
}

h2 {
  font-size: 30px;
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

#order-summary h3:last-child {
  margin-bottom: 0;
}

#order-summary h3:first-child {
  margin-top: 0;
}

#order-summary h3:last-child::before {
  content: "Total: ";
}

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
