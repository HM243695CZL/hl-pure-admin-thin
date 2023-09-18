import {http} from '@/utils/http';

/**
 * post请求
 * @param url 请求地址
 * @param data 请求参数
 */
export type AxiosResponse = {
  status: number;
  message: string;
  data: any;
}
export function postAction<T>(url: string, data: any) {
    return http.request<AxiosResponse>('post', url, data);
}

/**
 * get请求
 * @param urlStr 请求地址
 * @param data 请求参数
 */
export function getAction(urlStr: string, data: any) {
    return http.request<AxiosResponse>('get', urlStr, data);
}

/**
 * 上传文件
 * @param url 请求地址
 * @param data 请求参数
 */
export function uploadAction(url: string, data: any) {
    return http.request('post', url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}
