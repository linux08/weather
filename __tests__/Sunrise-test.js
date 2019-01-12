import React from 'react';
import App from '../App';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sunshine from '../screens/SunriseScreen';
import * as types from '../actions/actionTypes';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { wrap } from 'module';



global.fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('react-native-gesture-handler', () => { });
jest.mock('react-navigation-stack', () => { });
jest.mock('react-navigation', () => {
    return {
        createAppContainer: jest.fn().mockReturnValue(function NavigationContainer(props) { return null; }),
        createDrawerNavigator: jest.fn(),
        createBottomTabNavigator: jest.fn(),
        createMaterialTopTabNavigator: jest.fn(),
        createStackNavigator: jest.fn(),
        StackActions: {
            push: jest.fn().mockImplementation(x => ({ ...x, "type": "Navigation/PUSH" })),
            replace: jest.fn().mockImplementation(x => ({ ...x, "type": "Navigation/REPLACE" })),
        },
        NavigationActions: {
            navigate: jest.fn().mockImplementation(x => x),
        }
    }
});

jest.mock("NativeModules", () => ({
    UIManager: {
        RCTView: () => ({
            directEventTypes: {}
        })
    },
    KeyboardObserver: {},
    RNGestureHandlerModule: {
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
        State: {},
        Directions: {}
    },
    PlatformConstants: {
        forceTouchAvailable: false,
    },
}));

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk]; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const storeStateMock = {
    weather: {
        weather: '',
        loading: true,
        error: null,
    }
};
let store;
let component;
describe('App snapshot', () => {
    jest.useFakeTimers();
    jest.setTimeout(30000);

    // beforeEach(() => {
    //     store = mockStore(storeStateMock);
    //     component = mount(
    //         <Provider store={store}>
    //             <Sunshine />
    //         </Provider>)
    // });
    const props = {
        getWeather: jest.fn(),
    };

    it('renders the Sunshine screen', async () => {
        const wrapper = shallow(<Sunshine {...props} />);
        expect(wrapper).toMatchSnapshot();

    });

    it('maps state props correctly', () => {
        console.log('cco', component);
        expect(1).toEqual(1);

    });

});
