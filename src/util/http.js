import axios from 'axios';
import Cookies from 'js-cookie';
let instance = axios.create({
    timeout: 10000,
    baseURL: '/api'
});
// instance.interceptors.request.use(req => {
//     let token = sessionStorage.getItem('token');
//     token && (req.headers['Token'] = `${token}`);
//     return req;
// }, error => Promise.reject(error));
// instance.interceptors.response.use(response => {
//     response.headers.token && sessionStorage.setItem('token', response.headers.token);
//     return response;
// }, error => {
//     let _response = error.response;
//     switch (_response.status) {
//         case 401:
//         case 403:
//             sessionStorage.clear();
//     }
//     return Promise.reject(error.response);
// });

instance.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      console.log('1');
      const token = Cookies.get('csrf_token');
      if (token) {
        config.headers['token'] = token;
        console.log(token);
      }
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }

  );
export default instance;
