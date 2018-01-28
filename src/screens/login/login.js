import React, { Component } from "react";
import { AsyncStorage, ImageBackground, View, StatusBar, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from "react-native";
import { Container, CheckBox, Content, Form, Icon, Item, Input, Button, H3, Text } from "native-base";
import styles from "./styles";
import FirebaseApp  from '../utils/firebase-app';
import HttpService  from '../utils/http';
import { NavigationActions } from 'react-navigation'

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo.png");

class Login extends Component {
constructor(props) {
    super(props);
    this.db = FirebaseApp.database();
    this.login = this.login.bind(this);
    console.ignoredYellowBox = ['Setting a timer'];

    this.state = {
      email:'Email',
      password: 'Senha',
      checked: false,
    }
  }

  async componentWillMount(){
    try {
      const value = await AsyncStorage.getItem('@user:connect');
      if (value !== null){
        var connect = JSON.parse(value);
        console.log(connect);
        if(connect){

          this.props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({ routeName: 'Drawer' }),
              ],
          }));          
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

    async login(){
        let email = this.state.email;
        let password = this.state.password
        // let dbpass = 'PcxtRlor2135@!:.BRO';


        let check = await new Promise((resolve)=>{
            HttpService.get('/login', null, [{key: 'email', value: email}, {key: 'password', value: password}], function(result){
                // console.log(result);
                if(result.result){
                    resolve(result.result);
                }else{
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
        if(check){
            let id = check.id;
            let api_token = check.api_token;
            // salva os dados no firebase!
            let firebaseId = this.db.ref('users/'+ check.id).set({
            dados: check,
            connect: this.state.checked
          });
          try {
          await AsyncStorage.setItem('@user:dados', JSON.stringify(check));
          await AsyncStorage.setItem('@user:connect', JSON.stringify(this.state.checked));
          } catch (error) {
          console.log('erro ao salvar');
          }

            // let userNotExist = false;
            // await this.db.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            //     // Handle Errors here.
            //     let errorCode = error.code;
            //     if(errorCode === 'auth/user-not-found'){
            //         userNotExist = true;
            //     }
            //     let errorMessage = error.message;
            //     console.log("FIREBASE", errorCode, errorMessage);
            //     // ...
            // });
            // if(userNotExist){
            //     await this.db.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            //         // Handle Errors here.
            //         let errorCode = error.code;
            //         let errorMessage = error.message;
            //         console.log("FIREBASE", errorCode, errorMessage);
            //         // ...
            //     });
            // }

            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                ],
            }));
        }else{

            await new Promise((resolve)=>{
                setTimeout(()=>{
                    Alert.alert('Dados inválidos!');
                    resolve(true);
                }, 500);
            });
        }
    }

    rememberPass(){
      alert('remember pass');
    }

  render() {
    return (
      <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding">

      <View style={styles.container}>
        <View style={styles.headerTop}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.campoInput}
            maxLength={30}
            underlineColorAndroid="transparent"
            keyboardType={'default'}
            returnKeyType={'next'}
            onChangeText={(email) => this.setState({email: email})}
            placeholder='Email'
            />
          <TextInput
            placeholder='Senha'
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}
            style={styles.campoInput}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={this.login}>
          <Text style={styles.buttonLogin}> ENTRAR </Text>
          </TouchableOpacity>
            <CheckBox
              color="#000"
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked }) }
            />
              <Text>Entrar Automaticamente</Text>


          <TouchableOpacity onPress={this.rememberPass} >
            <Text style={styles.buttonNewPass}> Esqueceu sua senha? </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home'}))}>
          <Text style={styles.buttonNewAccount}> Não possui uma conta? Cadastre-se! </Text>
          </TouchableOpacity>
        </View>

      </View>
      </KeyboardAvoidingView>
    );
  }
}


export default Login;
