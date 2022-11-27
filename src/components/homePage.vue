<template>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/fontawesome.min.css" integrity="sha384-z4tVnCr80ZcL0iufVdGQSUzNvJsKjEtqYZjiQrrYKlpGow+btDHDfQWkFjoaz/Zr">
  </head>
  <body>
    <div class="header">
    <div class="container">
    <navigationBar ishomepage="true" issinglepage="true"/>
      <div class="row">
        <div class="col-2">
          <h1 id="small">
            Spend Less <br />
            Consume More!
          </h1>
       
            
          <!-- <p>
            open your online shoop within a few clicks <br />Your ultimate online presence
          </p> -->
          <p href="#" target="_blank" rel="noopener noreferrer" class="btn"
            ><router-link to="/loginUser">Become A Seller &#8594;</router-link></p
          >
        </div>
         <div class="col-2  fonts" v-if="this.$store.getters.getMessage==1">
              <h5 class="savedtext">Saved Items</h5>
              <div class="saveditems" >
                <h5>name</h5>
                <h5>price</h5>
                <h5>Actions</h5>
              </div>
              <div class="saveditems" v-for="data in this.$store.getters. getloveditems" :key="data._id">
                <h5>{{data.name}}</h5>
                <h5>{{data.price}}</h5>
                <h5><a href="#" @click="detailview(data._id)"><i  class="fa fa-eye" aria-hidden="true"></i></a> <span @click="deleteloveditems(data._id)"> <i  class="fa fa-trash" aria-hidden="true" ></i> </span></h5>
              </div>
              <button class="savedbuttonclose" @click="closesaveditems">close</button>
         </div>



        <div class="col-2">
          <!-- <img src="https://i.ibb.co/QpTmdX5/image1.png" alt="" /> -->
          <img  :src="this.images" alt="">
        </div>
      </div>
    </div>
  </div>

  <!-- Featured categories -->


  <!-- Featured products -->
  <div class="small-container">
    <div class="box" id="shift">
      <select @change="isDisabled">
        <option >ALL Products</option>
        <option >Most Liked</option>
        <option>MAX Price</option>
        <option>Min Price</option>
        <option>Newest</option>
        <option>Oldest</option>
      </select>
    </div>
    <h2 class="title">Featured Products</h2>
    <div class="row">

       <producPage v-for="product in this.products" :key="product._id"
        @changeTitle="ChangeT($event)"
        :imageurl="product.productimages[0]"
         ishomepage="true"
        :name="product.name"
        :price="product.price"
        :id="product._id"
        :sellerid="product.sellerid"
         /> 

        </div>
        </div>
 
          <div class="pagination_section">
            <a href="#" @click="prev">Previous</a>
            <a href="">{{this.pagenumber}}</a> 
            <a href="#" @click="next">Next >></a>
          </div>
         <footerView/>
  <!-- offer -->
  </body>
  </html>
  

  <!-- js for toggle menu -->
</template>

<script>
import axios from "axios";
import navigationBar from './navigationBar.vue'
import footerView from './footerView.vue'
import producPage from './producPage.vue'
import pagination from './pagination.vue'



