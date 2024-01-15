import axios from 'axios';
import handleResponse from './handleResponse';
import handleError from './handleError';
import setConfig from './setConfig';

import { useEmailDialogState } from '@/stores/user';
import { useLoadingState } from '@/stores/common';

import { ElLoading, ElMessage } from 'element-plus';
import { goAuthorize, cleanUserAuth  } from '@/shared/login';
/**
 * intactRequest是只在axios基础上更改了请求配置。
 * 而request是基于axios创建的实例，实例只有常见的数据请求方法，没有axios.isCancel/ axios.CancelToken等方法，
 * 也就是没有**取消请求**和**批量请求**的方法。
 * 所以如果需要在实例中调用取消某个请求的方法（例如取消上传），请用intactRequest。
 */
export let intactRequest = setConfig(axios);
export let request = intactRequest.create();

// 全局loading
let loadingInstance = null;
let loadingCount = 0;

// 请求中的api
let pendingPool = new Map();

/**
 * 请求拦截
 */
const requestInterceptorId = request.interceptors.request.use(
  (config) => {
    if (loadingCount === 0 && !config.$noLoading) {
      useLoadingState().setloadingState(true);
      loadingInstance = ElLoading.service({
        fullscreen: true,
        text: 'Loading',
        background: 'transparent',
      });
    }
    config.$noLoading ? '' : loadingCount++;
    // 对于异常的响应也需要在pendingPool中将其删除，但响应拦截器中的异常响应有些获取不到请求信息，这里将其保存在实例上
    request.config = { ...config };
    // 在发送请求之前做些什么
    config.cancelToken = new axios.CancelToken((cancelFn) => {
      pendingPool.has(config.url)
        ? cancelFn(`${config.url}请求过于频繁，请稍后再试。`)
        : pendingPool.set(config.url, { cancelFn, global: config.global });
    });

    return config;
  },
  (err) => {
    // 对请求错误做些什么
    Promise.reject(err);
  }
);

/**
 * 响应拦截
 */
const responseInterceptorId = request.interceptors.response.use(
  (response) => {
    const { config } = response;
    config.$noLoading ? '' : loadingCount--;

    if (loadingCount === 0 && loadingInstance) {
      useLoadingState().setloadingState(false);
      loadingInstance.close();
      loadingInstance = null;
    }
    pendingPool.delete(config.url);

    return Promise.resolve(handleResponse(response));
  },
  // 对异常响应处理
  (err) => {
    useLoadingState().setloadingState(false);
    loadingInstance?.close();
    loadingCount = 0;
    const { config } = err;
    if (!axios.isCancel(err)) {
      pendingPool.delete(config.url);
    }

    if (!err) {
      return Promise.reject(err);
    }

    if (err.response) {
      err = handleError(err);
      // token过期，重新登录
      if (err.status === 401) {
        cleanUserAuth();
        goAuthorize();
      }
      if (err.code === 'user_no_email') {
        useEmailDialogState().dialogState = true;
      }
    } else {
      // 没有response(没有状态码)的情况
      // eg: 超时；断网；请求重复被取消；主动取消请求；
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(err)) {
        throw new axios.Cancel(err.msg || `请求'${config.url}'被取消`);
      } else if (err.stack && err.stack.includes('timeout')) {
        err.msg = '请求超时!';
      } else {
        err.msg = '连接服务器失败!';
      }
    }
    if (
      !config.$doException &&
      err.code !== 'user_no_email' &&
      err.msg !== 'no token'
    ) {
      ElMessage({
        type: 'error',
        message: err.msg,
        center: true,
      });
    }

    return Promise.reject(err);
  }
);
// 移除全局的请求拦截器
function removeRequestInterceptor() {
  request.interceptors.request.eject(requestInterceptorId);
}

// 移除全局的响应拦截器
function removeResponseInterceptor() {
  request.interceptors.response.eject(responseInterceptorId);
}

/**
 * 清除所有pending状态的请求
 * @param {Array} whiteList 白名单，里面的请求不会被取消
 * 返回值 被取消了的api请求
 * 可以在路由变化时取消当前所有非全局的pending状态的请求
 */
function clearPendingPool(whiteList = []) {
  if (!pendingPool.size) return;

  const pendingUrlList = Array.from(pendingPool.keys()).filter(
    (url) => !whiteList.includes(url)
  );
  if (!pendingUrlList.length) return;

  pendingUrlList.forEach((pendingUrl) => {
    // 清除掉所有非全局的pending状态下的请求
    if (!pendingPool.get(pendingUrl).global) {
      pendingPool.get(pendingUrl).cancelFn();
      pendingPool.delete(pendingUrl);
    }
  });

  return pendingUrlList;
}

request.removeRequestInterceptor = removeRequestInterceptor;
request.removeResponseInterceptor = removeResponseInterceptor;
request.clearPendingPool = clearPendingPool;
