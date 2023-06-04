import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    movies: [],
    cart: [],
  }),
  actions: {
    addToCart(poster, title, runtime) {
      this.cart.push({
        poster,
        title,
        runtime,
      });
      console.log(this.cart);
    }
  }
})