<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";

const router = useRouter();
const genre = ref(16);
const search = ref("");
const movies = ref(null);
const page = ref(1);
const currentURL = ref("");
const totalPages = ref("------");
const showModal = ref(false);
const selectedRecordId = ref(0);
const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = id;
};
const getTMDBData = async (url, options, page) => {
  movies.value = (
    await axios.get(url, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        region: "US",
        language: "en",
        include_adult: false,
        page,
        ...options,
      },
    })
  ).data;
  totalPages.value = movies.value.total_pages;
  currentURL.value = url;
};
</script>

<template>
  <img id="background" :src="`https://wallpapercave.com/wp/wp3354898.jpg`" />
  <div class="header-container header-items">
    <h1>Browse Trending Movies</h1>
    <p id="divider">⋆⁺｡˚⋆˙‧₊✩₊‧˙⋆˚｡⁺⋆⁺｡˚⋆˙‧₊✩₊‧˙⋆˚｡⁺⋆⁺｡˚⋆˙‧₊✩₊‧˙⋆˚｡⁺⋆⁺｡˚⋆˙‧₊✩₊‧˙⋆˚｡⁺⋆⁺｡˚⋆˙‧₊✩₊‧˙⋆˚｡⁺⋆⁺｡˚⋆˙‧₊✩₊‧˙⋆˚｡⁺⋆</p>
    <div class="header-items">
      <div class="controls">
        <div>
          <input
            id="search-bar"
            type="search"
            placeholder="Search for a Movie"
            v-model="search"
          />
          <button
            id="search-button"
            @click="
              getTMDBData('https://api.themoviedb.org/3/search/movie', {
                query: search,
              })
            "
          >
            Search
          </button>
        </div>
        <div>
          <select id="selector-box" v-model="genre">
            <option value="16">Animation</option>
            <option value="53">Thriller</option>
            <option value="35">Comedy</option>
            <option value="27">Horror</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
          </select>
          <button
            id="selector-button"
            @click="
              getTMDBData('https://api.themoviedb.org/3/discover/movie', {
                with_genres: genre,
              })
            "
          >
            Sort
          </button>
        </div>
        <button id="cart-button" @click="router.push('/cart')">Cart</button>
      </div>
    </div>

    <div class="pagination">
      <button
        @click="
          getTMDBData(
            currentURL,
            {
              query: search,
            },
            page === 1 ? 1 : page--
          )
        "
      >
        Prev
      </button>
      <p>{{ `Page ${page} of ${totalPages}` }}</p>
      <button
        @click="
          getTMDBData(
            currentURL,
            {
              query: search,
            },
            page >= totalPages ? totalPages : page++
          )
        "
      >
        Next
      </button>
    </div>
  </div>
  <div v-if="movies" class="tiles">
    <div v-for="movie in movies.results" :key="movie.id" class="tile">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        @click="toggleModal(movie.id)"
      />
    </div>
  </div>

  <Modal v-if="showModal" :id="selectedRecordId" @toggleModal="toggleModal()" />
</template>

<style scoped>
 /* makes stars sparkle but website too slow ): */
/* @-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 40px #d4ce89, 0 0 60px #e5b30f;
  }
  
  to {
    text-shadow: 0 0 20px #fff, 0 0 60px #d8bbf4eb, 0 0 70px #a98beb;
  }
} */

#divider {
  text-align:justify;
  /* animation: glow 2s ease-in-out infinite alternate; */
  margin-top: -35px;
  margin-bottom: -20px;
  color: #d4bc6d;
  font-size: 30px;
  /* filter: drop-shadow(20px 20px 500px #d4bc6d); */
}
.controls {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  padding: 25px ;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
}

.header-items {
  display: fixed;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#cart-button {
  background-color: #d4bc6d;
  border-color: #d4bc6dc4;
  background-image: url("https://icons8.com/icon/85080/shopping-cart");
}

#selector-button {
  background-color: rgba(244, 210, 252, 0.75);
  border-color: rgba(240, 199, 249, 0.466);
}

#selector-button:hover {
  background-color: rgba(240, 199, 249, 0.591);
}

.pagination:hover {
  background-color: rgba(244, 210, 252, 0.75);
}

#search-bar {
  border-radius: 10px;
  background-color: #afc6ffd6;
  color: white;
  padding: 1rem;
  font-family: "Chivo", sans-serif;
  border-color: #afc6ff;
}

#selector-box {
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0);
  padding: 1rem;
  font-size: 1rem;
  background-color: rgba(244, 210, 252, 0.521);
  color: white;
  filter: drop-shadow(-10px 10px 20px #827397);
  font-family: "Chivo", sans-serif;
}

h1 {
  color: aliceblue;
  font-family: "Chivo", sans-serif;
  font-size: 45px;
  padding: 5px;
}

button:hover {
  background-color: #afc6ffa8;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

button {
  font-family: "Chivo", sans-serif;
  padding: 5px;
  border-radius: 10px;
  border-color: #afc6ff;
  background-color: #afc6ff;
  color: white;
  font-size: 1=20px;
  width: 100px;
  height: 50px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
  filter: drop-shadow(-10px 10px 20px #827397);
}
.tiles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  margin-left: 30px;
}

img {
  width: 250px;
}

img:hover {
  background-color: #e6e690;
  color: white;
  filter: drop-shadow(5px 10px 50px #d4bc6d);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
}

#background {
  filter: grayscale(10%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.tiles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  margin-left: 30px;
}

img {
  width: 220px;
}

.pagination {
  z-index: 1;
  left: 32%;
  right: 32%;
  text-align-last: center;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  position: fixed;
  bottom: 20px;
  gap: 1rem;
  align-self: center;
  filter: drop-shadow(-10px 10px 20px #827397);
  font-family: "Chivo", sans-serif;
  color: white;
  background-color: rgba(244, 210, 252, 0.5);
}
.controls {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>
