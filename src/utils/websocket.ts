import { Message } from "../components/message/message";

export default class SocketModule {
  static __instance: SocketModule;
  socket: WebSocket;
  chatBody: any;
  userId: number;

  constructor(userId: string, chatId: string, token: string, chatBody: any) {
    this.socket?.close();
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );
    this.socket.addEventListener("open", this._onOpen.bind(this));
    this.socket.addEventListener("close", this._onClose.bind(this));
    this.socket.addEventListener("message", this._onMessage.bind(this));
    this.socket.addEventListener("error", this._onError.bind(this));

    this.chatBody = chatBody;
    this.userId = Number(userId);

    if (SocketModule.__instance) {
      return SocketModule.__instance;
    }

    SocketModule.__instance = this;
  }

  send(message: string) {
    this.socket?.send(message);
  }

  private _onOpen() {
    console.log("Соединение установлено");
    this.socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      })
    );
  }

  private _onError(event: any) {
    console.log("Ошибка: ", event.message);
  }

  private _onClose(event: any) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  private _onMessage(event: any) {
    console.log("Получены данные", event.data);
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      data.reverse().forEach((element: Message) => {
        this.renderMessage(element);
      });
    } else if (data.type === "user connected") {
      console.log("user connected");
    } else if (data.type === "message") {
      this.renderMessage(data);
    }
  }

  renderMessage(data: any) {
    const message = new Message({
      id: data.id,
      text: data.content,
    });

    this.chatBody.insertBefore(message.getContent(), this.chatBody.firstChild);
  }
}
