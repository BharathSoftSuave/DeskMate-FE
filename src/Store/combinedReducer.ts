import { combineReducers } from 'redux';
import authReducer from "./authSlice"
import statusSlice from "./statusSlice";

const combinedReducer = combineReducers({
    auth: authReducer,
    status: statusSlice
});

export default combinedReducer;