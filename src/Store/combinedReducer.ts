import { combineReducers } from 'redux';
import authReducer from "./authSlice"


const combinedReducer = combineReducers({
    auth: authReducer,
});

export default combinedReducer;