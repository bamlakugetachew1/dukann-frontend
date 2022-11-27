<template>
    
<h3 id="dukann">Dukaan Ethiopia</h3>

<div class="shopping-cart" id="onlyallowed">

  <div class="column-labels">
    <label class="product-image">Image</label>
    <label class="product-details">Product</label>
    <label class="product-price">Price</label>
    <label class="product-removal">Remove</label>
    <label class="product-line-price">Total</label>
  </div>

  <div class="product" v-for="cartitems in this.data" :key="cartitems._id">
    <div class="product-image">
      <img v-bind:src="'http://localhost:3000/uploads/' + cartitems.productimages[0]" alt="productimages">
    </div>
    <div class="product-details">
      <div class="product-title">{{cartitems.name}}</div>
      <p class="product-description" id="product-description1">{{cartitems.description}}</p>
    </div>
    <div class="product-price">{{cartitems.price}}</div>
    <div class="product-removal">
      <button class="remove-product" @click="removefromcart(cartitems._id)">
        Remove
      </button>
    </div>
  </div>

  <div class="totals">
    <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div class="totals-item">
      <label>product sums</label>
      <div class="totals-value" id="cart-shipping">{{this.totalprice}}</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">{{this.totalprice + 15}}</div>
    </div>
  </div>
  <button class="checkout" @click="paywithpaypal" id="checkout">Checkout</button>
</div>
<footerView/>
</template>
<script>
import footerView from "./footerView.vue";
import axios from "axios";
import router from "../index.js";
export default{
    name:"cartPage",
    components:{
        footerView
    },
    created(){
        if (localStorage.getItem("isuserauthenticated") != "true") {
            router.push({
          name: "homePage",
          params: { logfromhome: "true"},
          });                   
           } 

           this.getallcartitems();

    },
    data(){
        return{
             data:[],
             totalprice:0
        }
    },
    methods:{
     async paywithpaypal(){
      document.getElementById("checkout").innerHTML="_______";
      const theButton = document.querySelector(".checkout");
      theButton.classList.add("button--loading");
      await axios.post("http://localhost:3000/user/pay",{
      totalprice:this.totalprice+15
      }).then((response) => { 
         window.location.href =response.data.link;     
        })
        .catch((e) => {
          console.log(e);
        })
     },

     

     async getallcartitems(){
        await axios.post("http://localhost:3000/product/usercartitems", {
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
             this.data = response.data.data;
              for(let i=0; i<this.data.length; i++){
                  this.totalprice += this.data[i].price;
              }
        })
        .catch((e) => {
          console.log(e);
        })
        },
        async removefromcart(productid){
          await axios.post("http://localhost:3000/user/removefromcart", {
           productid:productid,
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
          this.totalprice = 0; 
          this.getallcartitems();
              // this.$store.commit('changeloveditemsValue',response.data.data);          
        })
        .catch((e) => {
          console.log(e);
        });
        }
    

    }
}
</script>

<style  lang="scss">


/*
I wanted to go with a mobile first approach, but it actually lead to more verbose CSS in this case, so I've gone web first. Can't always force things...

Side note: I know that this style of nesting in SASS doesn't result in the most performance efficient CSS code... but on the OCD/organizational side, I like it. So for CodePen purposes, CSS selector performance be damned.
*/

/* Global settings */
$color-border: #eee;
$color-label: #aaa;
$font-default: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, sans-serif;
$font-bold: "HelveticaNeue-Medium", "Helvetica Neue Medium";

/* Global "table" column settings */

#product-description{
     text-align: left;
}

#product-description1{
     text-align: left;
}
.product-image {
  float: left;
  width: 20%;
}
.product-details {
  float: left;
  width: 37%;
}
.product-price {
  float: left;
  width: 12%;
}
.product-quantity {
  float: left;
  width: 10%;
}
.product-removal {
  float: left;
  width: 9%;
}
.product-line-price {
  float: left;
  width: 12%;
  text-align: right;
}

/* This is used as the traditional .clearfix class */
.group:before,
.group:after {
  content: "";
  display: table;
}
.group:after {
  clear: both;
}
.group {
  zoom: 1;
}

/* Apply clearfix in a few places */
.shopping-cart,
.column-labels,
.product,
.totals-item {
  @extend .group;
}

/* Apply dollar signs */
.product .product-price:before,
.product .product-line-price:before,
.totals-value:before {
  content: "$";
}

/* Body/Header stuff */
#onlyallowed {
  padding: 0px 30px 30px 20px;
  font-family: $font-default;
 }

h1 {
  font-weight: 100;
}

label {
  color: $color-label;
}

.shopping-cart {
  margin-top: -45px;
}

/* Column headers */
.column-labels {
  label {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid $color-border;
  }

  .product-image,
  .product-details,
  .product-removal {
    text-indent: -9999px;
  }
}

/* Product entries */
.product {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $color-border;

  .product-image {
    text-align: center;
    img {
      width: 100px;
    }
  }

  .product-details {
    .product-title {
      margin-right: 20px;
      font-family: $font-bold;
    }
    .product-description {
      margin: 5px 20px 5px 0;
      line-height: 1.4em;
    }
  }

  .product-quantity {
    input {
      width: 40px;
    }
  }

  .remove-product {
    border: 0;
    padding: 4px 8px;
    background-color: #c66;
    color: #fff;
    font-family: $font-bold;
    font-size: 12px;
    border-radius: 3px;
  }

  .remove-product:hover {
    background-color: #a44;
  }
}

/* Totals section */
.totals {
  .totals-item {
    float: right;
    clear: both;
    width: 100%;
    margin-bottom: 10px;

    label {
      float: left;
      clear: both;
      width: 79%;
      text-align: right;
    }

    .totals-value {
      float: right;
      width: 21%;
      text-align: right;
    }
  }

  .totals-item-total {
    font-family: $font-bold;
  }
}

.checkout {
  position: relative;
  float: right;
  border: 0;
  margin-top: 20px;
  padding: 6px 25px;
  background-color: #6b6;
  color: #fff;
  font-size: 25px;
  border-radius: 3px;
}

.checkout:hover {
  background-color: #494;
}

.button--loading::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}





/* Make adjustments for tablet */
@media screen and (max-width: 650px) {
  .shopping-cart {
    margin: 0;
    padding-top: 20px;
    border-top: 1px solid $color-border;
  }

  .column-labels {
    display: none;
  }

  .product-image {
    float: right;
    width: auto;
    img {
      margin: 0 0 10px 10px;
    }
  }

  .product-details {
    float: none;
    margin-bottom: 10px;
    width: auto;
  }

  .product-price {
    clear: both;
    width: 70px;
  }

  .product-quantity {
    width: 100px;
    input {
      margin-left: 20px;
    }
  }

  .product-quantity:before {
    content: "x";
  }

  .product-removal {
    width: auto;
  }

  .product-line-price {
    float: right;
    width: 70px;
  }
}

/* Make more adjustments for phone */
@media screen and (max-width: 350px) {
  .product-removal {
    float: right;
  }

  .product-line-price {
    float: right;
    clear: left;
    width: auto;
    margin-top: 10px;
  }

  .product .product-line-price:before {
    content: "Item Total: $";
  }

  .totals {
    .totals-item {
      label {
        width: 60%;
      }

      .totals-value {
        width: 40%;
      }
    }
  }
}

</style>