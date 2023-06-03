<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from "../store/index.js";
import { useRouter } from "vue-router";

const router = useRouter();
const showModal = ref(false);
const selectedRecordId = ref(0);
const store = useStore();

const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = id;
};
</script>
<template>
  <div>
    <img
      id="background"
      :src="`https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99557.jpg?w=1480&t=st=1685754405~exp=1685755005~hmac=dabe7a36b79a0fa6348b82fb1eb6df8a5bef41a98be8992cf0cf7871f91b849f`"
      alt=""
    />
    <div class="header-container">
      <h1>Browse Trending Movies</h1>
      <button @click="router.push('/cart')">CART</button>
    </div>
    <div v-if="store.movies" class="tiles">
      <div v-for="movie in store.movies" class="tile">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`"
          @click="toggleModal(movie.id)"
        />
      </div>
    </div>
  </div>
  <Modal v-if="showModal" :id="selectedRecordId" @toggleModal="toggleModal()" />
</template>

<style scoped>
.header-container {
  padding-bottom: 20px;
  border-bottom: 3px solid #dba4b5;
  margin-top: 5px;
  width: 95%;
}

button:hover {
  background-color: #dba4b5;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 20px;
  border-radius: 10px;
  border-color: #d8b9c3;
  background-color: #d8b9c3;
  color: white;
  font-size: 20px;
  width: 150px;
  height: 70px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

.button-container button:hover {
  background-color: #dba4b5;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  margin-left: 30px;
}

img {
  width: 250px;
}

img:hover {
  background-color: #e6e690;
  color: white;
  filter: drop-shadow(5px 10px 50px #d4bc6d);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
}

h1 {
  color: aliceblue;
  font-family: "Chivo", sans-serif;
  font-size: 50px;
}

#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
