const initialState = {
    search: '',
    categories: [],
}

const index = (state = initialState, action) => {
    switch (action.type) {
        case "SETSEARCH":
            return { ...state, search: action.payload }
        case "SETCATEGORIES":
            return { ...state, categories: action.payload }
        default:
            return state
    }
}

export default index