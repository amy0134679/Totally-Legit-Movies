<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  if (username.value === "tmdb" && password.value === "movies") {
    router.push("/purchase")
  } else {
    alert("Invalid username/password!")
  }
  console.log(username.value, password.value);
}
</script>

<template>
  <form class="login-container" @submit.prevent="login()">
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <input type="submit" value="Login" />
  </form>
</template>

<style>
.login-container {
  width: 50%;
  display: flex;
  flex-direction: column;
}
</style>
