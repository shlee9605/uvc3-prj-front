import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

// style
import './assets/commonStyle.css'

import 'vue2-timepicker/dist/VueTimepicker.css'



new Vue({
  el: '#app',
  router,
  vuetify,
  store,

  // router-view가 모든 경로에 들어가게 됨
  render: h => h(App)
})

