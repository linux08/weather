import React from 'react';
import App from '../App';
import Spinner from '../components/Spinner';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

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


describe('App snapshot', () => {
  jest.useFakeTimers();
  jest.setTimeout(30000);
  it('renders the Main screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
