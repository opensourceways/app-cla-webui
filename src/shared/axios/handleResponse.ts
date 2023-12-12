import type { AxiosResponse } from 'axios';
// 处理响应错误码
export default (response: AxiosResponse) => {
  const { status } = response;
  // 如果http响应状态码response.status正常，则直接返回数据
  if ((status >= 200 && status <= 300) || status === 304) {
    return response;
  } else {
    const code = parseInt(response.data && response.data.code);
    const message = (response.data || {}).msg;

    return {
      code,
      message,
    };
  }
};
