<template>
  <div class="paddings">
    <div class="shift">
      <adminnav islistpage="true"/>
    </div>
  </div>
  <div class="small-container">
    <div class="box">
      <select @change="isDisabled">
        <option >ALL Products</option>
        <option >Most Liked</option>
        <option>MAX Price</option>
        <option>Min Price</option>
        <option>Newest</option>
        <option>Oldest</option>
      </select>
    </div>
    <div class="row">
        <producPage v-for="product in this.products" :key="product._id"
        @changeTitle="ChangeT($event)"
        :imageurl="product.productimages[0]"
        isadminpage="true"
        :name="product.name"
        :price="product.price"
        :id="product._id"
         />

    </div>
  </div>

       <div class="pagination_section">
            <a href="#" @click="prev">Previous</a>
            <a href="">{{this.pagenumber}}</a> 
            <a href="#" @click="next">Next >></a>
        </div>
  <footerView />
</template>

<script>
import axios from "axios";
import router from "../index.js";
import adminnav from "./adminnav.vue";
import footerView from "./footerView.vue";
import pagination from "./pagination.vue";
import sidenav from "./sidenav.vue";
import producPage from "./producPage.vue";

export default {
  name: "passwordList",
  components: {
    adminnav,
    footerView,
    pagination,
    sidenav,
    producPage,
  },
  data() {
    return {
      token: "",
      products: [],
      pagenumber:1,
      productnumber:0,
      allowed:1,
      filteroption:"ALL Products"
    };
  },
  
   mounted(){
   setInterval( async function () {
      if(localStorage.getItem("itemsdeleted")== "true"){
      await axios.get("http://localhost:3000/product/getmyproducts/1", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
          this.productnumber = res.data.productnumber;
          this.allowed = this.productnumber/3;
          this.allowed = Math.ceil(this.allowed);
        })
        .catch((err) => {
          console.log(err);
        });
       
       
       localStorage.setItem("itemsdeleted","false");

      }
    }, 1000); 
  },
  
  created() {
     this.$store.commit('changedeleteclickValue',0); 
     var  googleloghome = localStorage.getItem("googleloghome");
         if(googleloghome == "true"){
          localStorage.setItem("isuserauthenticated",true);

              router.push({
              name: "homePage",
              params: { loggedemail: this.loggedemail },
            });
         }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var sellerid = urlParams.get("sellerid");
    var token1 = urlParams.get("token");
    if (sellerid != null) {
      localStorage.setItem("sellerid", sellerid);
    }
    if (token1 != null) {
       localStorage.setItem("token", token1);
         }
     this.token = localStorage.getItem("token");
         this.getmyproducts();
      },
  methods: {
  async  isDisabled(e) {

    if (e.target.value === "Most Liked") {
        var url = "https://friendly-pink-pantyhose.cyclic.app/product/mostliked/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });   

       }



    
    if (e.target.value === "MAX Price") {
        var url = "https://friendly-pink-pantyhose.cyclic.app/product/sortbylargeprice/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });   

       }




    if (e.target.value === "Min Price") {
        var url = "https://friendly-pink-pantyhose.cyclic.app/product/sortbysmallprice/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });   

       }


       if (e.target.value === "Oldest") {
        var url = "https://friendly-pink-pantyhose.cyclic.app/product/sortbyoldest/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });   

       }


      if (e.target.value === "Newest") {
        var url = "https://friendly-pink-pantyhose.cyclic.app/product/sortbynewst/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },

   async next(){
        if(this.pagenumber < this.allowed){
          this.pagenumber = this.pagenumber + 1;    
          }
         var url = "https://friendly-pink-pantyhose.cyclic.app/product/getmyproducts/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      },

     async prev(){
         if(this.pagenumber > 1){
          this.pagenumber = this.pagenumber - 1;
         }
         var url = "https://friendly-pink-pantyhose.cyclic.app/product/getmyproducts/" + this.pagenumber;
         await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });

        },
    
    async getmyproducts() {
      await axios
        .get("https://friendly-pink-pantyhose.cyclic.app/product/getmyproducts/1", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.products = res.data.data;
          this.productnumber = res.data.productnumber;
          this.allowed = this.productnumber/3;
          this.allowed = Math.ceil(this.allowed);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);

html {
  font-family: "Montserrat", Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

button {
  overflow: visible;
}

button {
  text-transform: none;
}

button,
input,
textarea {
  color: #5a5a5a;
  font: inherit;
  margin: 0;
}

input {
  line-height: normal;
}

/* textarea {
  overflow: auto;
} */

#container {
  max-width: 650px;
  margin: 60px auto;
  position: relative;
}

form {
  padding: 37.5px;
  margin: 50px 0;
}

h1 {
  color: #474544;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 7px;
  text-align: center;
  text-transform: uppercase;
}

.underline {
  border-bottom: solid 2px #474544;
  margin: -0.512em auto;
  width: 80px;
}

.icon_wrapper {
  margin: 50px auto 0;
  width: 100%;
}

.icon {
  display: block;
  fill: #474544;
  height: 50px;
  margin: 0 auto;
  width: 50px;
}

.email {
  float: right;
  width: 45%;
}

input[type="text"],
[type="email"],
textarea {
  background: none;
  border: none;
  border-bottom: solid 2px #474544;
  color: #474544;
  font-size: 1em;
  font-weight: 400;
  letter-spacing: 1px;
  margin: 0em 0 1.875em 0;
  padding: 0 0 0.875em 0;
  text-transform: uppercase;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

input[type="text"]:focus,
[type="email"]:focus,
textarea:focus {
  outline: none;
  padding: 0 0 0.875em 0;
}

.message {
  float: none;
}

.name {
  float: left;
  width: 45%;
}

.subject {
  width: 100%;
}

.telephone {
  width: 100%;
}

textarea {
  line-height: 150%;
  height: 150px;
  resize: none;
  width: 100%;
}

::-webkit-input-placeholder {
  color: #474544;
}

:-moz-placeholder {
  color: #474544;
  opacity: 1;
}

::-moz-placeholder {
  color: #474544;
  opacity: 1;
}

:-ms-input-placeholder {
  color: #474544;
}

#form_button {
  background: none;
  border: solid 2px #474544;
  color: #474544;
  cursor: pointer;
  display: inline-block;
  font-family: "Helvetica", Arial, sans-serif;
  font-size: 0.875em;
  font-weight: bold;
  outline: none;
  padding: 20px 35px;
  text-transform: uppercase;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

#form_button:hover {
  background: #474544;
  color: #f2f3eb;
}

@media screen and (max-width: 768px) {
  #container {
    margin: 20px auto;
    width: 95%;
  }
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 26px;
  }

  .underline {
    width: 68px;
  }

  #form_button {
    padding: 15px 25px;
  }
}

@media screen and (max-width: 420px) {
  h1 {
    font-size: 18px;
  }

  .icon {
    height: 35px;
    width: 35px;
  }

  .underline {
    width: 53px;
  }

  input[type="text"],
  [type="email"],
  select,
  textarea {
    font-size: 0.875em;
  }
}
.box {
  text-align: center;
  margin-left: 35px;
  margin-top: 20px;

  transform: translate(-50%, -50%);
}

/* CSS */
#button {
  margin-top: 10px;
  margin-left: 45%;
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
    rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
    rgba(44, 187, 99, 0.15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

#button:hover {
  box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
    rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
    rgba(44, 187, 99, 0.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}

.small-container {
  max-width: 1080px;
  margin: auto;
  padding-left: 25px;
  padding-right: 25px;
}
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}
.title1 {
  text-align: center;
  margin-top: 10px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
