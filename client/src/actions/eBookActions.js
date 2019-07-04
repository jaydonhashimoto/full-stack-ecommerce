import axios from 'axios';
import { GET_EBOOKS, ADD_EBOOK, DELETE_EBOOKS, UPDATE_EBOOKS, EBOOKS_LOADING } from '../actions/types';

export const getEBooks = () => dispatch => {
    dispatch(setEBooksLoading);
    axios
        .get('/api/ebooks')
        .then(res =>
            dispatch({
                type: GET_EBOOKS,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err);
            // dispatch(returnErrors(err.response.data, err.response.status))
        });
}

export const setEBooksLoading = () => {
    return {
        type: EBOOKS_LOADING
    }
}