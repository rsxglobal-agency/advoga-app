const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {

	cardInfo: {
		flex:0,
	},

	headerInfo: {
		backgroundColor: '#11453F',
		height: 70,

	},
	imageHeader:{
    	borderWidth: 1,
    	borderColor: '#C8AA71',
    	//borderRadius: 46,
    	top:7
	},

  headerRating: {
	backgroundColor: '#11453F',
	flex:1,
  }, 
  
  headerText: {
   	color: '#C8AA71',
    fontSize: 14,
    paddingLeft: 15,
    flexDirection: 'column',
  },   
  dadosOutros: {
    flex:1,
  	flexDirection: 'column',
  	top:5
  },   
  headerDadosInfo: {
   	color: '#fff',
    fontSize: 12,
    paddingLeft: 15,
   // left: Platform.OS === "android" ? deviceWidth / 5 : deviceWidth / 25,
    //top: Platform.OS === "android" ? deviceHeight / 5 : deviceHeight / 17,
  },

  headerCard: {
    backgroundColor: '#EDEDED',
  },

  bodyInfo: {
    backgroundColor: '#000',
  },

  containerText: {
    borderWidth: 1,
    borderColor: '#9E8151',
    backgroundColor: '#EEEEEE',
  },

  flatList: {
    elevation: 10,
    shadowRadius: 0
  },

  titleText:{
    fontWeight: '700',
    fontSize: 14,
  },

  infoText:{
    fontWeight: '300',
    fontSize: 12,
  },


  
};
