import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/main.vue'
import Login from '../components/Login.vue'
import Auth from '../components/Auth'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name:'Home' ,component: Home },
        { path: '/Login', name:'Login' ,component: Login},
        { path: '/Auth', name:'Auth' ,component: Auth}
    ]
})




export default router