<template>
  <div class="col-4">
    <a
      ><img class="card__image loading" v-bind:src="'https://friendly-pink-pantyhose.cyclic.app/uploads/' + imageurl" alt="" /> </a>
    <a href="" id="special2">
      <h4 id="special1"  :class="this.$store.getters.getrest == 0 ? 'card__title loading' : 'light-theme'">
        <router-link
          :to="{ name: 'productCatagory', query: { productid: id } }"
          >{{ name }}</router-link
        >
      </h4>
    </a>
    <div class="rating">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="far fa-star"></i>
    </div>
    <div class="line">
      <p   :class="this.$store.getters.getrest == 0 ? 'price_title loading' : 'light-theme'">
        {{ price }} ETB
      </p>
      <p   :class="this.$store.getters.getrest == 0 ? 'icon_title loading' : 'light-theme'"           @click="likeproduct" :style="[this.message=='found'?{'color':'red'}:{'color':'black'}]">
        <i
          v-if="!isadminpage"
          class="fa fa-heart"
          aria-hidden="true"
          id="space"
        ></i>
      </p >
       <p  :class="this.$store.getters.getrest == 0 ? 'icon_title loading' : 'light-theme'" >
        <router-link :to="{ name: 'productCatagory', query: { productid: id } }"
        >
        <i v-if="!isadminpage" class="fa fa-eye" aria-hidden="true"></i >
        </router-link>
       </p>
     

      <p :class="this.$store.getters.getrest == 0 ? 'icon_title loading' : 'light-theme'"  @click="addtocart" :style="[this.message1=='added'?{'color':'green'}:{'color':'black'}]">
        <i
          v-if="!isadminpage"
          class="fa fa-shopping-cart"
          aria-hidden="true"
        ></i>
      </p>
      <i
        v-if="isadminpage"
        class="fa fa-edit"
        aria-hidden="true"
        id="hidden"
      ></i>
      <a @click="deletes"
        ><i
          v-if="isadminpage"
          class="fa fa-trash"
          aria-hidden="true"
          @click="next"
        ></i
      ></a>
    </div>
  </div>
  </template>

<script>
import axios from "axios";
import router from "../index.js";
export default {
  name: "productPage",
  components: {},
  props: {
    imageurl: String,
    isadminpage: Boolean,
    name: String,
    price: String,
    id: String,
    sellerid: String,
  },
  async created() {
    this.concat = "https://friendly-pink-pantyhose.cyclic.app/uploads/" + this.imageurl;
    this.token = localStorage.getItem("token");
  },
  data() {
    return {
      concat: "",
      token: "",
      color: "",
      data: [],
      cart: [],
      message:'',
      message1:''
    };
  },
  methods: {
    async deletes() {
      var url = "https://friendly-pink-pantyhose.cyclic.app/product/delete/" + this.id;
      await axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          location.reload();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addtocart() {
      if (localStorage.getItem("isuserauthenticated") == "true") {
        await axios
          .post(
            "https://friendly-pink-pantyhose.cyclic.app/user/addtocart",
            {
              productid: this.id,
              userid: localStorage.getItem("sellerid"),
            })
          .then((response) => {
            
            this.$store.commit("changecartnumbers", response.data.length);
            this.message1 = response.data.message;

          })
          .catch((e) => {
            console.log(e);
          });

          // this.$store.commit('changecartitemsValue',this.data); 
          // this.$store.commit('changecartnumbers',this.data.length); 

      }

      else {
        router.push({
          name: "loginUser",
          query: { logfromhome: "true", googleloghome: "true" },
        });
      }
    },


    async likeproduct() {
      if (localStorage.getItem("isuserauthenticated") == "true") {
        await axios
          .post(
            "https://friendly-pink-pantyhose.cyclic.app/user/like",
            {
              productid: this.id,
              userid: localStorage.getItem("sellerid"),
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then((response) => {
            this.data = response.data.data.wishlists;
            this.$store.commit("changelikesValue", response.data.length);
            this.message = response.data.message;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        router.push({
          name: "loginUser",
          query: { logfromhome: "true", googleloghome: "true" },
        });
      }
    },
  },
};
</script>

<style>
    .card__title.loading {
        height: 1rem;
        width: 50%;
        margin: 1rem;
        border-radius: 3px;
    }
    .icon_title.loading{
        height: 1rem;
        width: 10%;
        margin: 1rem;
        border-radius: 50%;
       }

    .price_title.loading{
        height: 1rem;
        width: 25%;
        margin: 1rem;
        border-radius: 3px;
    }

  .card__image.loading {
			height: 320px;
			width: 330px;
		}
 
     .loading {
            position: relative;
            background-color: #e2e2e2;
        }
       
        /* The moving element */
        .loading::after {
            display: block;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            background: -webkit-gradient(linear, left top,
                        right top, from(transparent), 
                        color-stop(rgba(255, 255, 255, 0.2)),
                        to(transparent));
                          
            background: linear-gradient(90deg, transparent,
                    rgba(255, 255, 255, 0.2), transparent);
       
            /* Adding animation */
            animation: loading 0.8s infinite;
        }
       
        /* Loading Animation */
        @keyframes loading {
            100% {
                transform: translateX(100%);
            }
        }










/* skelton view above */
#special1 {
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  color: darkcyan;
}

#hidden {
  display: none;
}
.col-4 {
  flex-basis: 25%;
  padding: 10px;
  min-width: 200px;
  margin-bottom: 50px;
  transition: transform 0.5s;
}

.col-4 img {
  width: 100%;
}

.title {
  text-align: center;
  margin: 0 auto 80px;
  position: relative;
  line-height: 60px;
  color: #555;
}
.title::after {
  content: "";
  background: #ff523b;
  width: 80px;
  height: 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
}

h4 {
  color: #555;
  font-weight: normal;
}

.col-4 p {
  font-size: 14px;
}

.rating .fas {
  color: #ff523b;
}

.rating .far {
  color: #ff523b;
}

.col-4:hover {
  transform: translateY(-5px);
}
</style>
