//참석 신청
import { attend } from '../api/attend'



export const Attend = {
    namespaced: true,
    
    state: {
        attendList:[],
        attendUser:{},    
    },

    mutations: {
        SET_LIST(state,attendList){
            state.attendList = attendList
        },

        SET_AUSER(state,attendUser){
            state.attendUser = attendUser
        }
    },

    actions: {

    //post 참가신청
    ATTEND_POST(_,{pid}){
        return attend.participate(pid).then(data => {
            console.log('',data)
        })
        .catch(err => {console.log(err)})
        .finally(() => location.reload())
    },
    //참가취소
    DELETE_ATTEND(_,{pid,UserId}){
        return attend.deleteAttend(pid,UserId).then(() => {
            // this.$store.commit("",this.data)
            console.log('참가 취소');
        }).catch(err => {
            console.log('actions: 참가 취소 err',err);
        }).finally(() => {
            location.reload();
        })
    },
    
    //참가 신청 유저 확인
    FETCH_AUSER({commit},{pid,UserId}){
        return attend.attendUser(pid,UserId).then(data => {
            console.log(data)
            commit('SET_AUSER', data)
        })
    },

    //참가자 리스트
    FETCH_ATTENDLIST({commit},{id}){ 
        return attend.fetchList(id).then( data => {
            console.log(id);
            commit('SET_LIST',data)
        })
    }
    },
}