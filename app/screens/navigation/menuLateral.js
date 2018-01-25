import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

export class MenuLateral extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dados:{},
      
    }
  }

  componentDidMount(){
    this.dados();
  }

  dados = async () => {
    try {
      const value = await AsyncStorage.getItem('@user:dados');
      if (value !== null){
        var dados = JSON.parse(value);
        this.setState({dados: dados})
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  render() {
    let dados = this.state.dados;

    return (
      <View style={styles.container}>
        <Text>Bem Vindo {dados.nome} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});