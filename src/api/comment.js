import { request} from '../api'



//----------------------------------------------------
export const comment = {
    //댓글 작성
    create(pid,content) {
        return request('post', `/comment/${pid}/`,{content})
    },
    
    //댓글 수정
    update(pid,cid,content) {
        return request('patch', `/comment/${pid}/${cid}`,{content})
    },

    //댓글 삭제
    delete(pid,cid) {
        return request('delete', `/comment/${pid}/${cid}`)
    },
    
    //댓글 리스트 불러오기
    fetch(pid) {
        console.log('commonent fetch')
        return request('get',`/comment/${pid}`)
    },
}

//----------------------------------------------------