export default {
  name: "homePage",
  components: {
    navigationBar,
     footerView,
     producPage,
     pagination
  },
  data() {
    return {
      styles: {
        showmenu: false
      },
      images:require('@/assets/41238420_1925633487493226_888383817327312896_n.jpg'),
      paypal:require('@/assets/PP_Acceptance_Marks_for_LogoCenter_266x142.png'),
      visa:require('@/assets/visa-logo-png-transparent.png'),
      products: [],
      pagenumber:1,
      productnumber:0,
      allowed:1,
    };
  },
  async created(){
      this.getmyproducts();
      if(localStorage.getItem("isuserauthenticated") == "true"){
           await axios.post("https://friendly-pink-pantyhose.cyclic.app/user/countlike", {
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
           this.$store.commit('changelikesValue',response.data.length);          
        })
        .catch((e) => {
          console.log(e);
        });
        
        this.getallcartnumbers();  
      }
     
  },
  mounted(){   
  },
  methods: {
async  isDisabled(e) {
  
if (e.target.value === "Most Liked") {
    var url = "https://friendly-pink-pantyhose.cyclic.app/product/allproducts/mostliked/" + this.pagenumber;
     await axios
    .get(url)
    .then((res) => {
      this.products = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });   
   }


if (e.target.value === "MAX Price") {
    var url = "https://friendly-pink-pantyhose.cyclic.app/product/allproducts/sortbylargeprice/" + this.pagenumber;
     await axios
    .get(url)
    .then((res) => {
      this.products = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });   

   }




if (e.target.value === "Min Price") {
    var url = "https://friendly-pink-pantyhose.cyclic.app/product/allproducts/sortbysmallprice/" + this.pagenumber;
     await axios
    .get(url)
    .then((res) => {
      this.products = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });   

   }


   if (e.target.value === "Oldest") {
    var url = "https://friendly-pink-pantyhose.cyclic.app/product/allproducts/sortbyoldest/" + this.pagenumber;
     await axios
    .get(url)
    .then((res) => {
      this.products = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });   
     }


  if (e.target.value === "Newest") {
    var url = "https://friendly-pink-pantyhose.cyclic.app/product/allproducts/sortbynewst/" + this.pagenumber;
     await axios
    .get(url,)
    .then((res) => {
      this.products = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  }
},
        


















   
   async getallcartnumbers(){
      await axios.post("https://friendly-pink-pantyhose.cyclic.app/user/countcartitems", {
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
           this.$store.commit('changecartnumbers',response.data.length);          
        })
        .catch((e) => {
          console.log(e);
        });
     },


    detailview(productid){

      var url = "http://localhost:8080/productCatagory?productid="+productid;
      window.location.href=url;
        
    },
  async  getbacklinks(){
      await axios.post("https://friendly-pink-pantyhose.cyclic.app/product/userliked", {
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
          this.$store.commit('changeloveditemsValue',response.data.data); 
          this.$store.commit('changelikesValue',response.data.data.length);                   
        })
        .catch((e) => {
          console.log(e);
        });
    },
  async  deleteloveditems(productid){
    await axios.post("https://friendly-pink-pantyhose.cyclic.app/user/unlikeproduct", {
           productid:productid,
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
             
            this.getbacklinks();
            // this.$store.commit('changeloveditemsValue',response.data.data);          
        })
        .catch((e) => {
          console.log(e);
        });
    },

    closesaveditems(){
      this.$store.commit('changeMessageValue',0); 

    },
    menutoggle() {
      this.styles.showmenu = true;

    },
    close(){
      this.styles.showmenu = false;
    },
    async next(){
        if(this.pagenumber < this.allowed){
          this.pagenumber = this.pagenumber + 1;
          }
         var url = "https://friendly-pink-pantyhose.cyclic.app/product/getallproducts/" + this.pagenumber;
         await axios
        .get(url)
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

        var url = "https://friendly-pink-pantyhose.cyclic.app/product/getallproducts/" + this.pagenumber;
         await axios
        .get(url)
        .then((res) => {
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
       },

    async getmyproducts() {
      var url = "https://friendly-pink-pantyhose.cyclic.app/product/getallproducts/" + this.pagenumber;
      await axios.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.productnumber = res.data.productnumber;
          this.allowed = this.productnumber/6;
          this.allowed = Math.ceil(this.allowed);
          this.$store.commit("changerestValue",1);

           })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.savedbuttonclose{
    color: red;
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
  }
.fonts{
  font-weight: 100;
   font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.savedtext{
  text-align: center;
}
.saveditems{

 display: flex;
 justify-content: space-between;

}
#shift{
  margin-top: 35px;
}
#pay{
  width: 100px;
}
#pay1{
  width: 100px;
  padding-left: 20px;
}
.payments{
  display: flex;
}
 .footer{
  margin-top: 35px;
 }

 
  .content {
    margin: 50px;
    padding: 15px;
    width: 700px;
    height: 200px;
    border: 2px solid black;
  }


span{
  border: 1px solid red;
  margin-top: 20px;
}
.line{
  display: flex;
  justify-content: space-between;
}
.sup{
  font-size: 20px;
  border: 1px solid #563434;
  border-radius: 50%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#space{
  padding-right: 15px;
}
a{
  text-decoration: none;
}
.show{
  height: 170px;
  margin-bottom: 25px;
}
.close{
  height: 0px;
}
.closeb{
   height: 0px;
}
.showb{
  height: 25px;
}
body {
  font-family: "Poppins", sans-serif;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 20px;

}

nav {
  flex: 1;
  text-align: right;
}

nav ul {
  display: inline-block;
  list-style-type: none;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;


}

a {
  text-decoration: none;
  color: #555;
}

p {
  color: #555;
}

.container {
  max-width: 1300px;
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

.col-2 {
  flex-basis: 50%;
  min-width: 300px;
}

.col-2 img {
  max-width: 100%;
  padding: 50px 0;
}

.col-2 h1 {
  font-size: 50px;
  line-height: 60px;
  margin: 25px 0;
}

/* .btn {
  display: inline-block;
  background: #ff523b;
  color: #ffffff;
  padding: 8px 30px;
  margin: 30px 0;
  border-radius: 30px;
  transition: background 0.5s;
} */

/* .btn:hover {
  background: #563434;
} */

.header {
  background: radial-gradient(#fff, #ffd6d6);
}

.header .row {
  margin-top: 70px;
}

.categories {
  margin: 70px 0;
}

.col-3 {
  flex-basis: 30%;
  min-width: 250px;
  margin-bottom: 30px;
}

.col-3 img {
  width: 100%;
}

.small-container {
  max-width: 1080px;
  margin: auto;
  padding-left: 25px;
  padding-right: 25px;
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

/* Offer */

.offer {
  background: radial-gradient(#fff, #ffd6d6);
  margin-top: 80px;
  padding: 30px 0;
}

.col-2 .offer-img {
  padding: 50px;
}

small {
  color: #555;
}

/* testimonial */

.testimonial {
  padding-top: 100px;
}

.testimonial .col-3 {
  text-align: center;
  padding: 40px 20px;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.5s;
}

.testimonial .col-3 img {
  width: 100px;
  margin-top: 20px;
  border-radius: 50%;
}

.testimonial .col-3:hover {
  transform: translateY(-10px);
}

.fa-quote-left {
  font-size: 34px;
  color: #ff523b;
}

.col-3 p {
  font-size: 14px;
  margin: 12px 0;
  color: #777777;
}

.testimonial .col-3 h3 {
  font-weight: 600;
  color: #555;
  font-size: 16px;
}

.brands {
  margin: 100px auto;
}

.col-5 {
  width: 160px;
}

.col-5 img {
  width: 100%;
  cursor: pointer;
  filter: grayscale(100%);
}

.col-5 img:hover {
  width: 100%;
  cursor: pointer;
  filter: grayscale(0);
}

/* footer */

.footer {
  background: #000;
  color: #8a8a8a;
  font-size: 14px;
  padding: 60px 0 20px;
}

.footer p {
  color: #8a8a8a;
}

.footer h3 {
  color: #ffffff;
  margin-bottom: 20px;
}

.footer-col-1,
.footer-col-2,
.footer-col-3,
.footer-col-4 {
  min-width: 250px;
  margin-bottom: 20px;
}

.footer-col-1 {
  flex-basis: 30%;
}

.footer-col-2 {
  flex: 1;
  text-align: center;
}

.footer-col-2 img {
  width: 180px;
  margin-bottom: 20px;
}

.footer-col-3,
.footer-col-4 {
  flex-basis: 12%;
  text-align: center;
}

ul {
  list-style-type: none;
}

.app-logo {
  margin-top: 20px;
}
.app-logo img {
  width: 140px;
}

.footer hr {
  border: none;
  background: #b5b5b5;
  height: 1px;
  margin: 20px 0;
}

.copyright {
  text-align: center;
}

.menu-icon {
  width: 28px;
  margin-left: 20px;
  display: none;
}

/* media query for menu */
@media only screen and(max-width:900px){
  #small{
    font-size: 10px;
  }

  .pagination_section {
    display: flex;
    justify-content: space-between;
    /* position: relative;
    text-align: center; */
  }
 
  /* pagination styling */
  .pagination_section a {
    color: black;
    padding: 5px 9px;
    text-decoration: none;
  }

}

@media only screen and (max-width: 800px) {
  nav ul {
    position: absolute;
    top: 70px;
    left: 0;
    background: #333;
    width: 100%;
    overflow: hidden;
    transition: max-height 0.5s;
  }
  nav ul li {
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    padding-left: 8%;
    list-style: none;
    text-decoration: none;
  }
  #small{
    /* font-size: 10px; */
    margin-top: 20px;
  }
  nav ul li a {
    color: #fff;
  }
  .menu-icon {
    display: block;
    cursor: pointer;
  }
}

/* all products page */

.row-2 {
  justify-content: space-between;
  margin: 100px auto 50px;
}

select {
  border: 1px solid #ff523b;
  padding: 5px;
}

select:focus {
  outline: none;
}

.page-btn {
  margin: 0 auto 80px;
}

.page-btn span {
  display: inline-block;
  border: 1px solid #ff523b;
  margin-left: 10px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.page-btn span:hover {
  background: #ff523b;
  color: #ffffff;
}

/* single product details */

.single-product {
  margin-top: 80px;
}

.single-product .col-2 img {
  padding: 0;
}

.single-product .col-2 {
  padding: 20px;
}

.single-product h4 {
  margin: 20px 0;
  font-size: 22px;
  font-weight: bold;
}

.single-product select {
  display: block;
  padding: 10px;
  margin-top: 20px;
}

.single-product input {
  width: 50px;
  height: 40px;
  padding-left: 10px;
  font-size: 20px;
  margin-right: 10px;
  border: 1px solid #ff523b;
}

input:focus {
  outline: none;
}

.single-product .fas {
  color: #ff523b;
  margin-left: 10px;
}

.small-img-row {
  display: flex;
  justify-content: space-between;
}

.small-img-col {
  flex-basis: 24%;
  cursor: pointer;
}

/* cart items */

.cart-page {
  margin: 90px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.cart-info {
  display: flex;
  flex-wrap: wrap;
}

th {
  text-align: left;
  padding: 5px;
  color: #ffffff;
  background: #ff523b;
  font-weight: normal;
}
td {
  padding: 10px 5px;
}

td input {
  width: 40px;
  height: 30px;
  padding: 5px;
}

td a {
  color: #ff523b;
  font-size: 12px;
}

td img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.total-price {
  display: flex;
  justify-content: flex-end;
}

.total-price table {
  border-top: 3px solid #ff523b;
  width: 100%;
  max-width: 400px;
}

td:last-child {
  text-align: right;
}

th:last-child {
  text-align: right;
}
/* account page */
.account-page {
  padding: 50px 0;
  background: radial-gradient(#fff, #ffd6d6);
}

.form-container {
  background: #ffffff;
  width: 300px;
  height: 400px;
  position: relative;
  text-align: center;
  padding: 20px 0;
  margin: auto;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-container span {
  font-weight: bold;
  padding: 0 10px;
  color: #555555;
  cursor: pointer;
  width: 100px;
  display: inline-block;
}

.form-btn {
  display: inline-block;
}

.form-container form {
  max-width: 300px;
  padding: 0 20px;
  position: absolute;
  top: 130px;
  transition: transform 1s;
}

form input {
  width: 100%;
  height: 30px;
  margin: 10px 0;
  padding: 0 10px;
  border: 1px solid #ccc;
}

form .btn {
  width: 100%;
  border: none;
  cursor: pointer;
  margin: 10px 0;
}

form .btn:focus {
  outline: none;
}

#LoginForm {
  left: -300px;
}

#RegForm {
  left: 0;
}

form a {
  font-size: 12px;
}

#Indicator {
  width: 100px;
  border: none;
  background: #ff523b;
  height: 3px;
  margin-top: 8px;
  transform: translateX(100px);
  transition: transform 1s;
}

/* media query for less than 600 screen size */
@media only screen and (min-width: 900px) {
   #none{
    display: none;
   }
}

@media only screen and (max-width: 600px) {
  .row {
    text-align: center;
  }
  .col-2,
  .col-3,
  .col-4 {
    flex-basis: 100%;
  }

  .single-product .row {
    text-align: left;
  }

  .single-product .col-2 {
    padding: 20px 0;
  }
  .single-product h1 {
    font-size: 26px;
    line-height: 32px;
  }
  .cart-info p {
    display: none;
  }
}
</style>
