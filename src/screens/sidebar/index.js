import React, { Component } from "react";
import { Image, AsyncStorage, View } from "react-native";
import Rating from 'react-native-rating'
import { Easing } from 'react-native'
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-kitchen-sink.png");

const images = {
  starFilled: require('../../../assets/Icons/star_filled.png'),
  starUnfilled: require('../../../assets/Icons/star_unfilled.png')
}

const datasAcoes = [
  {
    name: "Lançar Demandas",
    route: "LancarDemandas",
    icon: "phone-portrait",
    bg: "#C5F442",

  },
  {
    name: "Buscar Profissional",
    route: "BuscarProfissional",
    icon: "easel",
    bg: "#C5F442",
  },
];
const datasDemandas = [
  {
    name: "Lançadas",
    route: "Lancadas",
    icon: "ios-briefcase",
    bg: "#C5F442",
  },
  {
    name: "Em execução",
    route: "ExecucaoDemandas",
    icon: "ios-time",
    bg: "#C5F442",
  },
];
const datasDiligencias = [
  { 
    name: "Candidaturas",
    route: "Candidaturas",
    icon: "ios-person",
    bg: "#C5F442",
  },
  { 
    name: "Em execução",
    route: "execucaoDiligencia",
    icon: "ios-people",
    bg: "#C5F442",
  },
];
const datas = [
    { 
      name: "Histórico",
      route: "Historico",
      icon: "easel",
      bg: "#C5F442",
    },
    { 
      name: "Chat",
      route: "Chat",
      icon: "ios-chatbubbles",
      bg: "#C5F442",
    },
    {
      name: "Geolocalização",
      route: "Geolocalizacao",
      icon: "ios-map",
      bg: "#C5F442",
    }
    // {
    //   name: "Logout",
    //   route: "Logout",
    //     icon: "ios-map",
    //   bg: "#C5F442",
    // },
];


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      dados:{},
      nota: 0
    };
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
        this.setState({nota: dados.nota})

      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  render() {
    let dados  = this.state.dados;
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
        <View style={styles.headerTop}>
          <Image style={styles.drawerCover} />
          <Image 
            square 
            style={styles.drawerImage}
            source={{ uri: 'http://www.advogaapp.com.br/uploads/avatars/'+ dados.img }} 
            />
            <Text style={styles.headerText}>Bem Vindo {dados.nome}</Text>
          <View style={styles.headerRating}>
            <Rating
              initial={this.state.nota}
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
          </View>

        </View>

        <Content>
          <ListItem style={{backgroundColor: 'transparent'}} itemDivider>
            <Text>AÇÕES</Text>
          </ListItem>
          <List
            dataArray={datasAcoes}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
          <ListItem style={styles.separator} itemDivider>
            <Text>MINHAS DEMANDAS</Text>
          </ListItem>
          <List
            dataArray={datasDemandas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
          <ListItem style={styles.separator} itemDivider>
            <Text>MINHAS DILIGÊNCIAS</Text>
          </ListItem>
          <List
            dataArray={datasDiligencias}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
          <ListItem style={styles.separator} itemDivider>
          </ListItem>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>

        </Content>
      </Container>
    );
  }
}

export default SideBar;
