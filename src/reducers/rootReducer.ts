import { combineReducers } from 'redux';
import login, {LoginState} from './loginReducer';
import tasks, {TaskState} from "./taskReducer";


export declare type AppState = {
    tasks: TaskState
    login: LoginState
}

export default combineReducers({
    tasks,
    login
});