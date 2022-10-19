import {request} from '../api'

//친구 요청
export const friend = {
    //요청조회
    fetch(UserId){
        return request('get',`/friend/${UserId}`)
    },
    //수락
    accept(UserId) {
        return request('patch',`/friend/${UserId}`)
    },
    //거절
    reject(UserId){
        return request('delete',`/friend/${UserId}`)
    }
}