import { combineReducers } from 'redux';
import login from './loginReducer';
import tasks from "./taskReducer";
export default combineReducers({
    tasks,
    login
});
