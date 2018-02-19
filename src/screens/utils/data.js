import axios from 'axios';
import { AsyncStorage } from 'react-native';
var FormData = require('form-data');

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://advoga-dashboard.herokuapp.com/public/api',
      timeout: 60000,
    });

    this.api.interceptors.response.use(response => {
      if (response.data.success) {
        if (response.data.data !== undefined) {
          return Promise.resolve(response.data.data);
        }
        else {
          return Promise.resolve(response.data.total);
        }
      } else {
        return Promise.reject(response);
      }
    }, error => {
      console.log('error');
      return Promise.reject(error);
    });
  }

 
  getDemandas() {
    console.log('diogo');
  }
}

export default (new Api());
