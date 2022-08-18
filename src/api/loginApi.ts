import HTTPTransport from "../utils/http/HTTPTransport";

const http = new HTTPTransport(`${process.env.API_URL}/auth`);

class LoginApi {
  signIn(data: object) {
    return http.post("/signin", { data });
  }

  logOut() {
    return http.post("/logout");
  }

  getUser() {
    return http.get("/user");
  }
}

export default new LoginApi();
