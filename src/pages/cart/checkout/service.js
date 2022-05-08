import axios from '../../../config/http';

export const checkout = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.post(`/order/checkout`, {...payload}, {
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