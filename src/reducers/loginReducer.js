import { SET_TOKEN } from "../actions/LoginActions";
const initialState = {
    token: ''
};
const loginReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_TOKEN:
            newState = Object.assign(Object.assign({}, state), { token: action.token });
            break;
    }
    return newState || state;
};
export default loginReducer;
