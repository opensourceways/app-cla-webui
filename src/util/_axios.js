import axios from "axios";
import Cookies from "js-cookie";
let instance = axios.create({
  timeout: 20000,
  baseURL: '/api',
});
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = Cookies.get('csrf_token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
