import { createWebHistory, createRouter } from "vue-router";
import loginUser from './components/loginUser.vue'
import signupUser from './components/signupUser.vue'
import homePage from './components/homePage.vue'
import passwordList from './components/passwordList.vue'
import addProduct from './components/addProduct.vue'
import productCatagory from './components/productCatagory.vue'
import cartPage from './components/cartPage.vue'
import successPage from './components/successPage.vue'
import cancelPage from './components/cancelPage.vue'





import App from './App.vue'
const routes = [
    {
        path: "/loginUser",
        name: "loginUser",
        component: loginUser,
      },
      {
        path: "/signupUser",
        name: "signupUser",
        component: signupUser,
      },

      {
        path: "/home",
        name: "App",
        component: App,
      },
      {
        path: "/",
        name: "homePage",
        component: homePage,
      },
      {
        path: "/passwordList",
        name: "passwordList",
        component: passwordList,
      },
      {
        path: "/productCatagory",
        name: "productCatagory",
        component:productCatagory,
      },
      {
        path: "/addProduct",
        name: "addProduct",
        component:addProduct,
      },
      {
        path: "/cartPage",
        name: "cartPage",
        component:cartPage,
      },
      {
        path: "/successPage",
        name: "successPage",
        component:successPage,
      },
      {
        path: "/cancelPage",
        name: "cancelPage",
        component:cancelPage,
      } 
    ];

    
    const router = createRouter({
        history: createWebHistory(),
        routes,
      });
      
    export default router;

