<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Bootstrap Table with Add and Delete Row Feature</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </head>
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css /> -->
    <i
      class="fa fa-plus"
      style="font-size: 36px"
      id="center"
      @click="div_show"
    ></i>

    <div id="wrapper">
      <div class="form_div">
        <p class="form_label">
          <i class="fa fa-close" style="font-size: 36px" @click="div_hide"></i>
        </p>
   
           


        <div>
          <p>
            <input type="text" placeholder="Enter appName" v-model="appname" />
          </p>
          <p>
            <input
              type="text"
              placeholder="Enter userName"
              v-model="username"
            />
          </p>
          <p><input type="text" placeholder="Enter Email" v-model="email" /></p>
          <p>
            <input type="text" placeholder="password" v-model="password" />
          </p>
          <p>
            <input type="text" placeholder="Enter weblink" v-model="link" />
          </p>
          <p>
            <input
              type="submit"
              id="addlink2"
              value="ADD LINK"
              @click="addlink"
            />
          </p>
        </div>
      </div>
    </div>
    <div id="wrapper1">
      <div class="form_div">
        <p class="form_label">
          <i class="fa fa-close" style="font-size: 36px" @click="div_hide"></i>
        </p>
        <div>
          <p>
            <input
                  type="text"
                  placeholder="Enter appName"
                  v-model="appname"
                />
          </p>
          <p>
            <input
              type="text"
              placeholder="Enter userName"
              v-model="username"
            />
          </p>
          <p><input type="text" placeholder="Enter Email" v-model="email" /></p>
          <p>
            <input type="text" placeholder="password" v-model="password" />
          </p>
          <p>
            <input type="text" placeholder="Enter weblink" v-model="link" />
          </p>
          <p>
            <input
              type="submit"
              id="addlink1"
              value="EDIT LINK"
              @click="editlinks"
            />
          </p>
        </div>
      </div>
    </div>

    <table id="table">
      <thead>
        <tr>
          <th>APPNAME</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>PASSWORD</th>
          <th>LINK</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="space in this.index" :key="space.id">
          <td>{{ space.appname }}</td>
          <td>{{ space.username }}</td>
          <td>{{ space.email }}</td>
          <td>{{ space.password }}</td>
          <td>
            <a :href="space.link" target="_blank">{{ space.link }}</a>
          </td>
          <td>
            <i
              class="fa fa-edit"
              style="font-size: 24px"
              @click="
                updatelinks(
                  space._id,
                  space.appname,
                  space.username,
                  space.email,
                  space.password,
                  space.link
                )
              "
            ></i>
            <i
              class="fa fa-trash-o"
              style="font-size: 24px"
              @click="deletelink(space._id)"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </html>
