import axios from '../axios-api';
import { push } from 'connected-react-router';
import { getPhotos } from './dataActions';

export const loginError = (err) => {
    return ({ type: "LOGIN_ERROR", err });
};

export const registerError = (err) => {
    return ({ type: "REGISTER_ERROR", err });
};

export const loginSuccess = (user) => {
    return ({ type: "LOGIN_SUCCESS", user });
};

export const registerSuccess = (user) => {
    return ({ type: "REGISTER_SUCCESS", user });
};

export const logoutUser = () => {
    return { type: "LOGOUT" }
};

export const loginUser = (user) => {
    return async dispatch => {
        try {
            const response = await axios.post('/users/sessions', user);
            dispatch(loginSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginError(error.response.data));
        }
    }
};

export const registerUser = (user) => {
    return async dispatch => {
        try {
            const response = await axios.post('/users', user);
            console.log(response);
            dispatch(registerSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            if (error.response.data.code === 11000) {
                const errorCode = { error: "Username is already used" };
                dispatch(registerError(errorCode));
            } else {
                dispatch(registerError(error.response.data));
            }
        }
    }
};

export const logout = () => {
    return async (dispatch, getState) => {
        const state = getState();
        await axios.delete('/users/sessions',
            { headers: { "Authorization": state.user.user.token } });
        dispatch(logoutUser());
        dispatch(getPhotos());
        dispatch(push('/'));
    }
};

export const isLogined = () => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            dispatch(push('/login'));
        }
    }
};

