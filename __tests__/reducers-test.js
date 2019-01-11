import reducer from '../reducers/weather';
import * as types from '../actions/actionTypes';
import * as API from '../utils/api';

describe('weather reducer', async () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                weather: undefined,
                loading: true,
                error: null,
            }
        )
    })

    it('should get weather', async () => {
        const weather = await API.getWeather();
        expect(
            reducer([], {
                type: types.SAVE_WEATHER,
                weather: weather.data,
            })
        ).toEqual(
            {
                weather: weather.data,
            }
        )
    })
})