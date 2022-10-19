import Vue from 'vue'
import Vuex from 'vuex'
import {setAuthInHeader } from '../api'



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
    state: {
        token: localStorage.getItem('token') || null,
    },

    getters:{
        isAuthed (state) {
            return !!state.token //boolean 값으로 반환
        }
    },
    mutations:{
        LOGINED(state,token) {
            if(!token) return
            state.token = token //token 갱신
            localStorage.setItem('token', token) //localstorage에 token 저장
            setAuthInHeader(token) //header에 token 세팅
        },
    }

})

// 브라우저 localstorage에 token 정보가 있는지 없는지 체크
const { token } = localStorage
store.commit('LOGINED', token)



export default store