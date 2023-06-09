<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="header-container">
    <h1>Totally Legit Movie Site</h1>
    <button @click="router.push('/purchase')">Login</button>
  </div>
  <img
    id="background"
    :src="`https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`"
    alt=""
  />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=Chivo:ital,wght@1,300&family=Hind:wght@300&display=swap");

h1 {
  padding: 30px;
  margin: auto;
  font-size: 50px;
  font-family: "Chivo", sans-serif;
  color: white;
}

.header-container {
  font-size: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  font-family: "Chivo", sans-serif;
  padding: 25px;
  margin-right: 40px;
  border-radius: 15px;
  border-color: #afc6ff;
  background-color: #afc6ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

button:hover {
  background-color: #afc6ffa8;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}
</style>