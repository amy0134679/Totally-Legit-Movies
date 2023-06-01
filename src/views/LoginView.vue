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
   <img
        id="background"
        :src="`https://images8.alphacoders.com/749/749455.png`"
        alt=""
      />

  <form class="login-container" @submit.prevent="login()">
<h2>Sign In</h2>
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <input type="submit" id = "button" value="Login" />
  </form>
</template>

<style>

#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.login-container {
  border-radius: 20px;
  margin: auto;
  padding: 40px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  align-items: center;
  background-color: rgba(252, 210, 235, 0.25);
  filter: drop-shadow(-10px 10px 20px #827397);
  margin-top: 200px;
  height: 400px;
  width: 30%;
  display: flex;
  flex-direction: column;
}

input {
  padding: 15px;
  margin: 10px;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 5px;

}

#button {
  
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-right: 10px;
  border-radius: 5px;
  background-color: #d8b9c3;
  color: white;
  font-size: 20px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

#button:hover {
  background-color: #dba4b5;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

</style>

// change submit into button