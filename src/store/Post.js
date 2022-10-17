//게시글
// import { post } from '../api/post'



// export const Post = {

//     state: {
//         post:{},
//         postlist:[],
//     },

//     mutations: {
//         //post조회 
//         SET_POST(state,post){
//             state.post = post
//         },


//         //postlist 조회
//         SET_POSTLIST(state,postlist){
//             state.postlist = postlist
//         }
//     },

//     actions: {
//         CREATE_POST(_,{title, content, region, address, cost, capacity, date, time, visibility, CategoryId}) {
//             return post.create(title, content, region, address, cost, capacity, date, time, visibility, CategoryId)
//             .then(() => console.log('보내기 성공'))
//         },


//         FETCH_POSTLIST({commit},{cateName}){
//             return post.fetch(cateName).then( response =>{
//                 commit('SET_POSTLIST', response.data)
//             })
//         },

//     },

// }