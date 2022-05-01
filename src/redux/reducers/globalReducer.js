const initialState = {
    search: '',
    categories: [],
    cart: [],
    editedCart: null,
}

const index = (state = initialState, action) => {
    switch (action.type) {
        case "SETSEARCH":
            return { ...state, search: action.payload }
        case "SETCATEGORIES":
            return { ...state, categories: action.payload }
        case "SETCART":
            return { ...state, cart: action.payload }
        case "SETEDITEDCART":
            return {...state, editedCart: action.payload}
        default:
            return state
    }
}

export default index