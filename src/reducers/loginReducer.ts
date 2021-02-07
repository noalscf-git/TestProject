import { SET_TOKEN, Actions} from "../actions/LoginActions";

export declare type LoginState = {
    token: string
}

const initialState: LoginState = {
    token: ''
};

const loginReducer = (state = initialState, action: Actions): LoginState => {
    let newState;
    switch (action.type) {
        case SET_TOKEN:
            newState = { ...state, token: action.token};
            break;
    }
    return newState || state;
};

export default loginReducer;