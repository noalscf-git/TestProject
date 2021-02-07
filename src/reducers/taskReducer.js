import { SET_TASKS, SET_LOADING } from "../actions/TaskActions";
const initialState = {
    tasks: [],
    taskCount: 0,
    loading: false
};
const tasksReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_TASKS:
            newState = Object.assign(Object.assign({}, state), { tasks: action.tasks, taskCount: action.taskCount });
            break;
        case SET_LOADING:
            newState = Object.assign(Object.assign({}, state), { loading: action.loading });
            break;
    }
    return newState || state;
};
export default tasksReducer;
