import { request} from '../api'



export const attend = {
    fetchList(pid) {
        return request('get',`/attend/${pid}/acceptlist`)
    },
    participate(pid){
        return request('post',`/attend/${pid}/acceptlist`)
    },
    attendUser(pid,UserId){
        return request('get',`/attend/${pid}/acceptlist/${UserId}`)
    }
}