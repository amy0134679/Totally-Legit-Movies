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
  GithubAuthProvider,
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
  if (passwordThree.value !== passwordOne.value  || emailOne.value !== emailTwo.value) {
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

const registerViaGithub = async () => {
  const provider = new GithubAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  console.log("github signin working")
  // const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
  // store.cart = cart;
  router.push("/purchase");
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
  <img
    id="background"
    :src="`https://wallpaper-house.com/data/out/10/wallpaper2you_418284.jpg`"
    alt=""
  />
  <div class="auth-container">
    <div class="sign-in-column">
      <div>
        <h1>
          Register via <br />
          Google
        </h1>
        <button id="google-button" @click="registerViaGoogle()">Google</button>
      </div>
      <div>
        <h1>
          Register via <br />
          Github
        </h1>
        <button @click="registerViaGithub()">Github</button>
      </div>
    </div>
    <div class="sign-in-column">
      <div>
        <h1>Register via <br />Email</h1>
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
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
    <div>
      <h1>Login via <br />Email</h1>
      <form class="login" @submit.prevent="loginViaEmail()">
        <input v-model="emailTwo" type="email" placeholder="Email" />
        <input v-model="passwordThree" type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.sign-in-column {
  display: flex;
  padding: 6%;
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
  font-family: "Archivo Black", sans-serif;
  margin-right: 10px;
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

/* andy
  const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  console.log("working")
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  const cart  = (await getDoc(doc(firestore, "carts", user.email))).data();
  store.cart = cart;
  router.push("/purchase");
}; */
</style>
