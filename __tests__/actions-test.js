import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as actions from '../actions/weather';
import * as API from '../utils/api';
import * as types from '../actions/actionTypes';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('actions', async () => {
    jest.setTimeout(30000);
    afterEach(() => {
        fetchMock.restore()
    });
    const store = mockStore({});

    it('should get weather information', async () => {
        const weather = await API.getWeather();
        const expectedActions = [
            { type: types.SAVE_WEATHER, weather: weather.data },
        ]
        return store.dispatch(actions.getWeatherInfo()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})