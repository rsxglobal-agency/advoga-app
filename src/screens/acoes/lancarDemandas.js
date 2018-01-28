import React, { Component } from "react";
import { StyleSheet, Image, View } from 'react-native';
import StyleDefault from '../utils/styleDefault';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";

class LancarDemandas extends Component {
  render() {
    return (
      <Container style={styles.container}>
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
              <Icon style={StyleDefault.icon} name="ios-home" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Text>Lançar demandas</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  logo: {
    width: 20,
  },
});


export default LancarDemandas;
