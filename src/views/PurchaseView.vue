<template>
  <div>
    <img
      id="background"
      :src="`https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`"
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

<style scoped>
.header-container {
  padding-bottom: 20px;
  border-bottom: 3px solid #dba4b5;
  margin-top: 5px;
  width: 95%;
}

button:hover {
  background-color: #afc6ffa8;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 20px;
  border-radius: 10px;
  border-color: #afc6ff;
  background-color: #afc6ff;
  color: white;
  font-size: 20px;
  width: 150px;
  height: 70px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
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
