import { GET_EBOOKS, ADD_EBOOK, DELETE_EBOOK, UPDATE_EBOOK, EBOOKS_LOADING } from '../actions/types';

const initialState = {
    eBooks: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EBOOKS:
            return {
                ...state,
                eBooks: action.payload,
                loading: false
            }
        case ADD_EBOOK:
            return {
                ...state,
                eBooks: [action.payload, ...state.eBooks]
            }
        case DELETE_EBOOK:
            return {
                ...state,
                eBooks: state.eBooks.filter(eBook => eBook.id !== action.payload)
            }
        case UPDATE_EBOOK:
            return {
                ...state,
                eBook: [action.payload, ...state.eBooks]
            }
        case EBOOKS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}