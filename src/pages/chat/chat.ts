import "./chat.scss";
import chatAvatar from "../../images/chat.jpg";
import { tpl } from "./tpl";
import Block from "../../utils/block/Block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputs/input";
import { Modal } from "../../components/modal/modal";
import { ChatCard } from "../../components/chatcard/chatcard";
import { validateFunc } from "../../utils/validate";
import { Router } from "../../utils/router/Router";
import LoginApi from "../../api/loginApi";
import ChatApi from "../../api/chatApi";
import { Message } from "../../components/message/message";

interface IChatProps {
  deleteUserButton: HTMLElement;
  curChat: HTMLElement;
  chatMU: HTMLElement;
  lastMessage: HTMLElement;
  chatName: HTMLElement;
  chatAvatar: HTMLImageElement;
  usersChat: HTMLElement;
  sendMessageButton: HTMLElement;
  sendMessageInput: any;
  addChatButton: HTMLElement;
  chatModal: HTMLElement;
  userModal: HTMLElement;
  addUserButton: HTMLElement;
  deleteChatButton: HTMLElement;
  addChatVisible: HTMLElement;
  settingsChatButton: HTMLElement;
  exitButton: HTMLElement;
  profileButton: HTMLElement;
  addSettingsVisible: HTMLElement;
  findInput: HTMLElement;
}

const router = new Router();

export class ChatPage extends Block {
  private socket: WebSocket;

  constructor() {
    super("div", {
      deleteUserButton: new Button({
        id: "userDelete",
        classButton: "userDelete",
        typeButton: "button",
        textButton: "x",
      }),
      exitButton: new Button({
        id: "chatExit",
        classButton: "exitChat",
        typeButton: "button",
        textButton: "Выйти",
      }),
      profileButton: new Button({
        id: "chatProfile",
        classButton: "goToProfile",
        typeButton: "button",
        textButton: "Профиль",
      }),
      sendMessageButton: new Button({
        id: "chatSendMessage",
        classButton: "messageChat",
        typeButton: "submit",
        textButton: "Отправить",
      }),
      addChatButton: new Button({
        id: "chatAddMessage",
        classButton: "addChat",
        typeButton: "button",
        textButton: "Создать чат",
      }),
      settingsChatButton: new Button({
        id: "chatSettings",
        classButton: "addSettings",
        typeButton: "button",
        textButton: "Настройки",
      }),
      addUserButton: new Button({
        id: "chatAddUser",
        classButton: "addUser",
        typeButton: "button",
        textButton: "Добавить пользователя",
      }),
      deleteChatButton: new Button({
        id: "chatDeleteChat",
        classButton: "deleteChat",
        typeButton: "button",
        textButton: "Удалить чат",
      }),
      findInput: new Input({
        idInput: "findInput",
        classInput: "findInput",
        typeInput: "text",
        nameInput: "search",
        valueInput: "",
      }),
      sendMessageInput: new Input({
        idInput: "messageInput",
        classInput: "messageInput",
        typeInput: "text",
        nameInput: "message",
        valueInput: "",
      }),
      chatModal: new Modal({
        textModal: "Добавить чат",
        idModal: "chatModal",
        classInput: "inputModal",
        typeInput: "text",
        typeButton: "button",
        classButtonAdd: "addChatModal",
        textButtonAdd: "Добавить чат",
        classButtonClose: "closeModule",
        textButtonClose: "Закрыть",
        idAdd: "addChat",
        idClose: "closeModule",
        idInput: "inputChat",
        modalError: "addChatError",
      }),
      userModal: new Modal({
        textModal: "Добавить пользователя",
        idModal: "userModal",
        classInput: "inputModal",
        typeInput: "text",
        typeButton: "button",
        classButtonAdd: "addUserModal",
        textButtonAdd: "Добавить пользователя",
        classButtonClose: "closeModule",
        textButtonClose: "Закрыть",
        idAdd: "addUser",
        idClose: "closeModuleU",
        idInput: "inputUser",
        modalError: "addUserError",
      }),
      chatMU: [],
      chatcards: {},
      addChatVisible: false,
      addSettingsVisible: false,
      events: {
        click: (e: Event) => this.clickButton(e),
        submit: (e: Event) => this.sendMessage(e),
      },
    });
  }

  addUserModal() {
    const userModal = document.getElementById("userModal");
    userModal?.classList.add("modal__open");
  }

