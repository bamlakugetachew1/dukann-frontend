import { createApp,h} from 'vue'
import App from './App.vue'
import router from "./index.js"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//createApp(App).use(router).mount('#app')
const app = createApp({
    render: () => h(App)
  });
  
  app.use(router).mount("#app");
  