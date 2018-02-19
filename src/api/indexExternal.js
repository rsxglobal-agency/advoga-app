import { API_URL_PRODUCTS, API_PARAMS_PRODUCTS } from 'react-native-dotenv';
import axios from 'axios';

class ApiExternal
{
  constructor() {

    this.createObject(API_URL_PRODUCTS);
  }

  createObject(url) {

    this.apiExternal = axios.create({
      baseURL: url,
      timeout: 60000,
    });

    this.apiExternal.interceptors.response.use(response => {
      if (response.data.data != null) {
        if (response.data.total != "0") {
          return Promise.resolve(response.data.data);
        }
        else {
          return Promise.resolve([]);
        }
      }
      else {
        return Promise.reject(response);
      }
    }, error => {
      console.log(error);
      return Promise.reject(error);
    });
  }

  getProducts(page, search) {

    if (search == '') {
        search = 'makeup';
    }

    this.createObject(API_URL_PRODUCTS + encodeURIComponent(API_PARAMS_PRODUCTS + 'ItemPage=' + page + ';Keywords=' + search));

    return this.apiExternal.get();
  }

}

export default (new ApiExternal());