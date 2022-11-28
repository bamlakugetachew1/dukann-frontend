<template>
  <div>
    <div class="paddings">
      <div class="shift">
        <navigationBar isloginpage="true" />
      </div>
    </div>
  </div>
  <div class="login-card" id="down">
    <div v-if="this.message.length != 0">
      <p @click="close" class="hover">X</p>
      <p>either password or email is incorrect</p>
    </div>
    <h1>Log-in With</h1>
    <p
      name="login"
      id="color"
      class="login login-submit"
      value="login"
      @click="googlelogin"
    >
      GOOGLE
    </p>
    <p>OR</p>
    <br />
    <div>
      <input
        type="email"
        name="user"
        placeholder="Useremail"
        v-model="email"
        id="single"
      />
      <input
        type="password"
        name="pass"
        placeholder="Password"
        v-model="password"
      />
      <input
        type="submit"
        name="login"
        class="login login-submit"
        value="login"
        @click="login"
      />
    </div>

    <div class="login-help">
      <a href="#" id="signup">
        <router-link to="/signupUser"
          >Don't have an a account?sign up</router-link
        ></a
      >
    </div>
  </div>
  <footerView />

  <router-view />
</template>

<script>
// import passwordservice from "../services/passwordservice.js";
import navigationBar from "./navigationBar.vue";
import footerView from "./footerView.vue";
import router from "../index.js";
import axios from "axios";
export default {
  name: "loginUser",
  components: {
    navigationBar,
    footerView,
  },
  data() {
    return {
      email: "",
      password: "",
      token: "",
      success: true,
      sellerid: "",
      message: "",
      isuserauthenticated:false,
      logfromhome:"",
      googleloghome:""
    };
  },
  created() {
    this.logfromhome  = this.$route.query.logfromhome;
    this.googleloghome = this.$route.query.googleloghome;
    localStorage.setItem("googleloghome",this.googleloghome);

  },
  methods: {
    close() {
      this.message = "";
    },
    async googlelogin() {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https%3A%2F%2Fdukannethiopia.cyclic.app%2Fuser%2Fcallback&scope=email%20profile&client_id=891540596553-bq711flvbol7ov9jorkps366jt9b06q7.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow";
    },
   

    async login() {
      await axios
        .post("https://friendly-pink-pantyhose.cyclic.app/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.token = response.data.token;
          this.success = response.data.success;
          this.sellerid = response.data.sellerid;
          this.message = response.data.message;
          if (this.success == true) {
            localStorage.setItem("token", this.token);
            localStorage.setItem("sellerid", this.sellerid);
            localStorage.setItem("isuserauthenticated",true);
             
            if(this.logfromhome == "true"){
              router.push({
              name: "homePage",
              params: { loggedemail: this.loggedemail },
            });

            }
            else{
              router.push({
              name: "passwordList",
              params: { loggedemail: this.loggedemail },
            });
            }
       

          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.hover:hover {
  color: darkgoldenrod;
  background-color: rgba(44, 109, 196, 0.979);
}
p {
  text-align: center;
}
#color {
  color: rgb(231, 142, 25);
}
.paddings {
  background: radial-gradient(#fff, #ffd6d6);
  width: 100%;
  height: 50px;
}
.shift {
  margin-left: 20px;
  margin-right: 20px;
}
#down {
  margin-top: 20px;
}

.login-card {
  padding: 40px;
  width: 274px;
  background-color: #f7f7f7;
  margin: 0 auto 10px;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.login-card h1 {
  font-weight: 100;
  text-align: center;
  font-size: 2.3em;
}

.login-card input[type="submit"] {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  position: relative;
}

#single {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  /* border-radius: 2px; */
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.login-card input[type="text"],
input[type="password"] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  /* border-radius: 2px; */
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.login-card input[type="text"]:hover,
input[type="password"]:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.login {
  text-align: center;
  font-size: 14px;
  font-family: "Arial", sans-serif;
  font-weight: 700;
  height: 36px;
  padding: 0 8px;
  /* border-radius: 3px; */
  /* -webkit-user-select: none;
  user-select: none; */
}

.login-submit {
  /* border: 1px solid #3079ed; */
  border: 0px;
  color: #4d90fe;
  text-shadow: 0 1px rgba(0, 0, 0, 0.1);
  background-color: #4d90fe;
  /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#4787ed)); */
}

.login-submit:hover {
  /* border: 1px solid #2f5bb7; */
  border: 0px;
  text-shadow: 0 1px rgba(0, 0, 0, 0.3);
  background-color: #357ae8;
  /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#357ae8)); */
}

.login-card a {
  text-decoration: none;
  color: #666;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  opacity: 0.6;
  transition: opacity ease 0.5s;
}

.login-card a:hover {
  opacity: 1;
}

.login-help {
  width: 100%;
  text-align: center;
  font-size: 12px;
}
</style>
