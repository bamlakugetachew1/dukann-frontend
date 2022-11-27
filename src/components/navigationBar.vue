<template>
  <div class="navbar">
        <div class="logo">
          <a href="#"
            > Dukaan Ethiopia</a>
        </div>
        <nav>
          <ul id="MenuItems" :class="this.styles.showmenu ? 'show' : 'close'">
            <li class="none"><a href="#" @click="close" :class="this.styles.showmenu ? 'showb' : 'closeb'" id="none">X</a></li>
            <li v-if="ishomepage"><a href="account.html"><router-link to="/signupUser"><i class="fa fa-user-plus" aria-hidden="true"></i></router-link></a></li>
            <li v-if="!isloginpage && !issignuppage"><a href="#"><router-link to="/loginUser"><i class="fa fa-sign-in" aria-hidden="true"></i></router-link></a></li>
            <li v-if="!ishomepage && !issignuppage"><a href="#"><router-link to="/signupUser"><i class="fa fa-user-plus" aria-hidden="true"></i></router-link></a></li>
          </ul>
        </nav>
        <a href="" v-if="!ishomepage"><router-link to="/"><i class="fa fa-home" aria-hidden="true"></i></router-link></a>
        <a href="#" v-if="ishomepage" @click="showsaveditems"
          ><sup class="sup">{{this.$store.getters.getlikes}}</sup>  <i class="fa fa-heart" aria-hidden="true"  id="space"></i></a>
          <li v-if="ishomepage"><a href="#"><router-link to="/cartPage"><i class="fa fa-shopping-cart" aria-hidden="true"></i></router-link></a></li>

          <a href="#" v-if="ishomepage"
          > <sup class="sup">{{this.$store.getters.getcartnumbers}}</sup>
          </a>
        <img
          src="https://i.ibb.co/6XbqwjD/menu.png"
          alt=""
          class="menu-icon"
          @click="menutoggle"
          :class="this.styles.showmenu ? 'closeb' : 'showb'"
        />
      </div>
      <router-view />
</template>

<script>
  import axios from "axios";
 export default {
  name: "navigationBar",
  props: {
      ishomepage: Boolean,
      isloginpage:Boolean,
      issignuppage:Boolean
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
    async showsaveditems(){
      if(localStorage.getItem("isuserauthenticated") == "true"){
      this.$store.commit('changeMessageValue',1); 
      await axios.post("http://localhost:3000/product/userliked", {
           userid:localStorage.getItem("sellerid"),
           }).then((response) => { 
          this.$store.commit('changeloveditemsValue',response.data.data);          
        })
        .catch((e) => {
          console.log(e);
        });
      }
    },
    menutoggle() {
      // this.styles.maxHeight = 200;
      this.styles.showmenu = true;

      // var MenuItems = document.getElementById("MenuItems");
      // MenuItems.style.maxHeight = "0px";
      // if (MenuItems.style.maxHeight == "0px") {
      //   MenuItems.style.maxHeight = "200px";
      // } else {
      //   MenuItems.style.maxHeight = "0px";
      // }
    },
    close(){
      this.styles.showmenu = false;
    }
  },
}
</script>

<style>

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