</template>
<script>
// import passwordservice from "../services/passwordservice.js";
import axios from "axios";
export default {
  name: "passwordList",
  components: {},
  data() {
    return {
      index: [],
      owner: "",
      appname: "",
      username: "",
      email: "",
      password: "",
      link: "",
      id: "",
      token: "",
    };
  },
  methods: {
    getdata: function () {
      axios
        .get("https://clever-khakis.cyclic.app/passwords/passwords", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.index = response.data.data;
          this.length = this.index.length;
          if (this.length == 0) {
            this.message = "no  contacts to display";
          }
        })
        .catch((e) => {
          console.log(e);
        });

      // passwordservice
      //   .alllinks(owner)
      //   .then((response) => {
      //     this.index = response.data;
      //     this.length = this.index.length;
      //     if (this.length == 0) {
      //       this.message = "no  contacts to display";
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },

    reset() {
      this.appname = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.link = "";
    },

    div_show() {
      document.getElementById("wrapper").style.display = "block";
      document.getElementById("table").style.display = "none";
    },
    //Function to Hide Popup
    div_hide() {
      document.getElementById("wrapper").style.display = "none";
      document.getElementById("wrapper1").style.display = "none";
      document.getElementById("table").style.display = "block";
      this.reset();
      // location.reload();
    },

    async addlink() {
      // const headers = { Authorization: `Bearer ${this.token}` };

      // appname: this.appname,
      //       username: this.username,
      //       email: this.email,
      //       password: this.password,
      //       link: this.link,
      //       owner: this.owner,

      await axios
        .post(
          "https://clever-khakis.cyclic.app/passwords/addpassword",
          {
            appname: this.appname,
            username: this.username,
            email: this.email,
            password: this.password,
            link: this.link,
            owner: this.owner,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          document.getElementById("wrapper").style.display = "none";
          document.getElementById("table").style.display = "block";

          this.getdata();
        })
        .catch((e) => {
          console.log(e);
        });

      // var data = {
      //   appname: this.appname,
      //   username: this.username,
      //   email: this.email,
      //   password: this.password,
      //   link: this.link,
      //   owner: this.owner,
      // };

      // passwordservice
      //   .createlinks(data)
      //   .then(() => {
      //     document.getElementById("wrapper").style.display = "none";
      //     this.getdata(this.owner);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },

    deletelink: function (id) {
      const url =
        "https://clever-khakis.cyclic.app/passwords/deletepassword/" + id;
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(() => {
          this.getdata();
        })
        .catch((error) => {
          console.log(error);
        });

      // passwordservice
      //   .deletelink(id)
      //   .then((response) => {
      //     this.getdata(this.owner);
      //     console.log(response.data);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },

    updatelinks: function (id, appname, username, email, password, link) {
      this.id = id;
      this.appname = appname;
      this.username = username;
      this.email = email;
      this.password = password;
      this.link = link;
      document.getElementById("wrapper1").style.display = "block";
      document.getElementById("table").style.display = "none";
    },

    async editlinks() {
      const url =
        "https://clever-khakis.cyclic.app/passwords/updatepasssword/" + this.id;
      await axios
        .put(
          url,
          {
            appname: this.appname,
            username: this.username,
            email: this.email,
            password: this.password,
            link: this.link,
            owner: this.owner,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          
      document.getElementById("wrapper1").style.display = "none";
      document.getElementById("table").style.display = "block";
          this.getdata();
        })
        .catch((e) => {
          console.log(e);
        });

      // var data = {
      //   appname: this.appname,
      //   username: this.username,
      //   email: this.email,
      //   password: this.password,
      //   link: this.link,
      //   owner: this.owner,
      // };
      // console.log(data);
      // passwordservice
      //   .updatelinks(this.id, data)
      //   .then(() => {
      //     this.getdata(this.owner);
      //   })
      //   .catch((e) => {
      //     alert(e);
      //   });
    },
  },
  created() {
    this.owner = localStorage.getItem("loggedemail");
    this.token = localStorage.getItem("token");
    // console.log(localStorage.getItem("token"));
    this.getdata();
  },
};
</script>

<style lang="scss" scoped>
#wrapper1 {
  display: none;
}
#wrapper1 {
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  width: 995px;
}
#wrapper {
  display: none;
}
#body {
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  width: 100%;
  font-family: "Myriad Pro", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
  background-color: #ecf0f1;
}
#wrapper {
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  width: 995px;
}
#wrapper h1 {
  margin-top: 50px;
  font-size: 45px;
  color: #424949;
}
#wrapper h1 p {
  font-size: 18px;
}

#wrapper1 h1 {
  margin-top: 50px;
  font-size: 45px;
  color: #424949;
}
#wrapper1 h1 p {
  font-size: 18px;
}

.form_div {
  width: 330px;
  margin-left: 320px;
  padding: 10px;
  background-color: #424949;
}
.form_div .form_label {
  margin: 15px;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-decoration: underline;
}
.form_div input[type="text"],
input[type="password"] {
  width: 230px;
  height: 40px;
  border-radius: 2px;
  font-size: 17px;
  padding-left: 5px;
  border: none;
}
.form_div input[type="submit"] {
  width: 230px;
  height: 40px;
  border: none;
  border-radius: 2px;
  font-size: 17px;
  background-color: #7f8c8d;
  border-bottom: 3px solid #616a6b;
  color: white;
  font-weight: bold;
}

