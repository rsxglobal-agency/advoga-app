import React from 'react';
import {
    DrawerNavigator,
    TabBarBottom,
    StackNavigator
} from 'react-navigation';
import {AppRoutes} from './config/navigation/routesBuilder';
import { Font } from 'expo';
import {StatusBar} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Screens from './screens';
import { StyleSheet, Text, View, Platform } from 'react-native';

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}
const AdvogaApp = StackNavigator({
  First: {
    screen: Screens.Login
  },
  Home: {
    screen: DrawerNavigator({
        ...AppRoutes,
      },
      {
        headerMode: 'float',
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch (routeName) {
              case 'Home':
                iconName =
                  Platform.OS === 'ios'
                ? `ios-cart${focused ? '' : '-outline'}`
                : 'md-cart';
                break;
            }
            return (
              <Ionicons
                name={iconName}
                size={28}
                style={{ marginBottom: -3 }}
               
              />
            );
          },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,


      })
  }
}, 
  {
  headerMode: 'none',
});

const defaultGetStateForAction = AdvogaApp.router.getStateForAction;
AdvogaApp.router.getStateForAction = (action, state) => {
        if(state && action.type === 'ReplaceCurrentScreen'){
            let routes = state.routes.slice(0, state.routes.length - 1);
            routes.push(action);
            return {
                ...state,
                routes,
                index: state.routes.length - 1,
            };

        }
        return defaultGetStateForAction(action, state);
    };

export default class App extends React.Component{
    state = {
        fontLoaded: false,
        realm: null
    };
    async componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        await Font.loadAsync({
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
            'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
            'fontawesome': require('./assets/fonts/fontawesome.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    componentWillMount() {
    }

    render(){
        return(
            this.state.fontLoaded ?
            <AdvogaApp
            /> : null
        );
    }
}
