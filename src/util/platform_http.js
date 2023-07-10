import axios from 'axios';

let instance = axios.create({
  timeout: 10000,
  baseURL: '/api',
});
instance.interceptors.request.use(
  (req) => {
    let token = sessionStorage.getItem('platform_token');
    token && (req.headers['Authorization'] = `token ${token}`);
    return req;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => {
    response.headers.token &&
      sessionStorage.setItem('token', response.headers.token);
    return response;
  },
  (error) => {
    let _response = error.response;
    switch (_response.status) {
      case 401:
      case 403:
        sessionStorage.clear();
    }
    return Promise.reject(error.response);
  }
);
export default instance;
