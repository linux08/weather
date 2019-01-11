import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WeatherScreen from '../screens/WeatherScreen';
import SunriseScreen from '../screens/SunriseScreen';


export const MainTabNavigator = createBottomTabNavigator({
    Weather: {
        screen: WeatherScreen,
        navigationOptions: () => ({
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name="md-sunny"
                />
            ),
        })
    },
    Sunrise: {
        screen: SunriseScreen,
        navigationOptions: () => ({
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name="ios-cloud"
                />
            ),
        })
    },
});

export default createAppContainer(MainTabNavigator);