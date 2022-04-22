import {combineReducers} from "redux";
import loginReducer from './loginReducer';
import globalReducer from './globalReducer';

const allReducers = combineReducers({
    auth: loginReducer,
    global: globalReducer,
})


export default allReducers