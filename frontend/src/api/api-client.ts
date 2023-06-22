import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import urlJoin from 'url-join';

enum HttpMethod {
  GET = 'GET',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  POST = 'POST',
}

interface ClientParameters extends AxiosRequestConfig {
  data?: any;
  apiUrl?: string;
  method?: HttpMethod;
}

function client<T>(
  endpoint: string,
  { data, apiUrl, method }: ClientParameters = {}
): AxiosPromise<T> {
  apiUrl = apiUrl ?? process.env.BACKEND_URL;
  if (apiUrl === undefined) {
    throw new Error('API URL is not defined.');
  }
  const url = urlJoin(apiUrl, endpoint);
  const params: AxiosRequestConfig = {
    method: method || HttpMethod.GET,
    url,
    data,
  };
  return axios(params);
}

export { client };
