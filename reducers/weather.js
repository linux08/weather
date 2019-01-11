import * as types from '../actions/actionTypes';

const weatherReducer = (
    state = {
        weather: '',
        loading: true,
        error: null,
    },
    action,
) => {
    switch (action.type) {
        case types.GET_WEATHER:
            return { ...state, weather: action.weather };
        case types.SAVE_WEATHER:
            return { ...state, weather: action.weather };
        case types.WEATHER_IS_LOADING:
            return { ...state, loading: action.isLoading };
        case types.HANDLE_WEATHER_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default weatherReducer;
