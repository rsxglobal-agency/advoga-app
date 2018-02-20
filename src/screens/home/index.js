import React, { Component } from "react";
import { Image, AsyncStorage, View, TouchableOpacity, FlatList } from "react-native";
import { Thumbnail, Container, Button, Text, H3, Header, Left, Body, Title, Right, Icon, Content, Card, CardItem } from "native-base";
import StyleDefault  from '../utils/styleDefault';
import styles from "./styles";
import Rating from 'react-native-rating';
import { Easing } from 'react-native';
import HttpService  from '../utils/http';


const images = {
  starFilled: require('../../../assets/Icons/star_filled.png'),
  starUnfilled: require('../../../assets/Icons/star_unfilled.png')
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      dadosUser:[],
      nota: 0,
      demandas:[]
    };  

    this.renderItem = this._renderItem.bind(this);
  }
  

 async componentDidMount(){
      try {
        const value = await AsyncStorage.getItem('@user:dados');
        if (value !== null){
          var dados = JSON.parse(value);
          this.setState({ dadosUser: dados });
          // this.setState(dados: dados)
          this.setState({nota: dados.nota});

          let demandas = await new Promise((resolve)=>{
              HttpService.get('/feed-demandas', dados.remember_token, [], function(result){
                  if(result){
                      resolve(result);
                  }else{
                      resolve(false);
                  }
              }, function (error) {
                  resolve(false);
              });
          });

          if(demandas){
            // console.log(demandas);
            this.setState({ demandas: demandas });
          }
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
  }

  async componentWillMount(){

  }

  async _getDemand(){
    alert('demanda aceita');
  }

  _renderItem(info) {
    console.log(info.item);
    if(info.item.image!=''){
      var url = 'http://www.advogaapp.com.br/uploads/avatars/'+ info.item.image;
    }else
    {
      var url =  'https://firebasestorage.googleapis.com/v0/b/advogaapp.appspot.com/o/photo_default.png?alt=media&token=59993b39-5631-41e1-bfb7-9d3d8aa4f63c';
    }

    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        //onPress={() => this.props.navigation.navigate('Demanda', {id: info.item.id})}
        >
          <Card style={{flex: 0}}>

            <CardItem style={{backgroundColor: '#fff'}}>
              <Left>
                <Thumbnail source={{ uri: url }} />
                <Body>
                  <Text> {info.item.nome} </Text>
                  <Rating
                    initial={3}
                    selectedStar={images.starFilled}
                    unselectedStar={images.starUnfilled}
                    config={{
                      easing: Easing.inOut(Easing.ease),
                      duration: 350,

                    }}
                    stagger={80}
                    maxScale={1.4}
                    starStyle={{
                      width: 20,
                      height: 20,
                    }}
                  />


                  <Text note></Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem style={styles.containerText}>
              <Body>               
                <H3 style={styles.titleText}>Titulo:</H3> 
                <Text style={styles.infoText}>
                  {info.item.titulodemanda}
                </Text>
                <H3 style={styles.titleText}>Local:</H3> 
                <Text style={styles.infoText}>
                  {info.item.cidade} / {info.item.estado}
                </Text>
                <H3 style={styles.titleText}>Descrição da Demanda:</H3>                
                <Text style={styles.infoText}>
                  {info.item.descricaodemanda}
                </Text>
                <H3 style={styles.titleText}>Áreas de atuação:</H3>
                <Text style={styles.infoText}>
                </Text>
                <H3 style={styles.titleText}>Serviços prestados:</H3>
                <Text style={styles.infoText}>
                </Text>
                <Button block 
                style={{backgroundColor: '#9E8151'}}
                onPress={this._getDemand}
                >
                  <Text>Aceitar Demanda </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
      </TouchableOpacity>
    )
  }

  _keyExtractor(post) {
    return post.id;
  }


  render() {
    let dados  = this.state.dadosUser;

    return (
      // cabecalho
      <Container>
        <Header style={StyleDefault.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={StyleDefault.icon} name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={StyleDefault.font}>
            Advoga App
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon style={StyleDefault.icon} name="ios-refresh" />
            </Button>
          </Right>
        </Header>

        <Content style={{backgroundColor: '#fff'}}>
          <FlatList
            data={this.state.demandas}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            style={styles.flatList}/>
        </Content>
      
      </Container>
    );
  }
}

export default Home;
