// import vue and vuex
import Vue from 'vue'
import Vuex from 'vuex'

// create our store
export default new Vuex.Store({
  state:{
    message:0,
    likes:0,
    cartitems:[],
    loveditems:[],
    cartnumbers:0,
    restfound:0
  },
  getters: {
    getMessage(state){
      return state.message
    },
    getrest(state){
      return state.restfound
    },
    getlikes(state){
      return state.likes
    },
    getcartitems(state){
      return state.cartitems
     },
     getloveditems(state){
      return state.loveditems
     },
     getcartnumbers(state){
      return state.cartnumbers
     }
  },
  mutations:{
    changeMessageValue(state, message){
      state.message = message
    },
    changerestValue(state, restfound){
      state.restfound = restfound
    },
    changelikesValue(state, likes){
      state.likes = likes
    },
    changecartitemsValue(state, cartitems){
      state.cartitems = cartitems
    },
    changeloveditemsValue(state, loveditems){
      state.loveditems = loveditems
    },
    changecartnumbers(state, cartnumbers){
      state.cartnumbers = cartnumbers
    }
  }

})