import { setAuthInHeader } from '../api'

const mutations = {
    //로그인
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
}


export default mutations