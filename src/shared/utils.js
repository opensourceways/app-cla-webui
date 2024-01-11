import Cookies from "js-cookie";

/**
 * safe window open
 */
export const windowOpen = (url, target, features) => {
  const opener = window.open(url, target, features);
  opener && (opener.opener = null);
};

/**
 * 获取指定key的cookie值
 * @param key
 * @returns
 */
export function getCustomCookie(key) {
  return Cookies.get(key);
}

/**
 * 设置cookie
 * @param key cookie的key
 * @param value cookie的值
 * @param day cookie的过期时间 默认1天
 */
export function setCustomCookie(key, value, day = 1) {
  Cookies.set(key, value, { expires: day, path: "/" });
}

/*
 * 浏览器内部转换器实现html解码
 */
export function htmlFilterXSS(v) {
  if (!v) {
    return;
  }
  let temp = document.createElement("div");
  temp.innerHTML = v;
  let output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}

/**
 * 是否是客户端
 * @returns Boolean
 */
export const isClient = () => typeof window !== undefined;

// 获取url 指定参数
export function getUrlParam(paraName) {
  const url = document.location.toString();
  const arrObj = url.split("?");
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split("&");
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr !== null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}
