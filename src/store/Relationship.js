import { friend } from '../api/relationship'



export const Relationship = {
    namespaced: true,

    state: {
        relationship:[]
    },
    getters:{
    },
    mutations: {

        SET_REL_STATUS(state,relationship){
            state.relationship = relationship
        }

    },

    actions: {

        FETCH_STATUS({commit},{UserId}) {
            return friend.fetch(UserId).then( res => {
                commit('SET_REL_STATUS', res.friendStatusList1)
                console.log('actions - res값 :',res.friendStatusList1.length);
            }).catch(err => {
                console.log('actions - res ERROR :',err);
            })
        },
        ACCEPT_REQ({UserId}){
            return friend.accept(UserId).then(() => {
                console.log('ACCEPT_REQ');
            })
        },
        REJECT_REQ({UserId}){
            return friend.reject(UserId).then(() => {
                console.log('REJECT_REQ');
            })
        },

    },


} 