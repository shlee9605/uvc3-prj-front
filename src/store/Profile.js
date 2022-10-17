//프로필 
import { getMyProfile } from '../api/profile'

export const Profile = {

    namespaced: true,
    state: {
        //user정보 저장
        headers:{},
    },

    mutations: {
        //내 프로필 변이
        MYPROFILE(state, response) {
            state.headers = response
        }
    },

    actions: {
        //내프로필 조회
        GET_PROFILE({commit}, token){
            return getMyProfile.fetch(token)
            .then((response)=>commit('MYPROFILE', response))
        }

    },

}