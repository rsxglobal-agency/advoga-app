import React from 'react';
import {StackNavigator} from 'react-navigation';
import transition from './transitions';
import {
    MainRoutes
} from './routes';

let main = {};
let flatRoutes = {};

const DrawerRoutes = Object.keys(main).reduce((routes, name) => {
    let stack_name = name;
    routes[stack_name] = {
        name: stack_name,
        screen: StackNavigator(flatRoutes, {
            initialRouteName: name,
            headerMode: 'float',
            cardStyle: {backgroundColor: 'transparent'},
            transitionConfig: transition
        })
    };
    return routes;
}, {});

export const AppRoutes = MainRoutes;