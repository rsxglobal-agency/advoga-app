console.log('http');
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
                headers.Authorization = token;
            }
            fetch(url, {headers: headers}).then((response) => response.json()).then((responseJson) => {
                if (callbackSuccess && typeof(callbackSuccess) === "function"){
                    console.log(url, headers);
                    callbackSuccess(responseJson);
                }
            }).catch((error) => {
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
                headers.Authorization = token;
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

export default HttpService;