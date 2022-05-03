const initialState = {
    isLogin: false,
    profile: {}
}

const index = (state = initialState, action) => {
    switch (action.type) {
        case "SETLOGIN":
            return { ...state, isLogin: true }
        case "SETPROFILE":
            return { ...state, proflie: action.payload }
        case "SETLOGOUT":
            return { ...state, isLogin: false }
        default:
            return state
    }
}

export default index