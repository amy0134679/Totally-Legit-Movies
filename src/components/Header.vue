<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="header-container">
    <h1>My Company</h1>
    <button @click="router.push('/login')">Login</button>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  width: 150px;
  height: 50px;
}
</style>
