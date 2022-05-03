import axios from '../../../config/http';

export const getMenuDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(`/menu/${id}`,{
            headers: {
                Authorization: localStorage.getItem('access_token')
            }
        })
            .then((res) => {
                return resolve(res.data);   
            })
            .catch(err => {
                return reject(err.response)
            })
    })
}

export const fetchListOptions = (type) => () => {
    return new Promise((resolve, reject) => {
        axios.get(`/utilities/option?option=${type}`,{
            headers: {
                Authorization: localStorage.getItem('access_token')
            }
        })
            .then((res) => {
                return resolve(res.data);   
            })
            .catch(err => {
                return reject(err.response)
            })
    })
}