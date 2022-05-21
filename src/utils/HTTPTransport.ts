enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface HTTPOptions {
  timeout?: number;
  headers?: Record<string, string>;
  data?: any;
}

function queryStringify(data: HTTPOptions) {
  let result = "";
  Object.keys(data).forEach((key, i) => {
    const pref = i === 0 ? "?" : "&";
    result += `${pref}${key}=${data[key]}`;
  });
  return result;
}

export class HTTPTransport {
  get = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.GET, options, options.timeout);
  };
  put = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.PUT, options, options.timeout);
  };
  post = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.POST, options, options.timeout);
  };
  delete = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.DELETE, options, options.timeout);
  };

  request(url: string, method: METHODS, options: HTTPOptions, timeout = 5000) {
    const data = options.data;
    const headers = {} || options.headers;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const getReq = method === METHODS.GET;
      xhr.open(method, getReq ? `${url}${queryStringify(data)}` : url);

      xhr.timeout = timeout;
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      getReq || !data ? xhr.send() : xhr.send(data);
    });
  }
}
