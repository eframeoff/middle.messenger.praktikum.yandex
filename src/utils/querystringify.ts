export function queryStringify(data: any) {
    let result = "";
    Object.keys(data).forEach((key, i) => {
      const pref = i === 0 ? "?" : "&";
      result += `${pref}${key}=${data[key]}`;
    });
    return result;
  }