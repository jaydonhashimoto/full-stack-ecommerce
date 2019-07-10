import axios from 'axios';
import { GET_EBOOKS, ADD_EBOOK, DELETE_EBOOK, UPDATE_EBOOK, EBOOKS_LOADING } from '../actions/types';

export const getEBooks = () => dispatch => {
    dispatch(setEBooksLoading());
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

export const addEBook = (eBook) => (dispatch) => {
    axios
        .post('/api/ebooks', {
            title: eBook.title,
            description: eBook.description,
            author: eBook.author,
            img: eBook.img,
            price: eBook.price,
            date_added: eBook.date_added
        })
        .then(res =>
            dispatch({
                type: ADD_EBOOK,
                payload: res.data
            })
        )
        .catch(err => {
            console.log(err);
            // dispatch(returnErrors(err.response.data, err.response.status))
        });
};

export const deleteEBook = (id, img) => (dispatch) => {
    axios
        .post('/api/ebooks/delete', {
            id: id,
            img: img
        })
        .then(res => {
            dispatch({
                type: DELETE_EBOOK,
                payload: id
            })
        })
        .catch(err => {
            console.log(err);
        });
}

export const setEBooksLoading = () => {
    return {
        type: EBOOKS_LOADING
    }
}