import "./profile.scss";
import { tpl } from "./tpl";
import Block from "../../utils/block/Block";
import { Button } from "../../components/button/button";
import LoginApi from "../../api/loginApi";
import { Router } from "../../utils/router/Router";

interface IProfileProps {
  avatar: string;
  userData: object;
  returnToChatButton: HTMLElement;
  profileButton: HTMLElement;
}

const router = new Router();

export class ProfilePage extends Block {
  constructor() {
    super("div", {
      returnToChatButton: new Button({
        id: "returnToChatButton",
        classButton: "returnToChatButton",
        typeButton: "button",
        textButton: "Назад",
      }),
      profileButton: new Button({
        id: "profile",
        classButton: "profileButtonBlue",
        typeButton: "button",
        textButton: "Редактировать",
      }),
      events: {
        click: (e: Event) => this.send(e),
      },
    });
  }

  send(e: Event) {
    switch (e.target) {
      case document.getElementById(this.props.profileButton.props.id): {
        router.go("/settings");
        break;
      }
      case document.getElementById(this.props.returnToChatButton.props.id): {
        router.go("/messenger");
        break;
      }
    }
  }

  componentDidMount() {
    LoginApi.getUser().then((data: any) => {
      this.props.userData = JSON.parse(data.response);
    });
  }

  render() {
    const data: IProfileProps = {
      avatar:
        `https://ya-praktikum.tech/api/v2/resources` +
        this.props.userData?.avatar,
      userData: this.props.userData,
      returnToChatButton: this.props.returnToChatButton.render(),
      profileButton: this.props.profileButton.render(),
    };

    return tpl(data);
  }
}