  closeUserModal() {
    const userModal = document.getElementById("userModal");
    userModal?.classList.remove("modal__open");
  }

  addChatModal() {
    const chatModal = document.getElementById("chatModal");
    chatModal?.classList.add("modal__open");
  }

  closeChatModal() {
    const chatModal = document.getElementById("chatModal");
    chatModal?.classList.remove("modal__open");
  }

  addUser() {
    const addUser = (
      document.getElementById(
        this.props.userModal.props.idInput
      ) as HTMLInputElement
    )?.value;
    const data = {
      login: addUser,
    };
    ChatApi.findUsers(data)
      .then((data: any) => {
        const datas = {
          users: [JSON.parse(data.response)[0].id],
          chatId: this.props.curChat.id,
        };
        ChatApi.addUser(datas)
          .then(() => {
            ChatApi.getChatUsers(this.props.curChat.id).then((data: any) => {
              this.props.curChat.users = JSON.parse(data.response);
              this.setProps(this.props);
            });
          })
          .catch((data) => console.log(data));
      })
      .catch(
        () =>
          (document.getElementById("addUserError")!.innerHTML =
            "Пользователь не найден")
      );
  }

  addChat() {
    const title = (
      document.getElementById(
        this.props.chatModal.props.idInput
      ) as HTMLInputElement
    )?.value;
    const data = {
      title,
    };
    ChatApi.addChat(data)
      .then(() => {
        ChatApi.getChats()
          .then((data: any) => {
            this.setChatProps(data);
            this.setProps(this.props);
          })
          .catch((data) => console.log(data));
      })
      .catch((data) => console.log(data));
  }

  setChatProps(data: XMLHttpRequest) {
    const chats = JSON.parse(data.response);
    this.props.chatcards = {};
    chats.forEach((chatcard: any) => {
      this.props.chatcards[chatcard.id] = new ChatCard({
        id: chatcard.id,
        chatAvatar: chatAvatar,
        nameUser: chatcard.title,
        lastMessage: chatcard.last_message ? chatcard.last_message.content : "",
      });
    });
    this.props.chatMU = [];
    Object.values(this.props.chatcards).forEach((chatcard: any) => {
      this.props.chatMU.push(chatcard.render());
    });
  }

  deleteUser(e: Event) {
    const chatId = this.props.curChat.id;
    const userDelete = (e.target! as HTMLElement).parentElement!.id;
    const data = {
      users: [userDelete],
      chatId: chatId,
    };
    ChatApi.deleteUsers(data).then(() => {
      ChatApi.getChats().then(() => {
        ChatApi.getChatUsers(chatId).then((data: XMLHttpRequest) => {
          this.props.curChat.users = JSON.parse(data.response);
          this.setProps(this.props);
        });
      });
    });
  }

  deleteChat() {
    const data = {
      chatId: this.props.curChat.id,
    };
    ChatApi.deleteChat(data)
      .then(() => {
        ChatApi.getChats().then((data: any) => {
          this.setChatProps(data);
          this.props.addChatVisible = false;
          this.props.addSettingsVisible = false;
          this.props.curChat = null;
          this.setProps(this.props);
        });
      })
      .catch(() => console.log(data));
  }

  renderMessage(data: any) {
    const chatBody = document.getElementById("chats");
    const now = new Date(data.time);
    const hours = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`;
    const minutes =
      now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`;

    const time = hours + `:` + minutes;
    const message = new Message({
      id: data.id,
      text: data.content,
      outerMessage: data.user_id !== this.props.userData.id,
      time: time,
    });
    chatBody?.insertBefore(message.getContent(), chatBody.firstChild);
  }

