import { SET_TASKS, SET_LOADING, Actions, TTasks} from "../actions/TaskActions";

export declare type TaskState = {
    tasks: Array<TTasks>,
    taskCount:number,
    loading:boolean
}

const initialState: TaskState = {
    tasks: [],
    taskCount:0,
    loading:false
};



const tasksReducer = (state = initialState, action: Actions): TaskState => {
    let newState;
    switch (action.type) {
        case SET_TASKS:
            newState = { ...state, tasks: action.tasks, taskCount:action.taskCount };
            break;
        case SET_LOADING:
            newState = { ...state, loading: action.loading};
            break;
    }
    return newState || state;
};

export default tasksReducer;