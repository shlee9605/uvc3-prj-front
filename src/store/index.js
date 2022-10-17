import Vue from 'vue'
import Vuex from 'vuex'
import { post, postlist } from '../api/post'
import {setAuthInHeader } from '../api'
import { auth } from '../api/auth'
import {comment} from '../api/comment'
// import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";



// 전역의 store 객체 역할을 함
Vue.use(Vuex)


//모듈화 파일 
import { Profile } from './Profile'
// import { Auth } from './Auth'
// import { Post } from './Post' 
import { Comment } from './Comment'
import { Attend } from './Attend'





const store = new Vuex.Store({


    modules: {
        // Auth: Auth,
        Profile: Profile,
        Comment: Comment,
        Attend: Attend
    },

    state: {
        postlist:[],
        post:{},
        token: localStorage.getItem('token') || null,
        contentlist:[],
        content:{},
    },
    getters:{
        isAuth (state) {
            return !!state.token //boolean 값으로 반환
        }
    },

    mutations: {
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

        //post조회 변이
        SET_POST(state,post){
            state.post = post
        },

        //postlist조회 변이
        SET_POSTLIST(state,postlist){
            state.postlist = postlist
        },

        SET_COMMENT(state,contentlist){
            state.contentlist = contentlist
        }
    },

    actions: {

        //로그인
        LOGIN({commit}, { id, password }) {
            return auth.login(id, password)
            //accessToken값을 LOGIN변이에 전달해줌  
            .then(({ token }) => commit('LOGIN', token))
        },


        //post 추가
        CREATE_POST(_,{title, content, region, address, cost, capacity, date, time, visibility, CategoryId}) {
            return post.create(title, content, region, address, cost, capacity, date, time, visibility, CategoryId)
            .then(() => console.log('보내기 성공'))
        },

        //post 상세조회
        FETCH_POST({commit},{id}){
            return post.fetch(id).then(data => {
                commit('SET_POST',data.data)
            })
        },



        //post 참가신청
        ATTEND_POST(_,{id}){
            return post.attend(id).then(data => {
                console.log('',data)
            })
            .catch(err => {console.log(err)})
        },

        //post리스트 조회
        FETCH_POSTLIST({commit},{cateName}){
            return postlist.fetch(cateName).then( response =>{
                commit('SET_POSTLIST', response.data)
            })
        },

                //댓글 작성
                CREATE_COMMENT(_,{pid,content}){
                    return comment.create(pid,content).then(() => {
                        console.log('작성완료')
                    }).catch(err => {
                        console.log('댓글 작성 실패',err);
                    })
                },
                //댓글 list
                FETCH_COMMENT({commit},{pid}){
                    return comment.fetch(pid).then(data => {
                        commit('SET_COMMENT', data.comments)
                    }).catch(err => {
                        console.log('댓글 조회 실패',err);
                    })
                },
        
                UPDATE_COMMENT({commit,state},{pid,cid,content}){
                    return comment.update(pid,cid,content).then(() => {
                        commit('SET_COMMENT',{contentlist: state.contentlist})
                    }).catch(err => {
                        console.log('댓글 수정 실패',err);
                    })
                },
                DELETE_COMMENT({commit,state},{pid,cid}){
                    return comment.delete(pid,cid).then(() => {
                        commit('SET_COMMENT',{contentlist: state.contentlist})
                    })
                }

    },

    plugins: [createPersistedState()],
})

// 브라우저 localstorage에 token 정보가 있는지 없는지 체크
const { token } = localStorage
store.commit('LOGIN', token)



export default store