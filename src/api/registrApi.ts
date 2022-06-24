import HTTPTransport from "../utils/http/HTTPTransport";

const http = new HTTPTransport("https://ya-praktikum.tech/api/v2/auth");

class RegistrApi {
  signUp(data: object) {
    return http.post("/signup", { data });
  }

  getUser() {
    return http.get("/user");
  }
}

export default new RegistrApi();
