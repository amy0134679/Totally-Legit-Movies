<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";

const store = useStore();
const router = useRouter();
const email = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");
const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("Brozzzzz..... Yer Paswerdz not coolz!");
    return;
  }
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    passwordTwo.value
  );
  store.user = user;
  router.push("/purchase");
};
const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordOne.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};
const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  // const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
  // store.cart = cart;
  router.push("/purchase");
};
</script>

<template>
  <img
    id="background"
    :src="`https://wallpaper-house.com/data/out/10/wallpaper2you_418284.jpg`"
    alt=""
  />
  <div class="auth-container">
    <div class="sign-in-column" >
      <h1>Register via Google</h1>
      <button @click="registerViaGoogle()">Google</button>
    </div>
    <div class="sign-in-column">
      <h1>Register via Email</h1>
      <form class="setup" @submit.prevent="registerViaEmail()">
        <input v-model="email" type="email" placeholder="email" />
        <input
          v-model="passwordOne"
          type="password"
          placeholder="Enter Password"
        />
        <input
          v-model="passwordTwo"
          type="password"
          placeholder="Re-enter Password"
        />
        <input type="submit" value="Register" />
      </form>
      <hr />
      <h1>Login via Email</h1>
      <form class="login" @submit.prevent="loginViaEmail()">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="passwordOne" type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.sign-in-column {
  display:flex;
}
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

input {
  padding: 15px;
  margin: 10px;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
}
#button {
  font-family: 'Archivo Black', sans-serif;  margin-right: 10px;
  border-radius: 5px;
  background-color: #d8b9c3;
  color: white;
  font-size: 20px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}
.auth-container {
  display: flex;
  border-radius: 20px;
  margin: auto;
  padding: 50px;
  font-family: "Archivo Black", sans-serif;
  color: white;
  align-items: center;
  background-color: rgba(252, 210, 235, 0.25);
  filter: drop-shadow(-10px 10px 20px #827397);
  margin-top: 200px;
  height: 400px;
  width: 60%;
  display: flex;
  flex-direction: row;
}
.setup,
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>