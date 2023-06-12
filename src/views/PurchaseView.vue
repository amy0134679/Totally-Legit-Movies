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
const totalPages = ref(0);
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
  <img
    id="background"
    :src="`https://wallpapercave.com/wp/wp3354898.jpg`"/>
     <!-- `https://wallpaperaccess.com/full/340434.png`  -->
  
  <div class="header-container">
    <h1>Browse Trending Movies</h1>
    <div>
      <div class="controls">
        <div>
          <input
            type="search"
            placeholder="Enter search items"
            v-model="search"
          />
          <button
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
            @click="
              getTMDBData('https://api.themoviedb.org/3/discover/movie', {
                with_genres: genre,
              })
            "
          >
            Get
          </button>
          <button @click="router.push('/cart')">Cart</button>
        </div>
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
#selector-box {
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0);
  padding: 1rem;
  font-size: 1rem;
  background-color: rgba(244, 210, 252, 0.75);
  color: white;
  filter: drop-shadow(-10px 10px 20px #827397);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

h1 {
  color: aliceblue;
  font-family: "Chivo", sans-serif;
  font-size: 50px;
}

button:hover {
  background-color: #afc6ffa8;
  color: white;
  filter: drop-shadow(-10px 10px 10px #827397);
}

button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
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
  width: 250px;
}

.pagination {
  z-index: 1;
  left: 35%;
  right: 35%;
  text-align-last: center;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  position: fixed;
  bottom: 20px;
  gap: 1rem;
  align-self: center;
  background-color: rgba(252, 210, 235, 0.75);
}
.controls {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>
