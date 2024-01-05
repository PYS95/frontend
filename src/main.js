// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import './assets/common.css'

// import {createApp} from 'vue'
// import store from "@/vuex/store";
//
// const app = createApp(App)
// app.config.globalProperties.$axios = axios
// app.config.globalProperties.$serverUrl = '//localhost:8081'
// app.config.globalProperties.$store - store
// // createApp(App)
// //     .use(router)
// //     .use(store)
// //     .$mount('#app')

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
    router,
    render: h => h(App)


}).$mount('#app')

