const getters = {
    isAuth (state) {
        return !!state.token //boolean 값으로 반환
    }
}




export default getters