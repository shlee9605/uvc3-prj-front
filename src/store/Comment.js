//댓글
import {comment} from '../api/comment'


export const Comment = {
    namespaced: true,
    state: {
        commentlist:[],
        content:{}
    },
    gettters: {

    },

    mutations: {
        SET_COMMENT(state,commentlist){
            state.commentlist = commentlist
        }
    },

    actions: {
        //댓글 작성
        CREATE_COMMENT(_,{pid,content}){
            return comment.create(pid,content).then(() => {
                // dispatch('SET_COMMENT',{contentlist:state.contentlist})
                // location.reload();
            }).catch(err => {
                console.log('댓글 작성 실패',err);
            })
        },
        //댓글 list
        FETCH_COMMENT({commit},{pid}){
            return comment.fetch(pid).then(data => {
                commit('SET_COMMENT', data.comments.reverse())
            }).catch(err => {
                console.log('댓글 조회 실패',err);
            })
        },

        UPDATE_COMMENT(_,{pid,cid,content}){
            return comment.update(pid,cid,content).then(() => {
                console.log('store수정완료');
                location.reload();
            }).catch(err => {
                console.log('댓글 수정 실패',err);
            })
        },
        DELETE_COMMENT(_,{pid,cid}){
            return comment.delete(pid,cid).then(() => {
                location.reload();
            })
        }
    },
}