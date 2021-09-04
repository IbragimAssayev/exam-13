const initialState = {
    user: null,
    loginError: null,
    registerError: null
};
const userReducer = (state = initialState, action) => {
    if (action.type === "LOGIN_ERROR") {
        return { ...state, loginError: action.err }
    }
    if (action.type === "REGISTER_ERROR") {
        return { ...state, registerError: action.err }
    }
    if (action.type === "LOGIN_SUCCESS") {
        return { ...state, user: action.user, loginError: null, registerError: null }
    }
    if (action.type === "REGISTER_SUCCESS") {
        return { ...state, user: action.user, loginError: null, registerError: null }
    }
    if (action.type === "LOGOUT") {
        return { ...state, user: null }
    }
    return state;
};
export default userReducer;
