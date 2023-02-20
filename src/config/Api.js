import axios from 'axios';
import {REFRESH_TOKEN, BASE_URL} from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL = BASE_URL;
const config = {
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
};
export let Axios = axios.create(config);
const refereshToken = async response => {
  console.log(response, 'referersh token');
  const res = await axios({
    method: 'post',
    url: baseURL + REFRESH_TOKEN,
    headers: {
      'X-Custom-Header': 'foobar',
      Authorization: response.config.headers.Authorization,
    },
  });
  await AsyncStorage.mergeItem('Auth', JSON.stringify({token: res.token}));
  return res;
};
Axios.interceptors.request.use(
  async response => {
    const Auth = await AsyncStorage.getItem('Auth');
    const data = Auth != null ? JSON.parse(Auth) : {};
    if (data.token) {
      response.headers.Authorization = 'Bearer ' + data.token;
    } else {
      response.headers.Authorization = 'Bearer {empty token}';
    }
    console.log('request interceptors response', response);
    return response;
  },
  error => {
    console.log('request error interceptors', error);
    return error;
  },
);
Axios.interceptors.response.use(
  async response => {
    console.log(response.request._url, response);
    if (response.data.status === 401) {
      const results = await refereshToken(response);
      console.log(results, 'refereshToken response ');
      if (results.status === 200) {
        const res = await axios({
          method: response.config.method,
          url: response.config.baseURL + response.config.url,
          body: response.config.data,
          headers: {
            'X-Custom-Header': 'foobar',
            Authorization: results.token,
          },
        });
        console.log('response after token referersh', res);
        return res;
      } else {
        return response;
      }
    } else {
      return response;
    }
  },
  error => {
    console.log(
      'response error interceptors',
      error.response,
      error,
      error.message,
    );
    return error;
  },
);
