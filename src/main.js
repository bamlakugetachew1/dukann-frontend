import { createApp,h} from 'vue'
import App from './App.vue'
import router from "./index.js"
import './index.css'
import store from './store'  //import store.js page
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

//createApp(App).use(router).mount('#app')
const app = createApp({
    render: () => h(App),
  });
  
  app.use(router).use(store).mount("#app");
  