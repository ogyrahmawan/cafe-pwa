import axios from '../../config/http';

export const fetchHistory = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(`/history`)
            .then((res) => {
                return resolve(res.data);   
            })
            .catch(err => {
                return reject(err.response)
            })
    })
}

export const fetchDetailHistory = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(`/history/${id}`)
            .then((res) => {
                return resolve(res.data);   
            })
            .catch(err => {
                return reject(err.response)
            })
    })
}