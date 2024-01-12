export default (err) => {
  const { response } = err;
  if (!response.status) {
    err.status = '';
    err.code = '';
    err.msg = '有response但没有response.status的情况';
  }
  err.status = response.status;
  err.code = response.data?.code || '';
  err.msg = response.data?.msg || '';

  if (err.msg === '' && err.status !== 400) {
    switch (response.status) {
      case 404:
        err.msg = '请求出错(404)';
        break;
      case 408:
        err.msg = '请求超时(408)';
        break;
      case 418:
        err.msg = '疑似攻击行为(418)';
        break;
      default:
        err.msg = `连接出错，状态码：(${err.response.status})!`;
    }
  }

  return err;
};
