import { combineReducers } from 'redux';
import eBookReducer from './eBookReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    eBook: eBookReducer,
    error: errorReducer,
    auth: authReducer
});