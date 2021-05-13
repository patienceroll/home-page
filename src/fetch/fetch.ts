import { startPace } from '@src/componets/pace';

export const buildUrl = (url: string) => {
  return `/api/v1/${url}`;
};

/** 列表基本请求参数 */
export type ListParamBase = {
  page: number;
  perPage: number;
};

/** 列表响应类型 */
export type List<T> = {
  list: T[];
  page: number;
  perPage: number;
  total: number;
};

/** 通用响应数据类型 */
export type BaseResponse<T> = {
  code: 0;
  data: T;
  msg: string;
};

/** 获取token */
const getToken = () => localStorage.getItem('token') || '';

/**
 * 处理请求配置
 * - 主要是添加了 Authorization 请求头
 */
const getRequestInit = (requestInit?: Omit<RequestInit, 'method' | 'body'>) => {
  const temp: RequestInit = requestInit || {};
  if (requestInit?.headers) {
    temp.headers = {
      Authorization: getToken(),
      ...requestInit.headers,
    };
  } else {
    temp.headers = {
      Authorization: getToken(),
    };
  }
  return temp;
};

/** 封装的Get请求 */
export const Get = (
  url: string,
  data?: Record<string, any>,
  requestInit?: Omit<RequestInit, 'method' | 'body'>,
) => {
  const Request = getRequestInit(requestInit);
  Request.method = 'GET';
  (Request.headers as any)['content-type'] = 'application/json';

  const queryData = data || {};
  queryData._ = +new Date();
  let query = '';
  Object.keys(queryData).forEach((key) => {
    query += `${key}=${queryData[key]}&`;
  });
  return fetch((url += `?${query}`), Request);
};

/** 封装的 Get 请求,响应为 BaseResponse<T> */
export const GetResponse = <T>(
  url: string,
  data?: Record<string, any>,
  requestInit?: Omit<RequestInit, 'method' | 'body'>,
) => {
  const pace = startPace();
  return Get(url, data, requestInit)
    .then((res) => res.json())
    .then((res: BaseResponse<T>) => {
      pace.endPace();
      if (res.code === 0) {
        return res;
      }
      return res;
    })
    .catch((err) => {
      pace.endPace();
      return Promise.reject(err);
    });
};

/** 封装的 Post 请求 */
export const Post = (
  url: string,
  data?: Record<string, any> | Array<any>,
  requestInit?: Omit<RequestInit, 'method' | 'body'>,
) => {
  const Request = getRequestInit(requestInit);
  Request.method = 'POST';
  (Request.headers as any)['content-type'] = 'application/json';
  Request.body = JSON.stringify(data);
  return fetch(url, Request);
};

/** 封装的 Post 请求,响应为 BaseResponse<T> */
export const PostResponse = <T>(
  url: string,
  data?: Record<string, any> | Array<any>,
  requestInit?: Omit<RequestInit, 'method' | 'body'>,
) => {
  return Post(url, data, requestInit)
    .then((res) => res.json())
    .then((res: BaseResponse<T>) => {
      if (res.code === 0) {
        return res;
      }
      return res;
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};
