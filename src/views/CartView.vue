<script setup>
import { useStore } from "../store/index.js";
const store = useStore();

const calculateTotal = () => {
  return store.cart.reduce((total, movie) => total + movie.runtime, 0);
};
</script>

<template>
  <img
    id="background"
    :src="`https://wallpaper-house.com/data/out/10/wallpaper2you_418284.jpg`"
    alt=""
  />

  <div id="cart-container">
    <div id="movie-list">
      <h1>Your Shopping Cart</h1>
      <div class="movie" v-for="movie in store.cart">
        <div id="column-left">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
        </div>
        <div id="column-left">
          <h2>{{ movie.title }}</h2>
          <h2>Price: ${{ movie.runtime }}.00</h2>
        </div>
      </div>
    </div>

    <div id="order-summary">
      <h2>Order Summary</h2>
      <div v-for="movie in store.cart">
        <div class="summary-item">
          <h3 class="title">{{ movie.title }}</h3>
          <h3 class="price">${{ movie.runtime }}.00</h3>
        </div>
      </div>
      <h2 id="total-cost">Total: ${{ calculateTotal() }}.00</h2>
    </div>
  </div>
</template>

<style scoped>
.summary-item {
  border-bottom: 3px solid #dba4b5;
}

h1 {
  padding: 30px;
  margin: auto;
  font-size: 50px;
  font-family: "Chivo", sans-serif;
  color: white;
}

#column {
  display: flex;
}

#cart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

#movie-list {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.movie {
  width: 80%;
  display: flex;
  font-family: "Hind", sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.3);
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
  margin: 3vw;
  width: 40%;
  background-color: rgba(252, 210, 235, 0.25);
  padding: 20px;
  border-radius: 10px;
  font-family: "Hind", sans-serif;
  color: white;
  filter: drop-shadow(-10px 10px 20px #827397);
}

h2 {
  font-size: 30px;
  margin-bottom: 1px;
  padding-left: 15px;
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin-right: 10px;
}

.price {
  margin-left: 10px;
}
</style>
