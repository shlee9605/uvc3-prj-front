// 게시글
import { post, postlist } from '../api/post'



export const Post = {
    namespaced: true,

    state: {
        post:{},
        postlist:[],
    },

    mutations: {
        //post조회 
        SET_POST(state,post){
            state.post = post
        },


        //postlist 조회
        SET_POSTLIST(state,postlist){
            state.postlist = postlist
        }
    },

    actions: {
        FETCH_POST({commit},{id}){
            return post.fetch(id).then(data => {
                commit('SET_POST',data.data)
            })
        },

        CREATE_POST(_,{title, content, region, address, cost, capacity, date, time, visibility, CategoryId}) {
            return post.create(title, content, region, address, cost, capacity, date, time, visibility, CategoryId)
            .then(() => console.log('보내기 성공'))
        },


        FETCH_POSTLIST({commit},{cateName}){
            return postlist.fetch(cateName).then( response =>{
                commit('SET_POSTLIST', response.data)
            })
        },
        
        REVICE_POST(_,{id, title, content, region, address, cost, capacity, date, time, visibility}){
            return post.revice(id, title, content, region, address, cost, capacity, date, time, visibility)
            .then(()=>console.log('수정 성공'))
        },        

        DELETE_POST(_,{id}){
            return post.delete(id)
            .then(()=>console.log('삭제 성공'))
        }

    },

}