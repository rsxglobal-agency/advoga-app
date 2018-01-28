import React from "react";
import Setup from "./src/boot/setup";
import { Font } from 'expo';

export default class App extends React.Component {

async componentDidMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('./assets/fonts/Roboto.ttf'),
        'Roboto_medium': require('./assets/fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
  }


  render() {
    return <Setup />;
  }
}



// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import {
//   Container,
//   Header,
//   Title,
//   Content,
//   Button,
//   Left,
//   Right,
//   Body,
//   Text
// } from "native-base";



// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//       <Container>
//       <Content>
//         <Text>Open up App.js to start working on your app!</Text>
//       </Content>
//       </Container>
//       </View>
//     );
//   }
// }
  
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
