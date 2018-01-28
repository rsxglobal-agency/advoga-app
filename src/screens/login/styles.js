const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
screen: {

    padding: 16,

    flex: 1,

    backgroundColor: "#11453F",

  },

  container: {
    flex: 1,
    backgroundColor: '#11453F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  headerTop: {
    alignItems: 'center',
    maxWidth: 130,
    maxHeight: 150,
  },

  logo: {
    height: 150,
    width: 135,

  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },

  campoInput: { 
    width: 300, 
    height: 40,
    padding: 8,
    borderWidth: 0,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  buttonLogin:{
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: 'center', 
    width: 300,
    marginTop: 5,
    color: '#fff',
    backgroundColor: '#9E8151'
  },
  checkbox:{
    backgroundColor: '#11453F',
    borderWidth: 0
  },

  buttonNewPass:{
    textAlign: 'center',
    color: '#fff',
    marginTop:20,
  },
  buttonNewAccount:{
    textAlign: 'center',
    color: '#fff',
    marginTop:20,
    fontWeight: 'bold', 
  },

  footer: {}


};
