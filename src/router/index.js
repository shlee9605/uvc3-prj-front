import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/main.vue'
import Login from '../components/Login.vue'
import Auth from '../components/Auth'
import Post from '../components/post/Post.vue'
import AddPost from '../components/post/AddPost.vue'
import Posts from '../components/post/Posts.vue'
import store from '../store'
import myProfile from '../components/myProfile.vue'

import Comment from '../components/comment/comment.vue'

import Profile from '../components/Profile.vue'




Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
    // const isAuth = localStorage.getItem('token')   //토큰정보 확인
    //store에서 인증정보 확인 가져옴
    const isAuth = store.getters.isAuth
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
    // const loginPath = `/login` 
    //encodeURIComponent: 아스키 문자열로 변환 
    //to.path = 로그인 완료해달라는 의도 
    isAuth ? next() : next(loginPath) //로그인 되었다면 next 실행 아닌 경우 loginPath로 보내줌
}


const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name:'Home' ,component: Home },
        { path: '/Login', name:'Login' ,component: Login},
        { path: '/Auth', name:'Auth' ,component: Auth},
        { path: '/posts', name:'posts', component: Posts},
        { path: '/posts/:pid', name:'Post', component: Post, children:[
            {path:'/comment/:cid', component:Comment}
        ]},
        { path:'/addpost',name:'AddPost', component: AddPost, beforeEnter: requireAuth},
        // { path:'/addpost',name:'AddPost', component: AddPost},
        { path: '/myProfile', name:'myProfile', component: myProfile},
        { path: '/profile/:id', name:'Profile', component: Profile},
    ]
})



export default router