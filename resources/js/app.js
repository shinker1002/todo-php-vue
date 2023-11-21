// app.js
import {createApp} from 'vue'
import App from './App.vue'
import routers from './routers'  // router import

createApp(App).use(routers).mount("#app")