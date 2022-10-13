import { createWebHistory, createRouter } from "vue-router";
import loginUser from './components/loginUser.vue'
import signupUser from './components/signupUser.vue'
import homePage from './components/homePage.vue'
import passwordList from './components/passwordList.vue'
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
      }

    ];

    
    const router = createRouter({
        history: createWebHistory(),
        routes,
      });
      
    export default router;

