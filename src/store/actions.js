import {auth} from '../api'

const actions = {
    //로그인
    LOGIN({commit} , {email,password}) {
        return auth.login(email, password)
        //accessToken값을 LOGIN변이에 전달해줌  
        .then(({token}) => commit('LOGIN',token))
    },

}


export default actions