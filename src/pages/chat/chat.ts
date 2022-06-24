import "./chat.scss";
import { tpl } from "./tpl";
import image from "../../images/profile.jpg";
import arrow from "../../images/arrow.png";
import Block from "../../utils/Block";
import { validateFunc } from "../../utils/validate";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputs/input";

export default class chat extends Block {
  constructor() {
    super("div", {
      sendMessageButton: new Button({
        id: "chat_sendMessage",
        classButton: "message_chat",
        typeButton: "button",
        textButton: "Отправить",
      }),
      sendMessageInput: new Input({
        classInput: "chat__messages__dialog__input",
        typeInput: "text",
        nameInput: "message",
      }),
      events: {
        click: (e: Event) => this.send(e),
      },
    });
  }

  send = (e: Event) => {
    if (
      e.target ===
      document.getElementById(this.props.sendMessageButton.props.id)
    ) {
      const form: HTMLFormElement = document.querySelector(
        'form[name="formDat"]'
      );
      const data: { [key: string]: string } = {};
      const dataArray = Array.from(form!.elements) as HTMLInputElement[];
      dataArray.forEach((element) => {
        validateFunc({
          value: element.value,
          type: element.name,
          errorMsg: `${element.name}Error`,
        });
        data[element.id] = element.value;
      });

      if (form !== null) {
        const formData: FormData = new FormData(form);
        console.log(Object.fromEntries(formData));
      }
    }
  };

  render() {
    const data: {
      arrow: HTMLImageElement;
      image: HTMLImageElement;
      sendMessageButton: HTMLElement;
      sendMessageInput: HTMLElement;
    } = {
      arrow: arrow,
      image: image,
      sendMessageButton: this.props.sendMessageButton.render(),
      sendMessageInput: this.props.sendMessageInput.render(),
    };
    return tpl(data);
  }
}
