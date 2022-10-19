import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// library
import vuetify from './plugins/vuetify'
import vueMoment from 'vue-moment';
import moment from 'moment';
import * as VeeValidate from 'vee-validate';

// style
import './assets/commonStyle.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue2-timepicker/dist/VueTimepicker.css'

moment.locale('ko');
Vue.use(vueMoment, { moment });



new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  VeeValidate,
  vueMoment,

  // router-view가 모든 경로에 들어가게 됨
  render: h => h(App)
})

