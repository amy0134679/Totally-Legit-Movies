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
const emailOne = ref("");
const emailTwo = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");
const passwordThree = ref("");

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("Your passwords do not match!");
    return;
  }
  const { user } = await createUserWithEmailAndPassword(
    auth,
    emailOne.value,
    passwordOne.value
  );
  store.user = user;
  router.push("/purchase");
};
const loginViaEmail = async () => {
  if (
    passwordThree.value !== passwordOne.value ||
    emailOne.value !== emailTwo.value
  ) {
    alert("Your username or password is incorrect!");
    return;
  }
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      emailTwo.value,
      passwordOne.value
    );
    store.user = user;
    const cartDoc = await getDoc(doc(firestore, "carts", user.email));
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      store.cart = cartData.cart;
    }
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};

const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  const cartDoc = await getDoc(doc(firestore, "carts", user.email));
  if (cartDoc.exists()) {
    const cartData = cartDoc.data();
    store.cart = cartData.cart;
  }
  router.push("/purchase");
};
</script>

<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      integrity="sha512-x7+D+xJHXGzP5dU0kHJLGvs2/6HK8nZdjuBSeb2N7RVYl3s8Cch7aRiPrcXyT0ZLH3zY33BJC8uGNOZnyC+IzQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <img
    id="background"
    :src="`https://wallpaper-house.com/data/out/10/wallpaper2you_418284.jpg`"
    alt=""
  />
  <div class="auth-container">
    <div class="sign-in-column">
      <h1>Register via Email</h1>
      <form class="setup" @submit.prevent="registerViaEmail()">
        <input v-model="emailOne" type="email" placeholder="email" />
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
        <input class="login-button" type="submit" value="REGISTER AND LOGIN" />
      </form>
    </div>

    <div class="sign-in-column">
      <h1>Login via Email</h1>
      <form class="login" @submit.prevent="loginViaEmail()">
        <input v-model="emailTwo" type="email" placeholder="Email" />
        <input v-model="passwordThree" type="password" placeholder="Password" />
        <input class="login-button" type="submit" value="LOGIN" />
      </form>
      <h1>Register or Sign in via</h1>
      <button id="google-button" @click="registerViaGoogle()">
        <i class="fab fa-google"></i> Google
      </button>
    </div>
  </div>
</template>
<style scoped>
.login-button {
  font-family: "Chivo", sans-serif;
  padding: 20px;
  border-radius: 10px;
  border-color: #afc6ff;
  background-color: #afc6ff;
  color: white;
  font-size: 15px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

.login-button:hover {
  background-color: #afc6ffa8;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

.sign-in-column {
  padding: 6%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  padding: 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
}

button {
  font-family: "Chivo", sans-serif;
  padding: 20px;
  border-radius: 10px;
  border-color: #afc6ff;
  background-color: #afc6ff;
  color: white;
  font-size: 20px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}

button:hover {
  background-color: #afc6ffa8;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.auth-container {
  justify-tracks: center;
  border-radius: 20px;
  margin: auto;
  padding: 60px 30px;
  font-family: "Chivo", sans-serif;
  color: white;
  background-color: rgba(252, 210, 235, 0.25);
  filter: drop-shadow(-10px 10px 20px #827397);
  margin-top: 200px;
  height: 500px;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.setup,
.login {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

#google-button {
  margin-top: 1rem;
}
</style>
