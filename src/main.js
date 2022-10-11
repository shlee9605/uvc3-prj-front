import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'




new Vue({
  el: '#app',
  router,
  vuetify,

  // router-view가 모든 경로에 들어가게 됨
  render: h => h(App)
})

