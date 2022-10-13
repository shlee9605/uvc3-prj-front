import { request } from '../api'



export const auth = {
    //로그인 api
    login(userId, password) {
        return request('post', '/auth/signIn', { userId, password })
    },
    //회원가입 api
    signUp(name, email, userId, password, birthdate, gender, photoUrl, profileMessage) {
        return request('post', '/auth/signUp', { name, email, userId, password, birthdate, gender, photoUrl, profileMessage })
    }
}

// 회원가입 api
// export const signUp = {
//     signUp(name, email, userId, password, birthdate, gender, photoUrl, profileMessage) {
//         return request('post', '/auth/signUp', { name, email, userId, password, birthdate, gender, photoUrl, profileMessage })
//     }
// }