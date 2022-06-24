import { queryStringify } from "../querystringify";

enum Methods {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
}

interface HTTPOptions {
  timeout?: number;
  headers?: Record<string, string>;
  data?: any;
  method?: Methods;
}

export default class HTTPTransport {
  baseUrl: string;
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options?: HTTPOptions) => {
    console.log("Делаем GET запрос");
    return this.request(this.baseUrl + url, {
      ...options,
      method: Methods.Get,
      timeout: 5000,
    });
  };
  put = (url: string, options: HTTPOptions) => {
    console.log("Делаем PUT запрос");
    return this.request(this.baseUrl + url, {
      ...options,
      method: Methods.Put,
      timeout: 5000,
    });
  };
  post = (url: string, options?: HTTPOptions) => {
    console.log("Делаем POST запрос");
    return this.request(this.baseUrl + url, {
      ...options,
      method: Methods.Post,
      timeout: 5000,
    });
  };
  delete = (url: string, options: HTTPOptions) => {
    console.log("Делаем DELETE запрос");
    return this.request(this.baseUrl + url, {
      ...options,
      method: Methods.Delete,
      timeout: 5000,
    });
  };

  request(url: string, options: HTTPOptions) {
    const { data = {}, method = Methods.Get, timeout = 5000 } = options;
    console.log(options)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const getReq = method === Methods.Get && Boolean(data);

      xhr.open(method, getReq ? `${url}${queryStringify(data)}` : url);

      if (data.headers === undefined) {
        console.log('json')
        xhr.setRequestHeader("Content-Type", "application/json");
      }
      console.log(data.headers)


      xhr.withCredentials = true;
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (getReq || !data) {
        xhr.send();
      } else {
        if (data.headers !== undefined) {
          xhr.send(data.data);
        } else {
          console.log(JSON.stringify(data))
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
