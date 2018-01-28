import React, { Component } from "react";
import { Container, Button, H3, Text, Header, Left, Body, Title, Right, Icon, Content } from "native-base";
import StyleDefault  from '../utils/styleDefault';

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

class Home extends Component {
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
              <Icon style={StyleDefault.icon} name="ios-refresh" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>Home</Text>
        </Content>
      </Container>
    );
  }
}

export default Home;
