/**
 * @param {axios} axios实例
 * @param {config} 自定义配置对象，可覆盖掉默认的自定义配置
 */
export default (axios, config = {}) => {
  const defaultConfig = {
    baseURL: '',
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  Object.assign(axios.defaults, defaultConfig, config);
  return axios;
};
