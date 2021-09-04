const initialState = {
    photos: []
};
const dataReducer = (state = initialState, action) => {
    if (action.type === "GET_PHOTOS") {
        return { ...state, photos: action.photos }
    }
    return state;
};
export default dataReducer;
