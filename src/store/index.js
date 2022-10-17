import Vue from 'vue'
import Vuex from 'vuex'





// 전역의 store 객체 역할을 함
Vue.use(Vuex)


//모듈화 파일 
import { Profile } from './Profile'
import { Auth } from './Auth'
import { Post } from './Post' 
import { Comment } from './Comment'
import { Attend } from './Attend'





const store = new Vuex.Store({


    modules: {
        Auth: Auth,
        Profile: Profile,
        Comment: Comment,
        Attend: Attend,
        Post: Post,
    },



})

// 브라우저 localstorage에 token 정보가 있는지 없는지 체크
const { token } = localStorage
store.commit('LOGIN', token)



export default store