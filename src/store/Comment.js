//댓글
import {comment} from '../api/comment'


export const Comment = {

    state: {
        contentlist:[],
        content:{}
    },
    gettters: {

    },

    mutations: {
        SET_COMMENT(state,contentlist){
            state.contentlist = contentlist
        }
    },

    actions: {
        //댓글 작성
        CREATE_COMMENT({commit,state},{content}){
            return comment.create(content).then(() => {
                commit('SET_COMMENT',{contentlist: state.contentlist})
            }).catch(err => {
                console.log('댓글 작성 실패',err);
            })
        },
        //댓글 list
        FETCH_COMMENT({commit},{id}){
            return comment.fetch(id).then(data => {
                commit('SET_COMMENT', data.data)
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
}