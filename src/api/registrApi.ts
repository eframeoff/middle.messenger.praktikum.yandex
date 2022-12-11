import HTTPTransport from "../utils/http/HTTPTransport";

const http = new HTTPTransport(`${process.env.API_URL}/auth`);

class RegistrApi {
  signUp(data: object) {
    return http.post("/signup", { data });
  }

  getUser() {
    return http.get("/user");
  }
}

export default new RegistrApi();
