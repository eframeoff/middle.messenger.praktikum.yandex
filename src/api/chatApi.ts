import HTTPTransport from "../utils/http/HTTPTransport";

const http = new HTTPTransport("https://ya-praktikum.tech/api/v2/chats");
const httpUsers = new HTTPTransport("https://ya-praktikum.tech/api/v2/user");

class ChatApi {
  addChat(data: object) {
    return http.post("", { data });
  }

  addUser(data: object) {
    return http.put("/users", { data });
  }

  deleteChat(data: object) {
    return http.delete("/", { data });
  }

  deleteUsers(data: object) {
    return http.delete("/users", { data });
  }

  getChats() {
    return http.get("/", {});
  }

  getChatUsers(id: string) {
    return http.get(`/${id}/users`, {});
  }

  getToken(id: string) {
    return http.post(`/token/${id}`);
  }

  findUsers(data: object) {
    return httpUsers.post("/search", { data });
  }

  changeUserAvatar(data: object) {
    return httpUsers.put("/profile/avatar", { data });
  }

  savePassword(data: object) {
    return httpUsers.put("/password", { data });
  }

  saveUserData(data: object) {
    return httpUsers.put("/profile", { data });
  }

  logOut() {
    return http.post("/logout");
  }
}

export default new ChatApi();
