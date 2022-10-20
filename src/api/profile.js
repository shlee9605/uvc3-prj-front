import { request} from '../api'

// 내 프로필 조회 api
export const getMyProfile = {
    fetch(token) {
        return request('post', '/profile/my', { token })
    }
}

export const getMyAttend = {
    fetch(token) {
        return request('get', '/myattend', { token })
    }
}
