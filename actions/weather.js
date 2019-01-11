import * as types from './actionTypes';
import { getWeather } from '../utils/api';

export const saveWeather = weather => ({
    type: types.SAVE_WEATHER,
    weather,
});


export const weatherIsLoading = bool => ({
    type: types.WEATHER_IS_LOADING,
    isLoading: bool,
});

export const weatherIsLoadingError = error => ({
    type: types.HANDLE_WEATHER_ERROR,
    error,
});

export const getWeatherInfo = () => (dispatch) => {
    return getWeather()
        .then((resp) => {
            // dispatch(weatherIsLoading(false));
            dispatch(saveWeather(resp.data));
        })
        .catch((err) => {
            dispatch(weatherIsLoading(false));
            dispatch(weatherIsLoadingError(err.message || 'ERROR'));
        });
};
