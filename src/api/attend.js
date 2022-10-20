import { request} from '../api'


//참가 신청
export const attend = {
    fetchList(pid) {
        return request('get',`/attend/${pid}/acceptlist`)
    },
    participate(pid){
        return request('post',`/attend/${pid}/acceptlist`)
    },
    attendUser(pid,UserId){
        return request('get',`/attend/${pid}/acceptlist/${UserId}`)
    },
    deleteAttend(pid,UserId){
        return request('delete',`/attend/${pid}/acceptlist/${UserId}`)
    }
}