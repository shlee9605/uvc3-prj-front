import axios from 'axios'
// import router from '../router'


const DOMAIN = 'http://192.168.0.63:8080'
const UNAUTHORIZED = 401

//axios
const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    }).then(result => result.data)
    .catch(result => {
        const {status} = result.response
        if(status == UNAUTHORIZED) return alert('로그인 필요')
        throw Error(result)
    })
}


export const setAuthInHeader = token => {
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
}


//로그인 api
export const auth = {
    login(email, password) {
        return request('post','/auth/signIn', {email,password})
    }
}