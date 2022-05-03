import axios from '../config/http'

export const getFeed = () => () => {
    return new Promise((resolve, reject) => {
        axios.get('/feed?page=1&size=10&sortBy=id_post&descending=true',{
            headers: {
                Authorization: localStorage.getItem('access_token')
            }
        })
            .then((res) => {
                return resolve(res.data)   
            })
            .catch(err => {
                return reject(err.response)
            })
    })
}