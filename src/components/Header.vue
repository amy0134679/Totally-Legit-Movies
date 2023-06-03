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
 
.header-container {
  font-size: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  width: 150px;
  height: 50px;
}
</style>
