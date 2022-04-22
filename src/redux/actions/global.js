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