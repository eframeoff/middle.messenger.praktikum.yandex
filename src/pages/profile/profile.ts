import "./profile.scss";
import { tpl } from "./tpl";
import image from "../../images/profile.jpg";
import arrow from "../../images/arrow.png";
import Block from "../../utils/Block";
import { Button } from "../../components/button/button";

export default class profilePage extends Block {
  constructor() {
    super("div", {
      profileButton: new Button({
        id: "profile",
        classButton: "profile__button__blue",
        typeButton: "button",
        textButton: "Редактировать",
      }),
    });
  }

  render() {
    const data: {
      display_name: string,
      first_name: string,
      second_name: string,
      login: string,
      email: string,
      phone: number,
      arrow: HTMLImageElement;
      image: HTMLImageElement;
      profileButton: HTMLElement;
    } = {
      display_name: 'IVA',
      first_name: 'Иван',
      second_name: 'Иванов',
      login: 'IvanI',
      email: 'ivanov@yandex.ru',
      phone: 89222222222,
      arrow: arrow,
      image: image,
      profileButton: this.props.profileButton.render(),
    };

    return tpl(data);
  }
}
