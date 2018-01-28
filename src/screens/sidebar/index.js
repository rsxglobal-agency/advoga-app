import React, { Component } from "react";
import { Image, AsyncStorage } from "react-native";
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
    },
];


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      dados:{}
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
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  render() {
    let dados = this.state.dados;
    console.log(dados);
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image style={styles.drawerCover} />
          <Image 
            square 
            style={styles.drawerImage}
            source={{ uri: 'http://www.advogaapp.com.br/uploads/avatars/'+ dados.img }} 
            />
          <ListItem itemDivider>
            <Text>Ações</Text>
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
          <ListItem itemDivider>
            <Text>Minhas Demandas</Text>
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
          <ListItem itemDivider>
            <Text>Minhas Diligências</Text>
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
          <ListItem itemDivider>
            <Text> </Text>
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
      </Container>
    );
  }
}

export default SideBar;
