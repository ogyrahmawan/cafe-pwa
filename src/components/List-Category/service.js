import axios from '../../config/http';
import { setCategories } from '../../redux/actions/global';

export const getListCategories = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get('/categories',{
            headers: {
                Authorization: localStorage.getItem('access_token')
            }
        })
            .then((res) => {
                dispatch(setCategories(res.data.data));   
            })
            .catch(err => {
                return reject(err.response)
            })
    })
}