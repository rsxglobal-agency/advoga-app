import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Font } from 'expo';
import { StatusBar } from 'react-native';


import Login from "./screens/login/login";
import Home from "./screens/home/";
import LancarDemandas from "./screens/acoes/lancarDemandas";
import BuscarProfissional from "./screens/acoes/buscarProfissional";
import SideBar from "./screens/sidebar";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    LancarDemandas: { screen: LancarDemandas },
    BuscarProfissional: { screen: BuscarProfissional }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    Login: {screen: Login}

  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default class App extends React.Component {
    state = {
        fontLoaded: false,

    };


async componentDidMount() {
      StatusBar.setHidden(false);
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
      this.setState({ fontLoaded: true });
  }

  render() {
    return(
      this.state.fontLoaded ? 
      <AppNavigator 
      /> : null
    )
  }

  // render() {
  //   return(
  // <Root>
  //   <AppNavigator />
  // </Root>
  //       )
  // }


}







