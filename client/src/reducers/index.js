import { combineReducers } from 'redux';
import eBookReducer from './eBookReducer';

export default combineReducers({
    eBook: eBookReducer
});