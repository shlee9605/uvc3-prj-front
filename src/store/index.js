import Vue from 'vue'
import Vuex from 'vuex'
// import * as api from '../api'
//역할별로 분류함
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'



Vue.use(Vuex)

//전역의 store 객체 역할을 함
const store = new Vuex.Store({
    //상태
    state,
    //인증정보 확인하기 위해 getters 사용 / state를 인자로 받음
    getters,
    //변이 (동기)
    mutations,
    //변이(mutation)를 호출하고 변이가 state를 바꾸도록 함 (비동기)
    actions
})

//브라우저 localstorage에 token 정보가 있는지 없는지 체크
const {token} =localStorage
store.commit('LOGIN',token)



export default store