//참석 신청
import { post } from '../api/post'



export const Attend = {
    namespaced: true,
    
    state: {

    },

    mutations: {

    },

    actions: {
                //post 참가신청
                ATTEND_POST(_,{id}){
                    return post.attend(id).then(data => {
                        console.log('',data)
                    })
                    .catch(err => {console.log(err)})
                },
    },
}