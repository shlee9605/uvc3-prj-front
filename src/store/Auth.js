//회원가입 로그인 로그아웃
import {setAuthInHeader } from '../api'
import { auth } from '../api/auth'



export const Auth = {

    state: {
        token: localStorage.getItem('token') || null,
    },
    getters:{
        isAuth (state) {
            return !!state.token //boolean 값으로 반환
        }
    },
    mutations: {

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



    },

    actions: {

        LOGIN({commit}, { userId, password }) {
            return auth.login(userId, password)
            //accessToken값을 LOGIN변이에 전달해줌  
            .then(({ token }) => commit('LOGIN', token))
        },


    },

}