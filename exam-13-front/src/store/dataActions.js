import axios from '../axios-api';
import { push } from 'connected-react-router';

export const getPlaces = () => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            const response = await axios.get('/places');
            dispatch({ type: "GET_PLACES", places: response });
        } else {
            const response = await axios.get('/places',
                { headers: { "Authorization": state.user.user.token } });
            dispatch({ type: "GET_PLACES", places: response });
        }
    };
};

export const getPhotos = (id) => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            const response = await axios.get('/photos/'+id);
            dispatch({ type: "GET_PHOTOS", photos: response });
        } else {
            const response = await axios.get('/photos/'+id,
                { headers: { "Authorization": state.user.user.token } });
            dispatch({ type: "GET_PHOTOS", photos: response });
        }
    };
};

export const getRating = (id) => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            const response = await axios.get('/ratings/' +id);
            console.log(response)
            dispatch({ type: "GET_RATINGS", ratings: response });
        } else {
            const response = await axios.get('/ratings/' +id,
                { headers: { "Authorization": state.user.user.token } });
            dispatch({ type: "GET_RATINGS", ratings: response });
        }
    };
}

export const getOnePlace = (id) => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            const response = await axios.get('/places/' + id);
            console.log(response)
            dispatch({ type: "GET_PLACES", places: response });
        } else {
            const response = await axios.get('/places/' + id,
                { headers: { "Authorization": state.user.user.token } });
            dispatch({ type: "GET_PLACES", places: response });
        }
    };
};

export const postNewRating = (id ,data) => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            dispatch(push('/'));
        } else {
            await axios.post(`/ratings/${id}`, data,
                { headers: { "Authorization": state.user.user.token } }).then(res => {
                console.log(res);
                dispatch(push('/'));
            })
        }
    };
};

export const postNewPhoto = (id ,data) => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            dispatch(push('/'));
        } else {
            await axios.post(`/photos/${id}`, data,
                { headers: { "Authorization": state.user.user.token } }).then(res => {
                console.log(res);
                dispatch(push('/'));
            })
        }
    };
};

export const postNewPlace = (data) => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            dispatch(push('/'));
        } else {
            await axios.post('/places', data,
                { headers: { "Authorization": state.user.user.token } }).then(res => {
                    console.log(res);
                    dispatch(push('/'));
                })
        }
    };
};

export const deletePhoto = id => {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.user.user === null) {
            dispatch(push('/'));
        } else {
            const response = await axios.delete('/places/' + id,
                { headers: { "Authorization": state.user.user.token } });
                console.log(response.data);
            dispatch({ type: "GET_PHOTOS", photos: response });
        }
    };
};
