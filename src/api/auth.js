import { request} from '../api'


//로그인 api
export const auth = {
    login(userId,password){
        return request('post', '/auth/signIn',{ userId, password })
    }
}