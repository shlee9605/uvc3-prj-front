import Vue from 'vue'
import Vuex from 'vuex'
// import * as api from '../api'

import {setAuthInHeader } from '../api'
import { auth } from '../api/auth'
import { getMyProfile } from '../api/profile'


Vue.use(Vuex)
// 전역의 store 객체 역할을 함
const store = new Vuex.Store({
    //상태
    state:{ 
        token: localStorage.getItem('token') || null,
        headers:{},
        // user: localStorage.getItem('user') || null ,
    },
    //인증정보 확인하기 위해 getters 사용 / state를 인자로 받음
    getters:{    
        isAuth (state) {
            return !!state.token //boolean 값으로 반환
        }
    },
    mutations:{
        //로그인
        //변이 (동기)
        LOGIN(state,token) {
            if(!token) return
            state.token = token //token 갱신
            localStorage.setItem('token', token) //localstorage에 token 저장
            setAuthInHeader(token) //header에 token 세팅
        },
        
        //로그아웃
        LOGOUT(state) {
            state.token = null
            delete localStorage.token
            setAuthInHeader(null)
        },

        MYPROFILE(state, response) {
            state.headers = response
        }
        
    },
    actions : {
        //변이(mutation)를 호출하고 변이가 state를 바꾸도록 함 (비동기)
        LOGIN({commit}, { userId, password }) {
            return auth.login(userId, password)
            //accessToken값을 LOGIN변이에 전달해줌  
            .then(({ token }) => commit('LOGIN', token))
        },

        GET_PROFILE({commit}, token){
            return getMyProfile.fetch(token)
            .then((response)=>commit('MYPROFILE', response))
        }
    }
})

// 브라우저 localstorage에 token 정보가 있는지 없는지 체크
const { token } =localStorage
store.commit('LOGIN',token)



export default store