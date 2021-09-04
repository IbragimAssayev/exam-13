const initialState = {
    photos: [],
    ratings:[],
    places:[]
};
const dataReducer = (state = initialState, action) => {
    if (action.type === "GET_PHOTOS") {
        return { ...state, photos: action.photos }
    } else if (action.type === "GET_RATINGS") {
        return {...state, ratings: action.ratings}
    } else if (action.type === "GET_PLACES") {
        return {...state, places: action.places}
    }
    return state;
};
export default dataReducer;
