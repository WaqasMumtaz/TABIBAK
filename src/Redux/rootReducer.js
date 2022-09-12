import { combineReducers } from 'redux';
import changeLanguage from './reducersActions/changeLanguage';
import userReducer from './reducersActions/userReducer';


export default combineReducers({
    changeLanguage,
    userReducer
})