const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {

  headerTop: {
    flexDirection: 'row',
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10,
    backgroundColor: '#11453F'
  },

  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 25,
    top: Platform.OS === "android" ? deviceHeight / 17 : deviceHeight / 17,
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#C8AA71',
    borderRadius: 46,
  },


  headerRating: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 2.5 : deviceWidth / 3,
    top: Platform.OS === "android" ? deviceHeight / 6.2 : deviceHeight / 6.1,
    // left: 115,
    // top: 90,
    width: 20,
    height: 20,
  }, 


  headerText: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 2.5 : deviceWidth / 3,
    top: Platform.OS === "android" ? deviceHeight / 7.5 : deviceHeight / 7,
    color: '#fff',
    fontSize: 12
  }, 


  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },


  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },

  
  separator: {
    backgroundColor: 'transparent',
    borderTopColor: '#9A9A9A',
    borderTopWidth: 1,
  }



};
