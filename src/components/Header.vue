<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>

  <div class="header-container">
    <h1>Movie Site</h1>
    <button @click="router.push('/login')">Login</button>
  </div>
  <img
    id="background"
    :src="`https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99557.jpg?w=1480&t=st=1685754405~exp=1685755005~hmac=dabe7a36b79a0fa6348b82fb1eb6df8a5bef41a98be8992cf0cf7871f91b849f`"
    alt=""
  />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Chivo:ital,wght@1,300&family=Hind:wght@300&display=swap');
 
h1 {
  font-family: 'Chivo', sans-serif;
  font-size: 70px;
}
.header-container {
  font-size: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding:20px;
  margin-left: 10px;
  border-radius: 15px;
  border-color: #d8b9c3;
  background-color: #d8b9c3;
  color: white;
  font-size: 20px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

button:hover {
  background-color: #dba4b5;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

</style>

// font-family: 'Archivo Black';
font-family: 'Hind', sans-serif;