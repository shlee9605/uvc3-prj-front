//회원가입 로그인 로그아웃
import {setAuthInHeader } from '../api'
import { auth } from '../api/auth'





export const Auth = {
    namespaced: true,

    state: {
        token: localStorage.getItem('token') || null,
        UserId: localStorage.getItem('UserId') || null
    },
    getters:{
        isAuth (state) {
            return !!state.token //boolean 값으로 반환
        }
    },
    mutations: {

        //로그인
        //변이 (동기)
        LOGIN(state,data) {
            if(!data.token) return
            state.token = data.token //token 갱신
            localStorage.setItem('token', data.token) //localstorage에 token 저장
            state.UserId = data.id
            localStorage.setItem('UserId', data.id)
            setAuthInHeader(data.token) //header에 token 세팅
        },

        // SET_USERID(state,UserId){
        //     if
        // },


        //로그아웃
        LOGOUT(state) {
            state.token = null
            delete localStorage.token
            setAuthInHeader(null)
        },



    },

    actions: {

        LOGIN({commit}, { id, password }) {
            return auth.login(id, password)
            //accessToken값을 LOGIN변이에 전달해줌 
            .then(data => commit('LOGIN', data))
            // .finally(({ id }) => commit('SET_USERID', id))
        },

    },

}