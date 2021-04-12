import axios from 'axios'
import router from '../router/index'

let instance = axios.create({
    timeout: 10000,
    baseURL: '/api',
});
instance.interceptors.request.use(req => {
    let token = sessionStorage.getItem('sign_access_token');
    token && token !== 'undefined' && (req.headers['Token'] = `${token}`);
    return req
}, error => Promise.reject(error));
instance.interceptors.response.use(response => {
    response.headers.token && sessionStorage.setItem('sign_access_token', response.headers.token);
    return response
}, error => {
    let _response = error.response;
    switch (_response.status) {
        case 401:
        case 403:
            sessionStorage.clear();
    }
    return Promise.reject(error.response)
});
export default instance