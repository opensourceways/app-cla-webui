import axios from 'axios';
import Cookies from 'js-cookie';
let instance = axios.create({
    timeout: 10000,
    baseURL: '/api'
});
instance.interceptors.response.use(response => {
    response.headers.token && sessionStorage.setItem('token', response.headers.token);
    return response;
}, error => {
    let _response = error.response;
    switch (_response.status) {
        case 401:
        case 403:
            sessionStorage.clear();
    }
    return Promise.reject(error.response);
});

instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      const token = Cookies.get('csrf_token');
      if (token) {
        config.headers['csrf_token'] = token;
      }
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
export default instance;
