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
   <img
    id="background"
    :src="`https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99557.jpg?w=1480&t=st=1685754405~exp=1685755005~hmac=dabe7a36b79a0fa6348b82fb1eb6df8a5bef41a98be8992cf0cf7871f91b849f`"
    alt=""
  />

  <div>
  <h1>Browse Trending Movies</h1>
    <button @click="router.push('/cart')">Cart</button>
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
button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-right: 10px;
  padding: 20px;
  border-radius: 5px;
  border-color: #d8b9c3;
  background-color: #d8b9c3;
  color: white;
  font-size: 20px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

img {
  width: 250px;
  padding-bottom: 30px;
}
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
 h1 {
  margin: 30px;
  color:aliceblue;
  font-family: 'Chivo', sans-serif;
  font-size: 50px;
 }

</style>
