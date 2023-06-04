<script setup>
import axios from "axios";
import { useStore } from "../store";

const store = useStore();
const props = defineProps(["id"]);

const movie = (
  await axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
    },
  })
).data;
</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <button @click="$emit('toggleModal')">X</button>
        <div v-if="movie" class="movie-details">
          <div class="poster-container">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            />
          </div>
          <div class="details-container">
            <h1>{{ movie.title }}</h1>
            <h2>{{ movie.release_date }}</h2>
            <p>{{ movie.overview }}</p>
            <h2>Price: ${{ movie.runtime }}.00</h2>
            <h3 @click="store.addToCart(movie.poster_path, movie.title)">
              Add to Cart
            </h3>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
#movie {
  border-radius: 20px;
  margin: auto;
  padding: 50px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.25);
  filter: drop-shadow(-10px 10px 20px #827397);
  margin-top: 500px;
  height: 500px;
  width: 50%;
}

.modal-outer-container {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #000000a8;
  z-index: 5;
}

.modal-outer-container .modal-inner-container {
  font-family: "Hind", sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.3);
  filter: blur(20px);
  filter: drop-shadow(-10px 10px 20px #827397);
  margin-top: 50px;
  height: 400px;
  width: 50%;
  padding: 30px;
  border-radius: 10px;
}

.modal-outer-container .modal-inner-container button {
  position: absolute;
  right: 0px;
  padding: 1rem;
  border: none;
  font-weight: bold;
}

.modal-outer-container .modal-inner-container .icon {
  font-size: 1.25rem;
  color: white;
}

.movie-details {
  display: flex;
}

.poster-container {
  margin-right: 20px;
}

img {
  width: 250px;
}

h1 {
  font-family: "Archivo Black";
  font-size: 35px;
  border-bottom: 3px solid #dba4b5;
  margin-top: 5px;
  width: 100%;
  padding: 2px;
}

p {
  padding-top: 0px;
}

h3 {
  position: absolute;
  right: 10px;
  margin: -30px;
  border-radius: 10px;
  margin-right: 20px;
  font-weight: bold;
  border: 10px;
  background-color: #dba4b5;
  padding: 15px;
}
</style>

// add onclick for the poster to a trailer // add description
