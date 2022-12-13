<template>
  <div class="paddings">
    <div class="shift">
      <adminnav />
    </div>
  </div>
  <div id="container">
    <div v-if="this.required == false">
      <p class="ic">all fields are required please fill out</p>
      <p class="ic" @click="close1">
        <i class="fa-solid fa-rectangle-xmark"></i>
      </p>
    </div>
    <div v-if="this.sucess == true">
      <p class="ic" @click="close">
        <i class="fa-solid fa-rectangle-xmark"></i>
      </p>
      <p>product added sucessfully add more products or</p>
      <p class="pone">
        <router-link to="/passwordList">Back to Dashboard</router-link>
      </p>
    </div>
    <p class="images" v-if="this.selectednumber > 4">
      max image allowed to upload is 4 (please choose smaller images)
    </p>
    <form
      action="#"
      method="post"
      id="contact_form"
      enctype="multipart/form-data"
    >
      <div class="name">
        <label for="name"></label>
        <input
          type="text"
          placeholder="product name"
          name="name"
          id="name_input"
          v-model="name"
          required
        />
      </div>
      <div class="email">
        <label for="name"></label>
        <input
          type="text"
          placeholder="product price"
          name="name"
          id="name_input"
          v-model="price"
          required
        />
      </div>
      <div class="name">
        <label for="name"></label>
        <input
          type="text"
          placeholder="producer company"
          name="name"
          id="name_input"
          v-model="companyname"
          required
        />
      </div>
      <div class="email">
        <label for="email"></label>
        <input
          type="email"
          placeholder="catagory"
          name="email"
          id="email_input"
          v-model="catagory"
          required
        />
      </div>
      <div class="email">
        <input
          type="file"
          name="files[]"
          id="img"
          style="display: none"
          ref="file"
          @change="onFileChange"
          multiple
        />
        <label for="img"
          >upload image(Max 4) selected({{ this.selectednumber }})</label
        >
      </div>

      <div class="message">
        <label for="message"></label>
        <textarea
          name="message"
          placeholder="discriptions"
          id="message_input"
          cols="15"
          rows="5"
          v-model="description"
          required
        ></textarea>
      </div>
    </form>
    <!-- // End form -->
    <!-- <button id="button" @click="addproduct" v-if="this.selectednumber < 5">
      ADD PRODUCTS
    </button> -->
    <button class="checkout" @click="addproduct" id="checkout" v-if="this.selectednumber < 5">ADD PRODUCT</button><br><br>
  </div>
  <!-- // End #container -->
  <footerView />
</template>

<script>
import axios from "axios";
import adminnav from "./adminnav.vue";
import footerView from "./footerView.vue";
export default {
  name: "addProduct",
  components: {
    adminnav,
    footerView,
  },
  data() {
    return {
      selectednumber: 0,
      selectedFile: null,
      check: "",
      sellerid: "",
      price: 0,
      name: "",
      companyname: "",
      catagory: "",
      description: "",
      token:"",
      sucess: false,
      required: true,
    };
  },
  created() {
    this.sellerid = localStorage.getItem("sellerid");
    this.token = localStorage.getItem("token");
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files;
      this.selectednumber = this.selectedFile.length;
    },
    close() {
      this.sucess = false;
    },
    close1() {
      this.required = true;
    },
    async onUploadFile() {
      const formData = new FormData();
      for (const i of Object.keys(this.selectedFile)) {
        formData.append("productimages", this.selectedFile[i]);
      }
      await axios .post("https://friendly-pink-pantyhose.cyclic.app/product/uploadimages", formData,{
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
        .then((res) => {
          this.check = res.data.check;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addproduct() {
      if (
        this.price == 0 ||
        this.name == "" ||
        this.companyname == "" ||
        this.catagory == "" ||
        this.description == "" ||
        this.selectedFile.length == 0
      ) {
        this.required = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
      document.getElementById("checkout").innerHTML="____________";
      const theButton = document.querySelector(".checkout");
      theButton.classList.add("button--loading");
        await this.onUploadFile();
        if (this.check == "imageadded") {
          await axios
            .post("https://friendly-pink-pantyhose.cyclic.app/product/addproducts", {
              sellerid: this.sellerid,
              price: this.price,
              name: this.name,
              companyname: this.companyname,
              catagory: this.catagory,
              description: this.description,
            },   {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
           })
            .then((response) => {
              this.sucess = response.data.sucess;
              window.scrollTo({ top: 0, behavior: 'smooth' });
              document.getElementById("checkout").innerHTML="ADD PRODUCT";
              theButton.classList.remove("button--loading");
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },
  },
};
</script>
<style>
 
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





.images {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: medium;
}
.pone {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.ic {
  font-size: 30px;
}
</style>
