import { NavigationActions } from 'react-navigation';
import { 
  AsyncStorage
} from 'react-native';

let HttpService = {

    //prod:
    //apiURL: 'http://www.advogaapp.com.br/api',
    //dev:
    apiURL: 'http://advoga-dashboard.herokuapp.com/public/api',


    extractGetParams: function (params, token){
        let extractedParams = "?";
        for(let i=0; i<params.length; i++){
            if(i!==0){
                extractedParams += "&"
            }
            extractedParams += params[i].key+"="+params[i].value;
        }
        return extractedParams;
    },

    get: function(endpoint, token, params = [], callbackSuccess, callbackError){
        try {
            let url = this.apiURL + endpoint + this.extractGetParams(params, token);
            let headers = {};
            if(token !== null) {
                headers.Authorization = 'Bearer '+token;
            }
            fetch(url, {headers: headers}).then((response) => response.json()).then((responseJson) => {
                if (callbackSuccess && typeof(callbackSuccess) === "function"){
                    //console.log(url, headers);
                    callbackSuccess(responseJson);
                }
            }).catch((error) => {
               //erroDados();
                console.log(url, headers);
                throw error;
            });
        }catch(e){
            if (callbackError && typeof(callbackError) === "function"){
                callbackError(e);
            }
        }
    },

    post: function (endpoint, token, params = {}, callbackSuccess, callbackError) {
        try {
            let url = this.apiURL + endpoint;
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',};
            if(token !== null) {
                headers.Authorization = 'Bearer ' + token;
            }
            let body = JSON.stringify(params);
            console.log(body);
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            }).then((response) => response.json()).then((responseJson) => {
                if (callbackSuccess && typeof(callbackSuccess) === "function"){
                    //console.log(responseJson, params, headers);
                    callbackSuccess(responseJson);
                }
            }).catch((error) => {

                console.log(url, headers, body);
                throw error;
            });
        }catch(e){
            if (callbackError && typeof(callbackError) === "function"){
                callbackError(e);
            }
        }
    },
};


function erroDados(){

    alert('sua sessão expirou, por favor logue-se novamente!');
    AsyncStorage.clear();
    //this.props.navigator.immediatelyResetStack([Router.getRoute('main')], 0);


 }

export default HttpService;