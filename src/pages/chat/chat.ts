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
import SocketModule from "../../utils/websocket";
import LoginApi from "../../api/loginApi";
import ChatApi from "../../api/chatApi";

interface DataProps {
  userButton: HTMLElement;
  curChat: HTMLElement;
  chatMU: HTMLElement;
  chatName: HTMLElement;
  chatAvatar: HTMLImageElement;
  usersChat: HTMLElement;
  sendMessageButton: HTMLElement;
  sendMessageInput: HTMLElement;
  addChatButton: HTMLElement;
  chatModal: HTMLElement;
  userModal: HTMLElement;
  addUserButton: HTMLElement;
  deleteChatButton: HTMLElement;
  addChatVisible: HTMLElement;
  settingsChatButton: HTMLElement;
  deleteUserButton: HTMLElement;
  exitButton: HTMLElement;
  profileButton: HTMLElement;
  addSettingsVisible: HTMLElement;
  findInput: HTMLElement;
}

const router = new Router();

export class ChatPage extends Block {
  constructor() {
    super("div", {
      userButton: new Button({
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
        typeButton: "button",
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
      deleteUserButton: new Button({
        id: "chatDeleteUser",
        classButton: "deleteUser",
        typeButton: "button",
        textButton: "Удалить пользователя",
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
      }),
      deleteUserModal: new Modal({
        textModal: "Удалить пользователя",
        idModal: "deleteUserModal",
        classInput: "inputModal",
        typeInput: "text",
        typeButton: "button",
        classButtonAdd: "addUserModal",
        textButtonAdd: "Удалить пользователя",
        classButtonClose: "closeModule",
        textButtonClose: "Закрыть",
        idAdd: "deleteUser",
        idClose: "closeModuleD",
        idInput: "inputUserD",
      }),
      chatMU: [],
      chatcards: {},
      addChatVisible: false,
      addSettingsVisible: false,
      events: {
        click: (e: Event) => this.send(e),
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
    const addUser = document.getElementById(
      this.props.userModal.props.idInput
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
      .catch((data) => console.log(data));
  }

  addChat() {
    const title = document.getElementById(
      this.props.chatModal.props.idInput
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
        lastMessage: chatcard.lastMessage,
      });
    });
    this.props.chatMU = [];
    Object.values(this.props.chatcards).forEach((chatcard: any) => {
      this.props.chatMU.push(chatcard.render());
    });
  }

  deleteUser(e: Event) {
    const chatId = this.props.curChat.id;
    const userDelete = e.target!.parentElement.id;
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

  openChat(e: Event) {
    this.props.addSettingsVisible = true;
    this.props.addChatVisible = false;
    this.props.curChat = this.props.chatcards[e.target?.parentElement.id].props;
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
        const chatmessage = document.getElementById("chats");
        const socket = new SocketModule(
          this.props.userData.id,
          this.props.curChat.id,
          this.props.curChat.token,
          chatmessage
        );
        const messageInput = document.getElementById("messageInput");
        const messageSendButton = document.getElementById(
          this.props.sendMessageButton.props.id
        );
        messageSendButton?.addEventListener("click", () => {
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
            socket.send(
              JSON.stringify({
                content: messageInput?.value,
                type: "message",
              })
            );
            messageInput!.value = "";
          }
        });
      })
      .catch((data) => console.log(data));
  }

  exitChat() {
    LoginApi.logOut()
      .then(() => {
        router.go("/");
      })
      .catch((data) => console.log(data));
  }

  send = (e: Event) => {
    if (e.target?.classList.contains("avatar")) {
      this.openChat(e);
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
      case document.getElementById(this.props.userButton.props.id):
        this.deleteUser(e);
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
    const data: DataProps = {
      chatMU: this.props.chatMU,
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
      deleteUserButton: this.props.deleteUserButton.render(),
      exitButton: this.props.exitButton.render(),
      profileButton: this.props.profileButton.render(),
      addSettingsVisible: this.props.addSettingsVisible,
      userButton: this.props.userButton.render(),
      findInput: this.props.findInput.render(),
    };

    return tpl(data);
  }
}
