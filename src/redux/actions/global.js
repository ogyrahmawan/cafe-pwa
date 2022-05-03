export const setSearch = (payload) => {
    return {
        type: 'SETSEARCH',
        payload
    }
}

export const setCategories = (payload) => {
    return {
        type: 'SETCATEGORIES',
        payload,
    }
}

export const setCart = (payload) => {
    return {
        type: 'SETCART',
        payload
    }
}

export const setEditedCart = (payload) => {
    return {
        type: 'SETEDITEDCART',
        payload
    }
}