<template>
    <div class="navbar">
          <div class="logo">
            <a href="index.html"
              > Dukaan Ethiopia</a>
       
          </div>
          <a v-if="islistpage" href="" class="simillar"><router-link to="/addProduct">Add Product</router-link></a>
          <a href="" class="simillar"><router-link to="/loginUser" @click="logout">logout</router-link></a>
        </div>
        <router-view />
  </template>
  
  <script>
   export default {
    name: "adminnav",
    props: {
        ishomepage: Boolean,
        isloginpage:Boolean,
        issignuppage:Boolean,
        islistpage:Boolean,
        issinglepage:Boolean
      },
    components: {
      // HelloWorld
    },
    data() {
      return {
        styles: {
          showmenu: false
        },
      }
    },
    methods: {
      menutoggle() {
        this.styles.showmenu = true;
  
      },
      close(){
        this.styles.showmenu = false;
      },
      logout(){
        localStorage.setItem("isuserauthenticated",false);
        this.$store.commit('changelikesValue',0); 
        this.$store.commit('changecartnumbers',0); 



      }
    },
  }
  </script>
  
  <style>
.paddings {
  background: radial-gradient(#fff, #ffd6d6);
  width: 100%;
  height: 50px;
}
.simillar{
    background: radial-gradient(#fff, #ffd6d6);
    text-decoration: none;
}

.shift {
  margin-left: 20px;
  margin-right: 20px;
}
#down {
  margin-top: 20px;
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
  
  
  </style>