@media only screen and (min-width: 700px) and (max-width: 995px) {
  #wrapper {
    width: 100%;
  }
  #wrapper h1 {
    font-size: 30px;
  }

  #wrapper1 {
    width: 100%;
  }
  #wrapper1 h1 {
    font-size: 30px;
  }

  .form_div {
    width: 50%;
    margin-left: 25%;
    padding-left: 0px;
    padding-right: 0px;
  }
  .form_div input[type="text"],
  input[type="password"] {
    width: 80%;
  }
  .form_div textarea {
    width: 80%;
  }
  .form_div input[type="submit"] {
    width: 80%;
  }
}
@media only screen and (min-width: 400px) and (max-width: 699px) {
  #wrapper {
    width: 100%;
  }
  #wrapper h1 {
    font-size: 30px;
  }

  #wrapper1 {
    width: 100%;
  }
  #wrapper1 h1 {
    font-size: 30px;
  }
  .form_div {
    width: 60%;
    margin-left: 20%;
  }
  .form_div input[type="text"],
  input[type="password"] {
    width: 80%;
  }
  .form_div input[type="submit"] {
    width: 80%;
  }
}
@media only screen and (min-width: 100px) and (max-width: 399px) {
  #wrapper {
    width: 100%;
  }
  #wrapper h1 {
    font-size: 25px;
  }

  #wrapper1 {
    width: 100%;
  }
  #wrapper1 h1 {
    font-size: 25px;
  }
  .form_div {
    width: 90%;
    margin-left: 5%;
    padding-left: 0px;
    padding-right: 0px;
  }
  .form_div input[type="text"],
  input[type="password"] {
    width: 80%;
  }
  .form_div input[type="submit"] {
    width: 80%;
  }
}

$gl-ms: "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs: "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm: "screen and (max-width: 48em)"; // max 768px
$gl-md: "screen and (max-width: 64em)"; // max 1024px
$gl-lg: "screen and (max-width: 80em)"; // max 1280px

// table style
#center {
  padding-left: 50%;
}
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;

  * {
    position: relative;
  }

  td,
  th {
    padding-left: 8px;
  }

  thead tr {
    height: 60px;
    background: #ffed86;
    font-size: 16px;
  }

  tbody tr {
    height: 48px;
    border-bottom: 1px solid #e3f1d5;
    &:last-child {
      border: 0;
    }
  }

  td,
  th {
    text-align: left;
    &.l {
      text-align: right;
    }
    &.c {
      text-align: center;
    }
    &.r {
      text-align: center;
    }
  }
}

@media #{$gl-xs} {
  table {
    display: block;
    > *,
    tr,
    td,
    th {
      display: block;
    }

    thead {
      display: none;
    }
    tbody tr {
      height: auto;
      padding: 8px 0;
      td {
        padding-left: 45%;
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
        &:before {
          position: absolute;
          font-weight: 700;
          width: 40%;
          left: 10px;
          top: 0;
        }

        &:nth-child(1):before {
          content: "APPNAME";
        }
        &:nth-child(2):before {
          content: "USERNAME";
        }
        &:nth-child(3):before {
          content: "EMAIL";
        }
        &:nth-child(4):before {
          content: "PASSWORD";
        }
        &:nth-child(5):before {
          content: "LINK";
        }
        &:nth-child(6):before {
          content: "ACTIONS";
        }
      }
    }
  }
}

// body style

body {
  background: #9bc86a;
  font: 400 14px "Calibri", "Arial";
  padding: 20px;
}

blockquote {
  color: white;
  text-align: center;
}
</style>