  openChat(e: Event) {
    this.props.addSettingsVisible = true;
    this.props.addChatVisible = false;
    this.props.curChat =
      this.props.chatcards[(e.target as HTMLElement).parentElement!.id].props;
    this.props.chatAvatar = this.props.curChat.avatar;
    this.props.chatName = this.props.curChat.nameUser;
    ChatApi.getChatUsers(this.props.curChat.id)
      .then((data: any) => {
        this.props.curChat.users = JSON.parse(data.response);
        this.setProps(this.props);
      })
      .catch((data) => console.log(data));
    ChatApi.getToken(this.props.curChat.id)
      .then((data: any) => {
        this.props.curChat.token = JSON.parse(data.response).token;
        this.setProps(this.props);
        this.socket = new WebSocket(
          `${process.env.WS_URL}/chats/${this.props.userData.id}/${this.props.curChat.id}/${this.props.curChat.token}`
        );

        this.socket.addEventListener("open", () => {
          console.log("open");
          this.socket.send(
            JSON.stringify({
              content: "0",
              type: "get old",
            })
          );
        });

        this.socket.addEventListener("error", (event: any) => {
          console.log("error");
          console.log("Ошибка: ", event.message);
        });

        this.socket.addEventListener("close", (event) => {
          console.log("close");
          if (event.wasClean) {
            console.log("Соединение закрыто чисто");
          } else {
            console.log("Обрыв соединения");
          }
          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener("message", (event) => {
          console.log("message");
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
        });
      })
      .catch((data) => console.log(data));
  }

  sendMessage(e: Event) {
    e.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const form: HTMLFormElement | null = document.querySelector(
      'input[name="message"]'
    );
    let valid = false;
    const dataArray = [form];
    dataArray.forEach((element) => {
      valid = validateFunc({
        value: element?.value,
        type: element?.name,
        errorMsg: `${element?.name}Error`,
      })
        ? true
        : false;
    });

    if (valid) {
      this.socket.send(
        JSON.stringify({
          content: (messageInput as HTMLInputElement)?.value,
          type: "message",
        })
      );
      (messageInput! as HTMLInputElement).value = "";
    }
  }

  exitChat() {
    LoginApi.logOut()
      .then(() => {
        router.go("/");
      })
      .catch((data) => console.log(data));
  }

  clickButton = (e: any) => {
    if (e.target.classList.contains("avatar")) {
      this.openChat(e);
    }

    if (e.target.id === this.props.deleteUserButton.props.id) {
      this.deleteUser(e);
    }

    switch (e.target) {
      case document.getElementById(this.props.exitButton.props.id):
        this.exitChat();
        break;
      case document.getElementById(this.props.addChatButton.props.id):
        this.addChatModal();
        break;
      case document.getElementById(this.props.addUserButton.props.id):
        this.addUserModal();
        break;
      case document.getElementById(this.props.settingsChatButton.props.id):
        this.props.addChatVisible = !this.props.addChatVisible;
        break;
      case document.getElementById(this.props.profileButton.props.id):
        router.go("/profile");
        break;
      case document.getElementById(this.props.chatModal.props.idAdd):
        this.addChat();
        break;
      case document.getElementById(this.props.userModal.props.idAdd):
        this.addUser();
        break;
      case document.getElementById(this.props.deleteChatButton.props.id):
        this.deleteChat();
        break;
      case document.getElementById(this.props.chatModal.props.idClose):
        this.closeChatModal();
        break;
      case document.getElementById(this.props.userModal.props.idClose):
        this.closeUserModal();
        break;
    }
  };

  componentDidMount() {
    LoginApi.getUser()
      .then((data: any) => {
        this.props.userData = JSON.parse(data.response);
        ChatApi.getChats()
          .then((data: any) => {
            this.setChatProps(data);
            this.setProps(this.props);
          })
          .catch((data: any) => console.log(data));
      })
      .catch(() => router.go("/"));
  }

  render() {
    const data: IChatProps = {
      chatMU: this.props.chatMU,
      lastMessage: this.props.lastMessage,
      curChat: this.props.curChat,
      chatName: this.props.chatName,
      chatAvatar: chatAvatar,
      usersChat: this.props.usersChat,
      sendMessageButton: this.props.sendMessageButton.render(),
      sendMessageInput: this.props.sendMessageInput.render(),
      addChatButton: this.props.addChatButton.render(),
      chatModal: this.props.chatModal.render(),
      userModal: this.props.userModal.render(),
      addUserButton: this.props.addUserButton.render(),
      deleteChatButton: this.props.deleteChatButton.render(),
      addChatVisible: this.props.addChatVisible,
      settingsChatButton: this.props.settingsChatButton.render(),
      exitButton: this.props.exitButton.render(),
      profileButton: this.props.profileButton.render(),
      addSettingsVisible: this.props.addSettingsVisible,
      deleteUserButton: this.props.deleteUserButton.render(),
      findInput: this.props.findInput.render(),
    };

    return tpl(data);
  }
}
